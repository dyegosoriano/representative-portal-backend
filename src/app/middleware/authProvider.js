import jwt from 'jsonwebtoken'
import { promisify } from 'util'

import authConfig from '@config/auth'

export default async function authUserMiddleware (request, response, next) {
  // Carregando token da requisição
  const authHeader = request.headers.authorization

  // Validando existência do token
  if (!authHeader) { return response.status(401).json({ error: 'Token not provided' }) }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secretProvider)

    request.userId = decoded.id

    return next()
  } catch (error) {
    return response.status(401).json({ error: 'Token invalid' })
  }
}
