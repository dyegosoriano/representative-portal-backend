import { Router } from 'express'

import CreateItemService from '@services/CreateItemService'
import DeleteItemService from '@services/DeleteItemService'

import authUserMiddleware from '@middleware/authUser'

const itemsRoute = Router()

itemsRoute.use(authUserMiddleware)

itemsRoute.post('/', async (request, response) => {
  const { amount, orderId, productId } = request.body
  const owner = request.user.id

  const createItem = new CreateItemService()
  const item = await createItem.execute({ amount, orderId, productId, owner })

  return response.json(item)
})

itemsRoute.delete('/:id', async (request, response) => {
  const { id } = request.params
  const { user } = request

  const deleteItem = new DeleteItemService()
  await deleteItem.execute({ id, user })

  return response.json({ message: `O item foi deletado com sucesso!` })
})

export default itemsRoute
