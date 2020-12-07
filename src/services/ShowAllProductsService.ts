import { getRepository } from 'typeorm'

import products_view, { ProductRender } from '@views/products_view'

import Product from '@entity/Product'

interface Request {
  page?: number
}

export default class ShowAllProductsService {
  async execute({ page }: Request): Promise<ProductRender[]> {
    const productRepository = getRepository(Product)

    let products = []

    if (!page) {
      products = await productRepository.find()
    } else {
      products = await productRepository.find({
        skip: (page - 1) * 20,
        take: 20,
      })
    }

    return products_view.renderAll(products)
  }
}
