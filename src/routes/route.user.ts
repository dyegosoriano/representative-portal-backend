import { Request, Response, Router } from 'express'
import { getRepository } from 'typeorm'

import { passwordCheck, passwordEncrypt } from '@util/password'
import authUserMiddleware from '@middleware/authUser'
import users_view from '@views/users_view'

import Users from '@models/Users'

const userRoute = Router()

userRoute.post('/', async (req: Request, res: Response) => {
  const { name, email, cnpj, password } = req.body

  try {
    const userRepository = getRepository(Users)
    const userExist = await userRepository.find({
      where: [{ email }, { cnpj }],
    })

    userExist.find(user => {
      console.log('ok')
      if (user.email === email) throw new Error('The email already exists!')
      if (user.cnpj === cnpj) throw new Error('The CNPJ already exists!')
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
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

userRoute.use(authUserMiddleware)

userRoute.get('/', async (req: Request, res: Response) => {
  const id = req.userId

  try {
    const userRepo = getRepository(Users)
    const user = await userRepo.findOneOrFail({ id })

    return res.json(users_view.render(user))
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

userRoute.put('/', async (req: Request, res: Response) => {
  // Alterar usuário
  const id = req.userId
  const {
    name,
    email,
    cnpj,
    oldPassword,
    newPassword,
    confirmationPassword,
  } = req.body

  try {
    const userRepository = getRepository(Users)
    const user = await userRepository.findOneOrFail({ id })

    const passwordChecked = await passwordCheck(oldPassword, user.password_hash)

    if (oldPassword && !passwordChecked) {
      throw new Error('Password does not match')
    }

    if (newPassword === confirmationPassword) {
      user.password_hash = await passwordEncrypt(newPassword)
    } else {
      throw new Error(
        'The confirmation password does not match the new password',
      )
    }

    if (email !== user.email) {
      const emailExist = await userRepository.findOne({ where: { email } })

      if (emailExist) {
        throw new Error('The email already exists in the database.')
      }

      user.email = email
    }

    if (cnpj !== user.cnpj) {
      const cnpjExist = await userRepository.findOne({ where: { cnpj } })

      if (cnpjExist) {
        throw new Error('The CNPJ already exists in the database.')
      }

      user.cnpj = cnpj
    }

    if (name) {
      user.name = name
    }

    await userRepository.save(user)

    return res.json(users_view.render(user))
  } catch (error) {
    console.log(`error.message >>> ${error.message} <<<`)

    return res.status(500).json({ error: error.message })
  }
})

export default userRoute
