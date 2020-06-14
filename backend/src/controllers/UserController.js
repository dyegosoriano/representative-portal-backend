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
    return response.json()
  }

  async index (request, response) {
    // Listagem de usuários
    return response.json()
  }

  async show (request, response) {
    // Exibir um único usuário
    return response.json()
  }

  async delete (request, response) {
    // Remover usuário
    return response.json()
  }
}

export default new UserController()
