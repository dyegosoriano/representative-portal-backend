import { Router } from 'express'

import ShowOnlyProductsService from '@services/ShowOnlyProductsService'
import ShowAllProductsService from '@services/ShowAllProductsService'
import CreateProductService from '@services/CreateProductService'
import UpdateProductService from '@services/UpdateProductService'
import DeleteProductService from '@services/DeleteProductService'

import authProviderMiddleware from '@middleware/authProvider'

const productsRouter = Router()

productsRouter.get('/', async (request, response) => {
  const page = Number(request.query.page) || 0

  const showProducts = new ShowAllProductsService()
  const products = await showProducts.execute({ page })

  return response.json(products)
})

productsRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const showProduct = new ShowOnlyProductsService()
  const product = await showProduct.execute(id)

  return response.json(product)
})

productsRouter.use(authProviderMiddleware)

productsRouter.post('/', async (request, response) => {
  const { product, price, amount } = request.body
  const { provider } = request

  const createProduct = new CreateProductService()
  const productCreated = await createProduct.execute({
    provider,
    product,
    amount,
    price,
  })

  return response.json(productCreated)
})

productsRouter.put('/:id', async (request, response) => {
  const { product, price, amount } = request.body
  const provider = request.provider
  const { id } = request.params

  const updateProduct = new UpdateProductService()
  const updatedProduct = await updateProduct.execute({
    provider,
    product,
    amount,
    price,
    id,
  })

  return response.json(updatedProduct)
})

productsRouter.delete('/:id', async (request, response) => {
  const provider = request.provider
  const { id } = request.params

  const deleteProduct = new DeleteProductService()
  await deleteProduct.execute({ provider, id })

  return response.json({ message: `Ação concluída com sucesso!` })
})

export default productsRouter
