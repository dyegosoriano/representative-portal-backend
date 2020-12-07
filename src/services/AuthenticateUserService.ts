import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import { passwordCheck } from '@util/password'
import AppError from '@errors/AppError'
import authConfig from '@config/auth'

import User from '@entity/User'

interface Request {
  email: string
  password: string
}

interface Response {
  user: {
    name: string
    email: string
    cnpj: number
  }
  token: string
}

export default class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ where: { email } })

    if (!user) throw new AppError('combinação incorreta de e-mail/senha')

    if (!(await passwordCheck(password, user.password))) throw new AppError('combinação incorreta de e-mail/senha', 401)

    const { id, name, cnpj } = user
    const token = sign({ id }, authConfig.secretUser, {
      expiresIn: authConfig.expiresIn,
    })

    return {
      user: { name, email, cnpj },
      token,
    }
  }
}
