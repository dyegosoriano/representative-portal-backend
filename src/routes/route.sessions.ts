import { Request, Response, Router } from 'express'

import AuthenticateProviderService from '@services/AuthenticateProviderService'
import AuthenticateUserService from '@services/AuthenticateUserService'

const sessionsRoute = Router()

sessionsRoute.post('/user', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const authenticateUser = new AuthenticateUserService()
  const responseAuthenticate = await authenticateUser.execute({
    email,
    password,
  })

  return res.json(responseAuthenticate)
})

sessionsRoute.post('/provider', async (req: Request, res: Response) => {
  const { email, password } = req.body

  const authenticateProvider = new AuthenticateProviderService()
  const responseAuthenticate = await authenticateProvider.execute({
    email,
    password,
  })

  return res.json(responseAuthenticate)
})

export default sessionsRoute
