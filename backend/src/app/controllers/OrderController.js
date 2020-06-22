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

  async index (request, response) {
    const owner_id = request.userId

    try {
      // Listagem de dados
      const orders = await Order.findAndCountAll({ owner_id })

      return response.json(orders)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async show (request, response) {
    const owner_id = request.userId
    const { id } = request.params

    try {
      // Exibir um único dados
      const order = await Order.findOne({ where: { owner_id, id } })

      return response.json(order)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new OrderController()
