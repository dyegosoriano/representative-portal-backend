import { format } from 'date-fns'
import pt from 'date-fns/locale/pt'

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
    const { close, cancel, confirm } = request.body

    try {
      const order = await Order.findByPk(id)

      if (!order) return response.status(400).json({ message: "That order of service doesn't exist!" })

      if (userId !== order.owner_id) return response.status(400).json({ message: "You can't change this item" })

      if (close) order.closed = new Date()
      if (cancel) order.canceled = new Date()
      if (confirm) order.confirmed = new Date()

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
    const page = Number(request.query.page) || 1

    try {
      const orders = await Order.findAll({
        where: { owner_id },
        order: ['createdAt'],
        attributes: [
          'id',
          'createdAt',
          'confirmed',
          'canceled',
          'closed'
        ],
        limit: 10,
        offset: (page - 1) * 10
      })

      if (orders.count === 0) return response.json({ message: "You don't have service orders" })

      const formattedOrders = orders.map(item => (
        {
          ...item.dataValues,
          createdAt: format(item.createdAt, 'dd/MM/yyyy', { locale: pt })
        }
      ))

      return response.json(formattedOrders)
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
            association: 'items',
            order: ['createdAt'],
            attributes: [
              'id',
              'product_name',
              'total_price',
              'amount'
            ]
          }
        }
      )

      if (!order) return response.status(400).json({ erro: "The solicitation service order doesn't exist" })
      if (userId !== order.owner_id) return response.status(400).json({ error: "You're not allowed to access this service order!" })
      if (!order) return response.status(400).json({ error: "You're not allowed to access that service order" })

      const { confirmed, canceled, closed, items } = order

      return response.json({ id, confirmed, canceled, closed, items })
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
