import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'
import jwt from 'jsonwebtoken'

import { passwordCheck } from '@util/password'
import authConfig from '@config/auth'

import Providers from '@models/Providers'
import Users from '@models/Users'

const sessionsRoute = Router()

sessionsRoute.post('/user', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const userRepository = getRepository(Users)
    const user = await userRepository.findOneOrFail({ where: { email } })

    if (!(await passwordCheck(password, user.password_hash))) {
      throw new Error('password does not match')
    }

    const { id, name, cnpj } = user

    return res.json({
      user: { name, email, cnpj },
      token: jwt.sign({ id }, authConfig.secretUser, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

sessionsRoute.post('/provider', async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const providerRepository = getRepository(Providers)
    const provider = await providerRepository.findOneOrFail({
      where: { email },
    })

    if (!(await passwordCheck(password, provider.password_hash))) {
      throw new Error('password does not match')
    }

    const { id, nameProvider, cnpj } = provider

    return res.json({
      provider: { nameProvider, email, cnpj },
      token: jwt.sign({ id }, authConfig.secretProvider, {
        expiresIn: authConfig.expiresIn,
      }),
    })
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

export default sessionsRoute
