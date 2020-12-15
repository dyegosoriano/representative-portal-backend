import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import products_view, { ProductRender } from '@views/products_view'
import AppError from '@errors/AppError'

import Product from '@entity/Product'

interface Request {
  provider: { id: string }
  product: string
  amount: number
  price: number
  id: string
}

export default class UpdateProductService {
  async execute({ product, provider, amount, price, id }: Request): Promise<ProductRender> {
    if (!validate(id)) throw new AppError('ID válido', 401)

    const productRepository = getRepository(Product)
    const selectedProduct = await productRepository.findOne({ where: { id }, relations: ['provider'] })

    if (!selectedProduct) throw new AppError('O produto solicitado não foi encontrado!', 404)

    if (provider.id !== selectedProduct.provider.id)
      throw new AppError('Você não tem permissão para alterar este produto', 401)

    selectedProduct.product = product
    selectedProduct.amount = amount
    selectedProduct.price = price

    await productRepository.save(selectedProduct)

    return products_view.render(selectedProduct)
  }
}
