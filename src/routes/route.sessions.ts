import { Router } from 'express'

import AuthenticateProviderService from '@services/AuthenticateProviderService'
import AuthenticateUserService from '@services/AuthenticateUserService'

const sessionsRoute = Router()

sessionsRoute.post('/user', async (request, response) => {
  const { email, password } = request.body

  const authenticateUser = new AuthenticateUserService()
  const responseAuthenticate = await authenticateUser.execute({
    email,
    password,
  })

  return response.json(responseAuthenticate)
})

sessionsRoute.post('/provider', async (request, response) => {
  const { email, password } = request.body

  const authenticateProvider = new AuthenticateProviderService()
  const responseAuthenticate = await authenticateProvider.execute({
    email,
    password,
  })

  return response.json(responseAuthenticate)
})

export default sessionsRoute
