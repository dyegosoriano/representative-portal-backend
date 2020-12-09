import { Router } from 'express'

import ShowAllOrdersService from '@services/ShowAllOrdersService'
import ShowOnlyOrderService from '@services/ShowOnlyOrderService'
import CreateOrderService from '@services/CreateOrderService'
import UpdateOrderService from '@services/UpdateOrderService'
import DeleteOrderService from '@services/DeleteOrderService'

import authUserMiddleware from '@middleware/authUser'

const orderRoute = Router()

orderRoute.use(authUserMiddleware)

orderRoute.post('/', async (request, response) => {
  const owner = request.user

  const createOrder = new CreateOrderService()
  const order = await createOrder.execute({ owner })

  return response.json(order)
})

orderRoute.get('/', async (request, response) => {
  const page = Number(request.query.page) || 0
  const owner = request.user

  const listOrders = new ShowAllOrdersService()
  const orders = await listOrders.execute({ owner, page })

  return response.json(orders)
})

orderRoute.get('/:id', async (request, response) => {
  const productId = request.params.id
  const owner = request.user.id

  const showOrder = new ShowOnlyOrderService()
  const order = await showOrder.execute({ productId, owner })

  return response.json(order)
})

orderRoute.put('/:id', async (request, response) => {
  const productId = request.params.id
  const updateData = request.body
  const owner = request.user.id

  const updateOrder = new UpdateOrderService()
  const order = await updateOrder.execute({ productId, owner, updateData })

  return response.json(order)
})

orderRoute.delete('/:id', async (request, response) => {
  const productId = request.params.id
  const owner = request.user.id

  const deleteOrder = new DeleteOrderService()
  await deleteOrder.execute({ productId, owner })

  return response.json({ message: `Ação concluída com sucesso!` })
})

export default orderRoute
