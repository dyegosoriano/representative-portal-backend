import Item from '../models/Item'
import Product from '../models/Product'
import Order from '../models/Order'

class ItemController {
  async store (request, response) {
    const { amount, order_id, product_id } = request.body

    try {
      // Cadastrar dados
      const product = await Product.findByPk(product_id)
      const order = await Order.findByPk(order_id)

      if (!product) return response.status(400).json({ error: 'The product is required!' })
      if (!order) return response.status(400).json({ error: 'The order of service selected does not exist!' })

      const newItem = await Item.create({
        amount,
        total_price: (amount * product.price),
        order_id: order.id,
        provider_id: product.provider_id,
        product_id: product.id
      })

      return response.json(newItem)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: 'there\'s been a mistake on the server' })
    }
  }
}

export default new ItemController()
