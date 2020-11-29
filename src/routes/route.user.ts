import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'

import { passwordCheck, passwordEncrypt } from '@util/password'
import authUserMiddleware from '@middleware/authUser'
import users_view from '@views/users_view'
import AppError from '@errors/AppError'

import Users from '@entity/Users'

const userRoute = Router()

userRoute.post('/', async (req: Request, res: Response) => {
  const { name, email, cnpj, password } = req.body

  const userRepository = getRepository(Users)
  const userExist = await userRepository.find({
    where: [{ email }, { cnpj }],
  })

  userExist.find(user => {
    if (user.email === email)
      throw new AppError('The email already exists!', 401)
    if (user.cnpj === cnpj) throw new AppError('The CNPJ already exists!', 401)
  })

  const data = {
    password_hash: await passwordEncrypt(password),
    created_at: new Date(),
    updated_at: new Date(),
    email,
    name,
    cnpj,
  }

  const user = userRepository.create(data)
  const userCreated = await userRepository.save(user)

  return res.json(users_view.render(userCreated))
})

userRoute.use(authUserMiddleware)

userRoute.get('/', async (req: Request, res: Response) => {
  const id = req.userId

  const userRepo = getRepository(Users)
  const user = await userRepo.findOneOrFail({ id })

  return res.json(users_view.render(user))
})

userRoute.put('/', async (req: Request, res: Response) => {
  const id = req.userId
  const {
    confirmationPassword,
    oldPassword,
    newPassword,
    name,
    email,
    cnpj,
  } = req.body

  const userRepository = getRepository(Users)
  const user = await userRepository.findOneOrFail({ id })

  const passwordChecked = await passwordCheck(oldPassword, user.password_hash)

  if (oldPassword && !passwordChecked) {
    throw new AppError('Password does not match', 401)
  }

  if (newPassword === confirmationPassword) {
    user.password_hash = await passwordEncrypt(newPassword)
  } else {
    throw new AppError(
      'The confirmation password does not match the new password',
      401,
    )
  }

  if (email || cnpj) {
    const userExist = await userRepository.find({
      where: [{ email }, { cnpj }],
    })

    userExist.find(item => {
      if (user.id !== item.id) {
        if (item.email === email) {
          throw new AppError('The email already exists!', 401)
        }
        if (item.cnpj === cnpj) {
          throw new AppError('The CNPJ already exists!', 401)
        }
      }
    })

    user.email !== email ? (user.email = email) : false
    user.cnpj !== cnpj ? (user.cnpj = cnpj) : false
  }

  if (name) {
    user.name = name
  }

  await userRepository.save(user)

  return res.json(users_view.render(user))
})

export default userRoute
