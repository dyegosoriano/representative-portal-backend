import { getRepository } from 'typeorm'

import products_view, { ProductRender } from '@views/products_view'

import Product from '@entity/Product'

interface Request {
  provider: { id: string }
  product: string
  amount: number
  price: number
}

export default class CreateProductService {
  async execute({ provider, product, amount, price }: Request): Promise<ProductRender> {
    const productRepository = getRepository(Product)

    const newProduct = productRepository.create({
      provider,
      product,
      amount,
      price,
    })

    await productRepository.save(newProduct)

    return products_view.render(newProduct)
  }
}
