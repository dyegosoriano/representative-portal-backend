import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import orders_view, { OrderRender } from '@views/orders_view'
import AppError from '@errors/AppError'

import Order from '@entity/Order'

interface Request {
  updateData: JsonRequest
  productId: string
  owner: string
}

interface JsonRequest {
  delivered: boolean | null
  onMyWay: boolean | null
  confirm: boolean | null
  cancel: boolean | null
  close: boolean | null
}

export default class UpdateOrderService {
  async execute({ owner, productId, updateData }: Request): Promise<OrderRender> {
    if (!validate(productId)) throw new AppError('ID válido', 401)

    const { delivered, onMyWay, confirm, cancel, close } = updateData

    const orderRepository = getRepository(Order)
    const order = await orderRepository.findOne({
      where: { id: productId },
      relations: ['owner'],
    })

    if (!order) throw new AppError('Ordem de serviço não encontrada!', 404)

    if (owner !== order.owner.id) throw new AppError('Você não tem permissão para acessar essa ordem de serviço!', 401)

    if (delivered) order.delivered = new Date()
    if (confirm) order.confirmed = new Date()
    if (onMyWay) order.onMyWay = new Date()
    if (cancel) order.canceled = new Date()
    if (close) order.closed = new Date()

    await orderRepository.save(order)

    return orders_view.render(order)
  }
}
