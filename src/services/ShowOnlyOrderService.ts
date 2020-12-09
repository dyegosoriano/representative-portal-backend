import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import orders_view, { OrderRender } from '@views/orders_view'
import AppError from '@errors/AppError'

import Order from '@entity/Order'

interface Request {
  userId: string
  productId: string
}

export default class ShowOnlyOrderService {
  async execute({ productId, userId }: Request): Promise<OrderRender> {
    if (!validate(productId)) throw new AppError('O ID solicitado não foi encontrado!', 404)

    const orderRepository = getRepository(Order)
    const order = await orderRepository.findOne({
      where: { id: productId },
      relations: ['owner'],
    })

    if (!order) throw new AppError('Ordem de serviço não encontrada!', 404)

    if (order.owner.id !== userId) throw new AppError('Você não tem permissão para acessar essa ordem de serviço!', 401)

    return orders_view.render(order)
  }
}