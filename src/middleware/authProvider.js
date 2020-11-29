import { promisify } from 'util'
import jwt from 'jsonwebtoken'

import AppError from '@errors/AppError'
import authConfig from '@config/auth'

export default async function authProviderMiddleware(req, res, next) {
  // Carregando token da requisição
  const authHeader = req.headers.authorization

  // Validando existência do token
  if (!authHeader) throw new AppError('Token not provided', 401)

  const [, token] = authHeader.split(' ')

  const decoded = await promisify(jwt.verify)(token, authConfig.secretProvider)

  req.providerId = decoded.id

  return next()
}
