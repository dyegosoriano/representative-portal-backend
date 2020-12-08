import { getRepository } from 'typeorm'

import orders_view, { OrderRender } from '@views/orders_view'

import Order from '@entity/Order'

interface Request {
  owner: { id: string }
  page: number
}

export default class ShowAllOrdersService {
  async execute({ owner, page }: Request): Promise<OrderRender[]> {
    const orderRepository = getRepository(Order)

    let orders: Order[]

    switch (page) {
      case 0:
        orders = await orderRepository.find({
          order: { created_at: 'ASC' },
          where: { owner },
        })
        break

      default:
        orders = await orderRepository.find({
          order: { created_at: 'ASC' },
          where: { owner },
          skip: (page - 1) * 20,
          take: 20,
        })
        break
    }

    return orders_view.renderAll(orders)
  }
}
