import { Router } from 'express'

import productsRouter from './route.products'
import sessionsRoute from './route.sessions'
import providerRoute from './route.provider'
import orderRoute from './route.orders'
import itemsRoute from './route.items'
import userRoute from './route.user'

const routes = Router()

routes
  .use('/products', productsRouter)
  .use('/sessions', sessionsRoute)
  .use('/provider', providerRoute)
  .use('/order', orderRoute)
  .use('/items', itemsRoute)
  .use('/user', userRoute)

export default routes
