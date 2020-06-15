import { Router } from 'express'

import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ProviderController from './app/controllers/ProviderController'

import authUserMiddlewares from './app/middlewares/authUser'

const routes = new Router()

routes
  .post('/user', UserController.store)
  .post('/provider', ProviderController.store)

  .post('/sessions', SessionController.store)

  .get('/user', authUserMiddlewares, UserController.show)
  .put('/user', authUserMiddlewares, UserController.update)

export default routes
