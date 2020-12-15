import { getRepository } from 'typeorm'

import products_view, { ProductRender } from '@views/products_view'

import Product from '@entity/Product'

interface Request {
  page: number
}

export default class ShowAllProductsService {
  async execute({ page }: Request): Promise<ProductRender[]> {
    const productRepository = getRepository(Product)

    let products = []

    switch (page) {
      case 0:
        products = await productRepository.find({
          order: { created_at: 'ASC' },
        })
        break

      default:
        products = await productRepository.find({
          order: { created_at: 'ASC' },
          skip: (page - 1) * 20,
          take: 20,
        })
        break
    }

    return products_view.renderAll(products)
  }
}
