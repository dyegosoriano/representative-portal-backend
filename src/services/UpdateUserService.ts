import { getRepository } from 'typeorm'

import { passwordCheck, passwordEncrypt } from '@util/password'
import users_view, { UserRender } from '@views/users_view'
import AppError from '@errors/AppError'

import User from '@entity/User'

interface Request {
  confirmationPassword: string
  newPassword: string
  oldPassword: string
  email: string
  name: string
  cnpj: number
  id: string
}

export default class UpdateUserService {
  async execute({
    confirmationPassword,
    newPassword,
    oldPassword,
    email,
    name,
    cnpj,
    id,
  }: Request): Promise<UserRender> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOneOrFail(id)

    const passwordChecked = await passwordCheck(oldPassword, user.password)

    if (oldPassword && !passwordChecked) {
      throw new AppError('Password does not match', 401)
    }

    if (newPassword === confirmationPassword) {
      user.password = await passwordEncrypt(newPassword)
    } else {
      throw new AppError(
        'The confirmation password does not match the new password',
        401,
      )
    }

    if (email || cnpj) {
      const userExist = await userRepository.find({
        where: [{ email }, { cnpj }],
      })

      userExist.find(item => {
        if (user.id !== item.id) {
          if (item.email === email) {
            throw new AppError('The email already exists!', 401)
          }
          if (item.cnpj === cnpj) {
            throw new AppError('The CNPJ already exists!', 401)
          }
        }
      })

      user.email !== email ? (user.email = email) : false
      user.cnpj !== cnpj ? (user.cnpj = cnpj) : false
    }

    if (name) {
      user.name = name
    }

    await userRepository.save(user)

    return users_view.render(user)
  }
}
