import { getRepository } from 'typeorm'
import { isUuid } from 'uuidv4'

import products_view, { ProductRender } from '@views/products_view'
import AppError from '@errors/AppError'

import Product from '@entity/Product'

export default class ShowOnlyProductsService {
  async execute(id: string): Promise<ProductRender> {
    if (!isUuid(id)) throw new AppError('O produto solicitado não existe!', 404)

    const productRepository = getRepository(Product)

    const product = await productRepository.findOne({ where: { id } })

    if (!product) {
      throw new AppError('O produto solicitado não existe!', 404)
    }

    return products_view.render(product)
  }
}
