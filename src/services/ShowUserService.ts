import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import users_view, { UserRender } from '@views/users_view'
import AppError from '@errors/AppError'

import User from '@entity/User'

interface Request {
  id: string
}

export default class ShowUserService {
  async execute({ id }: Request): Promise<UserRender> {
    if (!validate(id)) throw new AppError('O ID solicitado não foi encontrado!', 404)

    const userRepo = getRepository(User)
    const user = await userRepo.findOne({ id })

    if (!user) throw new AppError('Usuário não foi encontrado!')

    return users_view.render(user)
  }
}
