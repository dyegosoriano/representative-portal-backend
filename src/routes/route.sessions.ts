import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

import { passwordCheck } from '@util/password'
import AppError from '@errors/AppError'
import authConfig from '@config/auth'

import Providers from '@entity/Providers'
import Users from '@entity/Users'

const sessionsRoute = Router()

sessionsRoute.post('/user', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const userRepository = getRepository(Users)
  const user = await userRepository.findOneOrFail({ where: { email } })

  if (!(await passwordCheck(password, user.password_hash))) {
    throw new AppError('password does not match', 401)
  }

  const { id, name, cnpj } = user

  return res.json({
    user: { name, email, cnpj },
    token: jwt.sign({ id }, authConfig.secretUser, {
      expiresIn: authConfig.expiresIn,
    }),
  })
})

sessionsRoute.post('/provider', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const providerRepository = getRepository(Providers)
  const provider = await providerRepository.findOneOrFail({
    where: { email },
  })

  if (!(await passwordCheck(password, provider.password_hash))) {
    throw new AppError('password does not match', 401)
  }

  const { id, name_provider, cnpj } = provider

  return res.json({
    provider: { name_provider, email, cnpj },
    token: jwt.sign({ id }, authConfig.secretProvider, {
      expiresIn: authConfig.expiresIn,
    }),
  })
})

export default sessionsRoute
