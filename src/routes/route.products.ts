import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'

import authProviderMiddleware from '@middleware/authProvider'

import Products from '@entity/Products'
import products_view from '@views/products_view'

const productsRouter = Router()

productsRouter.get('/', async (req: Request, res: Response) => {})

productsRouter.get('/:id', async (req: Request, res: Response) => {})

productsRouter.use(authProviderMiddleware)

productsRouter.post('/', async (req: Request, res: Response) => {
  const { product_name, price, amount, product_image } = req.body
  const provider_id = req.providerId

  const productRepository = getRepository(Products)

  const newProduct = productRepository.create({
    created_at: new Date(),
    updated_at: new Date(),
    product_image,
    product_name,
    provider_id,
    amount,
    price,
  })

  const productCreated = await productRepository.save(newProduct)

  return res.json(products_view.render(productCreated))
})

productsRouter.put('/', async (req: Request, res: Response) => {})

productsRouter.delete('/:id', async (req: Request, res: Response) => {})

export default productsRouter
