import { Router } from 'express'

import authUserMiddleware from '@middleware/authUser'

const itemsRoute = Router()

itemsRoute.use(authUserMiddleware)

itemsRoute.post('/', async (request, response) => {})
itemsRoute.put('/:id', async (request, response) => {})
itemsRoute.delete('/:id', async (request, response) => {})

export default itemsRoute
