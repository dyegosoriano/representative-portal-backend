import { Router } from 'express'

import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'

const routes = new Router()

routes
  .post('/user', UserController.store)
  .post('/sessions', SessionController.store)

export default routes
