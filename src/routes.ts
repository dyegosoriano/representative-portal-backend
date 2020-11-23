import { Router } from 'express'
import multer from 'multer'

import ProviderController from '@controllers/ProviderController'
import ProductController from '@controllers/ProductController'
import SessionController from '@controllers/SessionController'
import OrderController from '@controllers/OrderController'
import FileController from '@controllers/FileController'
import ItemController from '@controllers/ItemController'
import UserController from '@controllers/UserController'

import authProviderMiddleware from '@middleware/authProvider'
import authUserMiddleware from '@middleware/authUser'
import multerConfig from './config/multer'

const upload = multer(multerConfig)

const routes = Router()

export default routes

  // Files
  .post('/files', upload.single('file'), FileController.store)

  // Rotas de autenticação
  .post('/sessions/user', SessionController.user)
  .post('/sessions/provider', SessionController.provider)

  // Rotas de usuários
  .post('/user', UserController.store)
  .get('/user', authUserMiddleware, UserController.show)
  .put('/user', authUserMiddleware, UserController.update)

  // Rotas de provedores
  .post('/provider', ProviderController.store)
  .put('/provider', authProviderMiddleware, ProviderController.update)
  .get('/provider', authProviderMiddleware, ProviderController.index)
  .get('/provider/:id', authProviderMiddleware, ProviderController.show)
  .delete('/provider', authProviderMiddleware, ProviderController.delete)

  // Rotas de ordens de serviços
  .post('/orders', authUserMiddleware, OrderController.store)
  .put('/orders/:id', authUserMiddleware, OrderController.update)
  .get('/orders', authUserMiddleware, OrderController.index)
  .get('/orders/:id', authUserMiddleware, OrderController.show)
  .delete('/orders/:id', authUserMiddleware, OrderController.delete)

  // Rotas de item das ordens de serviços
  .post('/items', authUserMiddleware, ItemController.store)
  .put('/items/:id', authUserMiddleware, ItemController.update)
  .delete('/items/:id', authUserMiddleware, ItemController.delete)

  // Rotas de produtos
  .get('/products', ProductController.index)
  .get('/products/:id', ProductController.show)

  .post('/products', authProviderMiddleware, ProductController.store)
  .put('/products/:id', authProviderMiddleware, ProductController.update)
  .delete(
    '/products/:product_id',
    authProviderMiddleware,
    ProductController.delete,
  )
