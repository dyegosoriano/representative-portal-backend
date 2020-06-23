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

  async update (request, response) {
    const owner_id = request.userId
    const { id } = request.params
    const { aproved, canceled, confirm } = request.body

    try {
      // Alterar dados
      const order = await Order.findOne({ where: { owner_id, id } })

      if (!order) return response.status(400).json({ message: "That order of service doesn't exist!" })

      if (aproved) order.aproved_at = new Date()
      if (canceled) order.canceled_at = new Date()
      if (confirm) order.confirmed_at = new Date()

      await order.save()

      return response.json(order)
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
      const orders = await Order.findAndCountAll({ where: { owner_id } })

      if (orders.count === 0) return response.json({ message: "You don't have service orders" })

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

      if (!order) return response.status(400).json({ error: "You're not allowed to access that service order" })

      return response.json(order)
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async delete (request, response) {
    const owner_id = request.userId
    const { id } = request.params

    try {
      // Remover dados
      const order = await Order.findOne({ where: { owner_id, id } })

      order.destroy()

      await order.save()

      return response.json({ message: 'The service order has been successfully deleted!' })
    } catch (error) {
      console.log('error.message >>', error.message)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new OrderController()