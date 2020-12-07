import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import AppError from '@errors/AppError'

import Provider from '@entity/Provider'

interface Request {
  id: string
}

export default class DeleteProviderService {
  async execute({ id }: Request) {
    if (!validate(id)) throw new AppError('O ID solicitado não foi encontrado!', 404)

    const providerRepository = getRepository(Provider)
    await providerRepository.delete({ id })
  }
}
