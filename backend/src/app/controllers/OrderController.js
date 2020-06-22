import Order from '../models/Order'

class OrderController {
  async store (request, response) {
    // Cadastrar ordem de serviço
    const owner_id = request.userId

    try {
      const newOrder = await Order.create({ owner_id })

      return response.json(newOrder)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new OrderController()
