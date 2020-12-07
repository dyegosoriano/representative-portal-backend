import { Router } from 'express'

import CreateUserService from '@services/CreateUserService'
import UpdateUserService from '@services/UpdateUserService'
import ShowUserService from '@services/ShowUserService'

import authUserMiddleware from '@middleware/authUser'

const userRoute = Router()

userRoute.post('/', async (request, response) => {
  const { name, email, cnpj, password } = request.body

  const createUser = new CreateUserService()
  const user = await createUser.execute({
    password,
    email,
    cnpj,
    name,
  })

  return response.json(user)
})

userRoute.use(authUserMiddleware)

userRoute.get('/', async (request, response) => {
  const { id } = request.user

  const showUser = new ShowUserService()
  const user = await showUser.execute({ id })

  return response.json(user)
})

userRoute.put('/', async (request, response) => {
  const { confirmPass, oldPass, newPass, email, name, cnpj } = request.body
  const { id } = request.user

  const updateUser = new UpdateUserService()
  const user = await updateUser.execute({
    confirmPass,
    newPass,
    oldPass,
    email,
    name,
    cnpj,
    id,
  })

  return response.json(user)
})

export default userRoute
