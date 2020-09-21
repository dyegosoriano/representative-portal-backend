import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProviderController from './app/controllers/ProviderController'
import ProductController from './app/controllers/ProductController'
import OrderController from './app/controllers/OrderController'
import ItemController from './app/controllers/ItemController'

import authUserMiddleware from './app/middleware/authUser'
import authProviderMiddleware from './app/middleware/authProvider'

const routes = new Router()

routes
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
  .delete('/products/:product_id', authProviderMiddleware, ProductController.delete)

export default routes
