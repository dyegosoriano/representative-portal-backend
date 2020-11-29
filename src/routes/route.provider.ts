import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'

import { passwordCheck, passwordEncrypt } from '@util/password'
import authProviderMiddleware from '@middleware/authProvider'
import providers_view from '@views/providers_view'
import AppError from 'src/errors/AppError'

import Providers from '@entity/Providers'

const providerRoute = Router()

providerRoute.post('/', async (req: Request, res: Response) => {
  const { name_provider, email, cnpj, password } = req.body

  const providerRepository = getRepository(Providers)
  const providerExist = await providerRepository.find({
    where: [{ email }, { cnpj }],
  })

  providerExist.find(provider => {
    if (provider.email === email)
      throw new AppError('The email already exists!', 401)
    if (provider.cnpj === cnpj)
      throw new AppError('The CNPJ already exists!', 401)
  })

  const provider = providerRepository.create({
    password_hash: await passwordEncrypt(password),
    created_at: new Date(),
    updated_at: new Date(),
    name_provider,
    email,
    cnpj,
  })

  await providerRepository.save(provider)

  return res.json(providers_view.render(provider))
})

providerRoute.use(authProviderMiddleware)

providerRoute.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1

  const providerRepository = getRepository(Providers)
  const providers = await providerRepository.find({
    skip: (page - 1) * 10,
    take: 10,
  })

  return res.json(providers_view.renderAll(providers))
})

providerRoute.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  const providerRepository = getRepository(Providers)
  const provider = await providerRepository.findOneOrFail(id)

  return res.json(providers_view.render(provider))
})

providerRoute.put('/', async (req: Request, res: Response) => {
  const id = req.providerId
  const {
    confirmationPassword,
    name_provider,
    oldPassword,
    newPassword,
    email,
    cnpj,
  } = req.body

  const providerRepository = getRepository(Providers)
  const provider = await providerRepository.findOneOrFail({ id })

  const passwordChecked = await passwordCheck(
    oldPassword,
    provider.password_hash,
  )

  if (oldPassword && !passwordChecked) {
    throw new AppError('Password does not match')
  }

  if (newPassword === confirmationPassword) {
    provider.password_hash = await passwordEncrypt(newPassword)
  } else {
    throw new AppError(
      'The confirmation password does not match the new password',
      401,
    )
  }

  if (email || cnpj) {
    const providerExist = await providerRepository.find({
      where: [{ email }, { cnpj }],
    })

    providerExist.find(item => {
      if (provider.id !== item.id) {
        if (item.email === email)
          throw new AppError('The email already exists!', 401)
        if (item.cnpj === cnpj)
          throw new AppError('The CNPJ already exists!', 401)
      }
    })

    provider.email !== email ? (provider.email = email) : false
    provider.cnpj !== cnpj ? (provider.cnpj = cnpj) : false
  }

  if (name_provider) {
    provider.name_provider = name_provider
  }

  await providerRepository.save(provider)

  return res.json(providers_view.render(provider))
})

providerRoute.delete('/', async (req: Request, res: Response) => {
  const id = req.providerId

  const providerRepository = getRepository(Providers)
  await providerRepository.delete({ id })

  return res.status(200).json({
    message: `Action completed successfully!`,
  })
})

export default providerRoute
