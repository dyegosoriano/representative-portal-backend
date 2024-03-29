import { getRepository } from 'typeorm'

import { passwordCheck, passwordEncrypt } from '@util/password'
import users_view, { UserRender } from '@views/users_view'
import AppError from '@errors/AppError'

import User from '@entity/User'

interface Request {
  confirmPass: string
  oldPass: string
  newPass: string
  email: string
  cnpj: number
  name: string
  id: string
}

export default class UpdateUserService {
  async execute({ confirmPass, oldPass, newPass, email, cnpj, name, id }: Request): Promise<UserRender> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({ id })

    if (!user) throw new AppError('Usuário não encontrado!', 404)

    const passwordChecked = await passwordCheck(oldPass, user.password)

    if (oldPass && !passwordChecked) throw new AppError('Senha incorreta!', 401)

    if (newPass !== confirmPass) throw new AppError('A senha de confirmação não corresponde com a nova senha', 401)

    if (email || cnpj) {
      const userExist = await userRepository.find({ where: [{ email }, { cnpj }] })

      userExist.find(item => {
        if (user.id !== item.id) {
          if (item.email === email) throw new AppError('O email pertence a outro usuário!', 401)
          if (+item.cnpj === cnpj) throw new AppError('O CNPJ pertence a outro usuário!', 401)
        }
      })
    }

    user.password = await passwordEncrypt(newPass)
    user.email = email
    user.name = name
    user.cnpj = cnpj

    await userRepository.save(user)

    return users_view.render(user)
  }
}
