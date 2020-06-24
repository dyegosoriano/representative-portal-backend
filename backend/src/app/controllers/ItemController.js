import Item from '../models/Item'
import Product from '../models/Product'
import Order from '../models/Order'

class ItemController {
  async store (request, response) {
    // Cadastrar dados
    const { amount, order_id, product_id } = request.body

    try {
      const product = await Product.findByPk(product_id)
      const order = await Order.findByPk(order_id)

      if (!product) return response.status(400).json({ error: 'The product is required!' })
      if (!order) return response.status(400).json({ error: 'The order of service selected does not exist!' })

      const newItem = await Item.create({
        total_price: (amount * product.price),
        provider_id: product.provider_id,
        product_id: product.id,
        order_id: order.id,
        amount
      })

      return response.json(newItem)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: 'there\'s been a mistake on the server' })
    }
  }

  async update (request, response) {
    // Alterar dados
    const { id } = request.params
    const { amount } = request.body
    const owner_id = request.userId

    try {
      const item = await Item.findByPk(id,
        {
          attributes: ['id', 'amount', 'total_price'],
          include: [
            {
              association: 'product',
              attributes: ['name_product', 'price']
            },
            {
              association: 'order',
              attributes: ['owner_id']
            }
          ]
        }
      )

      if (owner_id !== item.order.owner_id) {
        return response.status(400).json({ error: 'You\'re not authorized to alter this item' })
      }

      item.amount = amount
      item.total_price = (item.product.price * amount)

      await item.save()

      return response.json(item)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: 'there\'s been a mistake on the server' })
    }
  }
}

export default new ItemController()
