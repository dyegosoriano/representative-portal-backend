import { getRepository } from 'typeorm'

import users_view, { UserRender } from '@views/users_view'
import { passwordEncrypt } from '@util/password'
import AppError from '@errors/AppError'

import Provider from '@entity/Provider'
import User from '@entity/User'

interface Request {
  providerId: string
  password: string
  email: string
  name: string
  cnpj: number
}

export default class CreateUserService {
  async execute({ name, email, cnpj, providerId, password }: Request): Promise<UserRender> {
    const userRepository = getRepository(User)
    const userExist = await userRepository.find({ where: [{ email }, { cnpj }] })

    userExist.find(user => {
      if (user.email === email) throw new AppError('Este email pertence a outro usuário!', 401)
      if (+user.cnpj === cnpj) throw new AppError('Este CNPJ pertence a outro usuário!', 401)
    })

    const provider = await getRepository(Provider).findOne({ where: { id: providerId } })

    if (!provider) throw new AppError('O fornecedor não foi encontrado', 404)

    const user = userRepository.create({
      password: await passwordEncrypt(password),
      provider,
      email,
      name,
      cnpj,
    })

    await userRepository.save(user)

    return users_view.render(user)
  }
}
