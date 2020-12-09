import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import AppError from '@errors/AppError'

import Order from '@entity/Order'

interface Request {
  productId: string
  owner: string
}

export default class DeleteOrderService {
  async execute({ productId, owner }: Request): Promise<void> {
    if (!validate(productId)) throw new AppError('O ID solicitado não foi encontrado!', 404)

    const orderRepository = getRepository(Order)
    const order = await orderRepository.findOne({
      where: { id: productId },
      relations: ['owner'],
    })

    if (!order) throw new AppError('Ordem de serviço não encontrada!', 404)

    if (owner !== order.owner.id) throw new AppError('Você não tem permissão para acessar essa ordem de serviço!', 401)

    await orderRepository.delete({ id: productId })
  }
}
