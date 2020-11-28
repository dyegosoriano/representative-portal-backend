import Products from '@entity/Products'

interface Render {
  id: number
  product: string
  amount: number
  price: string
}

export default {
  render(products: Products): Render {
    return {
      id: products.id,
      product: products.product_name,
      amount: products.amount,
      price: products.price,
    }
  },

  renderAll(products: Products[]): Render[] {
    return products.map(product => this.render(product))
  },
}
