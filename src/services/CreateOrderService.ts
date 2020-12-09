import { getRepository } from 'typeorm'

import orders_view, { OrderRender } from '@views/orders_view'

import Order from '@entity/Order'

interface Request {
  owner: { id: string }
}

export default class CreateOrderService {
  async execute({ owner }: Request): Promise<OrderRender> {
    const orderRepository = getRepository(Order)
    const order = orderRepository.create({ owner })

    await orderRepository.save(order)

    return orders_view.render(order)
  }
}
