import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProviderController from './app/controllers/ProviderController'
import ProductController from './app/controllers/ProductController'

import authUserMiddlewares from './app/middlewares/authUser'
import authProviderMiddlewares from './app/middlewares/authProvider'

const routes = new Router()

routes
  .post('/user', UserController.store)
  .post('/provider', ProviderController.store)

  .post('/user/sessions', SessionController.user)
  .post('/provider/sessions', SessionController.provider)

  .get('/user', authUserMiddlewares, UserController.show)
  .put('/user', authUserMiddlewares, UserController.update)

  .get('/provider', authProviderMiddlewares, ProviderController.show)
  .put('/provider', authProviderMiddlewares, ProviderController.update)

  .post('/provider/products', authProviderMiddlewares, ProductController.store)
  .get('/provider/products', authProviderMiddlewares, ProductController.index)
  .put('/provider/products/:product_id', authProviderMiddlewares, ProductController.update)
  .delete('/provider/products/:product_id', authProviderMiddlewares, ProductController.delete)

export default routes
