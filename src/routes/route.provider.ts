import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'

import authProviderMiddleware from '@middleware/authProvider'
import providers_view from '@views/providers_view'
import { passwordCheck, passwordEncrypt } from '@util/password'

import Providers from '@models/Providers'

const providerRoute = Router()

providerRoute.post('/', async (req: Request, res: Response) => {
  const { name_provider, email, cnpj, password } = req.body

  try {
    const providerRepository = getRepository(Providers)
    const providerExist = await providerRepository.find({
      where: [{ email }, { cnpj }],
    })

    providerExist.find(provider => {
      if (provider.email === email) throw new Error('The email already exists!')
      if (provider.cnpj === cnpj) throw new Error('The CNPJ already exists!')
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
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

providerRoute.use(authProviderMiddleware)

providerRoute.get('/', async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1

  try {
    const providerRepository = getRepository(Providers)
    const providers = await providerRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    })

    return res.json(providers_view.renderAll(providers))
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res
      .status(500)
      .json({ error: "there's been a mistake on the server" })
  }
})

providerRoute.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const providerRepository = getRepository(Providers)
    const provider = await providerRepository.findOneOrFail(id)

    return res.json(providers_view.render(provider))
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

providerRoute.put('/', async (req: Request, res: Response) => {
  const {
    name_provider,
    email,
    cnpj,
    oldPassword,
    newPassword,
    confirmationPassword,
  } = req.body
  const id = req.providerId

  try {
    const providerRepository = getRepository(Providers)
    const provider = await providerRepository.findOneOrFail({ id })

    const passwordChecked = await passwordCheck(
      oldPassword,
      provider.password_hash,
    )

    if (oldPassword && !passwordChecked) {
      throw new Error('Password does not match')
    }

    if (newPassword === confirmationPassword) {
      provider.password_hash = await passwordEncrypt(newPassword)
    } else {
      throw new Error(
        'The confirmation password does not match the new password',
      )
    }

    if (email || cnpj) {
      const providerExist = await providerRepository.find({
        where: [{ email }, { cnpj }],
      })

      providerExist.find(item => {
        if (provider.id !== item.id) {
          if (item.email === email) {
            throw new Error('The email already exists!')
          }
          if (item.cnpj === cnpj) {
            throw new Error('The CNPJ already exists!')
          }
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
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

providerRoute.delete('/', async (req: Request, res: Response) => {
  const id = req.providerId

  try {
    const providerRepository = getRepository(Providers)
    const provider = await providerRepository.delete({ id })

    return res.json({
      message: `Action completed successfully!`,
    })
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

export default providerRoute
