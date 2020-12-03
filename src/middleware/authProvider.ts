import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '@errors/AppError'
import authConfig from '@config/auth'

interface TokenPayload {
  iat: number
  exp: number
  id: string
}

export default function authProviderMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization

  if (!authHeader) throw new AppError('Token JWT ausente', 401)

  const [, token] = authHeader.split(' ')

  const decoded = verify(token, authConfig.secretProvider)
  const { id } = decoded as TokenPayload

  request.provider = { id }

  return next()
}
