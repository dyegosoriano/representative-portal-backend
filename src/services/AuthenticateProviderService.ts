import { getRepository } from 'typeorm'
import { sign } from 'jsonwebtoken'

import Provider from '@entity/Provider'

import { passwordCheck } from '@util/password'
import AppError from '@errors/AppError'
import authConfig from '@config/auth'

interface Request {
  email: string
  password: string
}

interface Response {
  provider: {
    name: string
    email: string
    cnpj: string
  }
  token: string
}

export default class AuthenticateProviderService {
  async execute({ email, password }: Request): Promise<Response> {
    const providerRepository = getRepository(Provider)

    const provider = await providerRepository.findOne({ where: { email } })

    if (!provider) throw new AppError('combinação incorreta de e-mail/senha')

    if (!(await passwordCheck(password, provider.password))) {
      throw new AppError('combinação incorreta de e-mail/senha', 401)
    }

    const { id, name, cnpj } = provider
    const token = sign({ id }, authConfig.secretProvider, {
      expiresIn: authConfig.expiresIn,
    })

    return {
      provider: { name, email, cnpj },
      token,
    }
  }
}
