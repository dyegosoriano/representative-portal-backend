import { Router } from 'express'
import multer from 'multer'

import productsRouter from './route.products'
import sessionsRoute from './route.sessions'
import providerRoute from './route.provider'
import orderRoute from './route.orders'
import userRoute from './route.user'

import multerConfig from '@config/multer'

const upload = multer(multerConfig)

const routes = Router()

routes
  .use('/products', productsRouter)
  .use('/sessions', sessionsRoute)
  .use('/provider', providerRoute)
  .use('/order', orderRoute)
  .use('/user', userRoute)

// // Files
// .post('/files', upload.single('file'), FileController.store)

// // Rotas de ordens de serviços
// .post('/orders', authUserMiddleware, OrderController.store)
// .put('/orders/:id', authUserMiddleware, OrderController.update)
// .get('/orders', authUserMiddleware, OrderController.index)
// .get('/orders/:id', authUserMiddleware, OrderController.show)
// .delete('/orders/:id', authUserMiddleware, OrderController.delete)

// // Rotas de item das ordens de serviços
// .post('/items', authUserMiddleware, ItemController.store)
// .put('/items/:id', authUserMiddleware, ItemController.update)
// .delete('/items/:id', authUserMiddleware, ItemController.delete)

// // Rotas de produtos
// .get('/products', ProductController.index)
// .get('/products/:id', ProductController.show)

// .post('/products', authProviderMiddleware, ProductController.store)
// .put('/products/:id', authProviderMiddleware, ProductController.update)
// .delete(
//   '/products/:product_id',
//   authProviderMiddleware,
//   ProductController.delete,
// )

export default routes
