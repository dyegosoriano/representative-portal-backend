import User from '../models/User'

class UserController {
  async store (request, response) {
    // Cadastrar usuário
    const { name, email, cpf, password } = request.body

    try {
      const emailExist = await User.findOne({ where: { email } })
      const cpfExist = await User.findOne({ where: { cpf } })

      if (emailExist) { return response.status(400).json({ error: 'The email already exists!' }) }
      if (cpfExist) { return response.status(400).json({ error: 'The CPF already exists!' }) }

      const newUser = await User.create({ password, name, email, cpf })

      return response.json(newUser)
    } catch (error) {
      response.json(error)
    }
  }

  async update (request, response) {
    // Alterar usuário
    const { name, email, cpf, oldPassword, newPassword, confirmationPassword } = request.body

    try {
      const user = await User.findByPk(request.userId)

      if (email !== user.email) {
        const emailExist = await User.findOne({ where: { email } })

        if (emailExist) {
          return response.status(401).json(
            { error: 'The email already exists in the database.' }
          )
        }
      }

      if (newPassword !== confirmationPassword) {
        return response.status(401).json(
          { error: 'The confirmation password does not match the new password' }
        )
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return response.status(401).json(
          { error: 'Password does not match' }
        )
      }

      await user.update({
        password: newPassword,
        name,
        email,
        cpf
      })

      return response.json({ message: `user ${user.name} has been updated` })
    } catch (error) {
      return response.json(error)
    }
  }

  async show (request, response) {
    // Exibir um único usuário
    try {
      const { name, email, cpf } = await User.findByPk(request.userId)

      return response.json({
        name,
        email,
        cpf
      })
    } catch (error) {
      return response.status(500)
    }
  }
}

export default new UserController()
