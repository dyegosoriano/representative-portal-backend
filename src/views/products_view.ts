import Product from '@entity/Product'

export interface ProductRender {
  product: string
  amount: number
  price: number
  id: string
}

export default {
  render(product: Product): ProductRender {
    return {
      id: product.id,
      product: product.product,
      amount: product.amount,
      price: product.price,
    }
  },

  renderAll(products: Product[]): ProductRender[] {
    return products.map(product => this.render(product))
  },
}
