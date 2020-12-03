import { Router } from 'express'

import authUserMiddleware from '@middleware/authUser'

const orderRoute = Router()

orderRoute.use(authUserMiddleware)
orderRoute.post('/', async (request, response) => {})
orderRoute.get('/', async (request, response) => {})
orderRoute.get('/:id', async (request, response) => {})
orderRoute.put('/:id', async (request, response) => {})
orderRoute.delete('/:id', async (request, response) => {})

export default orderRoute
