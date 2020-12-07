import { getRepository } from 'typeorm'

import User from '@entity/User'

import users_view, { UserRender } from '@views/users_view'
import { passwordEncrypt } from '@util/password'
import AppError from '@errors/AppError'

interface Request {
  password: string
  email: string
  name: string
  cnpj: number
}

export default class CreateUserService {
  async execute({ name, email, cnpj, password }: Request): Promise<UserRender> {
    const userRepository = getRepository(User)
    const userExist = await userRepository.find({ where: [{ email }, { cnpj }] })

    userExist.find(user => {
      if (user.email === email) throw new AppError('Este email ja foi cadastrado!', 401)
      if (user.cnpj === cnpj) throw new AppError('Este CNPJ ja foi cadastrado!', 401)
    })

    const user = userRepository.create({
      password: await passwordEncrypt(password),
      email,
      name,
      cnpj,
    })

    await userRepository.save(user)

    return users_view.render(user)
  }
}
