import Order from '../models/Order'

class OrderController {
  async store (request, response) {
    // Cadastrar ordem de serviço
    const owner_id = request.userId

    try {
      const newOrder = await Order.create({ owner_id })

      return response.json(newOrder)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async update (request, response) {
    // Alterar dados
    const { userId } = request
    const { id } = request.params
    const { approved, canceled, confirm } = request.body

    try {
      const order = await Order.findByPk(id)

      if (!order) return response.status(400).json({ message: "That order of service doesn't exist!" })

      if (userId !== order.owner_id) return response.status(400).json({ message: "You can't change this item" })

      if (approved) order.approved_at = new Date()
      if (canceled) order.canceled_at = new Date()
      if (confirm) order.confirmed_at = new Date()

      await order.save()

      return response.json(order)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async index (request, response) {
    // Listagem de dados
    const owner_id = request.userId

    try {
      const orders = await Order.findAndCountAll({ where: { owner_id } })

      if (orders.count === 0) return response.json({ message: "You don't have service orders" })

      return response.json(orders)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async show (request, response) {
    // Exibir um único dados
    const { id } = request.params
    const { userId } = request

    try {
      const order = await Order.findByPk(
        id, {
          include: {
            association: 'itens',
            attributes: [
              'id',
              'amount',
              'total_price',
              'provider_id',
              'product_id'
            ]
          }
        }
      )

      if (!order) return response.status(400).json({ erro: "The solicitation service order doesn't exist" })

      if (userId !== order.owner_id) return response.status(400).json({ error: "You're not allowed to access this service order!" })

      if (!order) return response.status(400).json({ error: "You're not allowed to access that service order" })

      return response.json(order)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async delete (request, response) {
    // Remover dados
    const { userId } = request
    const { id } = request.params

    try {
      const order = await Order.findByPk(id)

      if (!order) return response.status(400).json({ error: "The solicitation service order doesn't exist" })

      if (userId !== order.owner_id) return response.status(400).json({ error: "You're not authorized to delete this service order" })

      order.destroy()

      await order.save()

      return response.json({ message: 'The service order has been successfully deleted!' })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new OrderController()
