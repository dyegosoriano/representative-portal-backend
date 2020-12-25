import { getRepository } from 'typeorm'
import { validate } from 'uuid'

import items_view from '@views/items_view'
import AppError from '@errors/AppError'

import Product from '@entity/Product'
import Order from '@entity/Order'
import Item from '@entity/Item'

interface Request {
  productId: string
  orderId: string
  amount: number
  owner: string
}

export default class CreateItemService {
  async execute({ productId, amount, orderId, owner }: Request): Promise<any> {
    if (!validate(productId) || !validate(orderId)) throw new AppError('ID válido', 401)

    const order = await getRepository(Order).findOne({ where: { id: orderId }, relations: ['owner'] })
    const product = await getRepository(Product).findOne({ where: { id: productId } })

    if (!order) throw new AppError('Ordem de serviço não encontrada!', 404)
    if (!product) throw new AppError('O produto solicitado não foi encontrado!', 404)

    if (owner !== order.owner.id) throw new AppError('Você não tem permissão para acessar essa ordem de serviço!', 401)

    const totalPrice = +(product.price * amount).toFixed(2)

    const itemRepository = getRepository(Item)
    const item = await itemRepository.save({
      totalPrice,
      product,
      amount,
      order,
    })

    return items_view.render(item)
  }
}
