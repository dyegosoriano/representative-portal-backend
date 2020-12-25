import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import AppError from '@errors/AppError'

import Order from '@entity/Order'
import Item from '@entity/Item'

interface Request {
  user: { id: string }
  id: string
}

export default class DeleteItemService {
  async execute({ user, id }: Request): Promise<void> {
    if (!validate(id)) throw new AppError('ID válido', 401)

    const itemRepository = getRepository(Item)
    const item = await itemRepository.findOne({ where: { id }, relations: ['order'] })

    if (!item) throw new AppError('Item não encontrado', 404)

    const orderRepository = getRepository(Order)
    const order = await orderRepository.findOne({ where: { id: item.order.id }, relations: ['owner'] })

    if (user.id !== order?.owner.id) throw new AppError('Você não tem permissão para remover esse item!', 401)

    await itemRepository.delete({ id })
  }
}
