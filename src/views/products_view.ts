import Product from '@entity/Product'

interface Render {
  id: string
  product: string
  amount: number
  price: string
}

export default {
  render(products: Product): Render {
    return {
      id: products.id,
      product: products.product,
      amount: products.amount,
      price: products.price,
    }
  },

  renderAll(products: Product[]): Render[] {
    return products.map(product => this.render(product))
  },
}
