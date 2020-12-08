import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import AppError from '@errors/AppError'

import Product from '@entity/Product'

interface Request {
  provider: { id: string }
  id: string
}

export default class DeleteProductService {
  async execute({ id, provider }: Request): Promise<void> {
    if (!validate(id)) throw new AppError('O ID solicitado não foi encontrado!', 404)

    const productRepository = getRepository(Product)
    const product = await productRepository.findOne({ where: { id }, relations: ['provider'] })

    if (!product) throw new AppError('Produto não encontrado!', 404)

    if (provider.id !== product.provider.id) throw new AppError('Você não tem permissão para deletar este produto', 401)

    await productRepository.delete({ id })
  }
}
