import User from '../models/User'

class UserController {
  async store (request, response) {
    // Cadastrar usuário
    const { name, email, password } = request.body

    const newUser = await User.create({
      password_hash: password,
      name,
      email
    })

    return response.json(newUser)
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
