import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProviderController from './app/controllers/ProviderController'
import ProductController from './app/controllers/ProductController'
import OrderController from './app/controllers/OrderController'
import ItemController from './app/controllers/ItemController'

import authUserMiddlewares from './app/middlewares/authUser'
import authProviderMiddlewares from './app/middlewares/authProvider'

const routes = new Router()

routes
  // Rotas de autenticação
  .post('/sessions/user', SessionController.user)
  .post('/sessions/provider', SessionController.provider)

  // Rotas de usuários
  .post('/user', UserController.store)
  .get('/user', authUserMiddlewares, UserController.show)
  .put('/user', authUserMiddlewares, UserController.update)

  // Rotas de provedores
  .post('/provider', ProviderController.store)
  .put('/provider', authProviderMiddlewares, ProviderController.update)
  .get('/provider', authProviderMiddlewares, ProviderController.index)
  .get('/provider/:id', authProviderMiddlewares, ProviderController.show)
  .delete('/provider', authProviderMiddlewares, ProviderController.delete)

  // Rotas de ordens de serviços
  .post('/orders', authUserMiddlewares, OrderController.store)
  .put('/orders/:id', authUserMiddlewares, OrderController.update)
  .get('/orders', authUserMiddlewares, OrderController.index)
  .get('/orders/:id', authUserMiddlewares, OrderController.show)
  .delete('/orders/:id', authUserMiddlewares, OrderController.delete)

  // Rotas de item das rodens de serviços
  .post('/items', authUserMiddlewares, ItemController.store)
  .put('/items/:id', authUserMiddlewares, ItemController.update)
  .delete('/items/:id', authUserMiddlewares, ItemController.delete)

  // Rotas de produtos
  .post('/products', authProviderMiddlewares, ProductController.store)
  .put('/products/:product_id', authProviderMiddlewares, ProductController.update)
  .get('/products', authProviderMiddlewares, ProductController.index)
  .get('/products/:id', authProviderMiddlewares, ProductController.show)
  .delete('/products/:product_id', authProviderMiddlewares, ProductController.delete)

export default routes
