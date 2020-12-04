import { getRepository } from 'typeorm'

import Provider from '@entity/Provider'

interface Request {
  id: string
}

export default class DeleteProviderService {
  async execute({ id }: Request) {
    const providerRepository = getRepository(Provider)
    await providerRepository.delete({ id })
  }
}
