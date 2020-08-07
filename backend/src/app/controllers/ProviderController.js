import Provider from '../models/Provider'

class ProviderController {
  async store (request, response) {
    // Cadastrar provedor
    const { name_provider, email, cnpj, password } = request.body

    try {
      const emailExist = await Provider.findOne({ where: { email } })
      const cnpjExist = await Provider.findOne({ where: { cnpj } })

      if (emailExist) return response.status(400).json({ error: 'The email has already been registered previously' })
      if (cnpjExist) return response.status(400).json({ error: 'CNPJ has been previously registered' })

      const { id } = await Provider.create({ name_provider, password, email, cnpj })

      return response.json({ id, name_provider, email, cnpj })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async update (request, response) {
    // Alterar provedor
    const { name_provider, email, cnpj, oldPassword, newPassword, confirmationPassword } = request.body

    try {
      const provider = await Provider.findByPk(request.userId)

      if (email !== provider.email) {
        const emailExist = await Provider.findOne({ where: { email } })

        if (emailExist) {
          return response
            .status(401)
            .json({ error: 'The email already exists in the database.' })
        }
      }

      if (cnpj !== provider.cnpj) {
        const cnpjExist = await Provider.findOne({ where: { cnpj } })

        if (cnpjExist) {
          return response
            .status(400)
            .json({ error: 'The CNPJ already exists in the database.' })
        }
      }

      if (newPassword !== confirmationPassword) {
        return response
          .status(401)
          .json({ error: 'The confirmation password does not match the new password' })
      }

      if (oldPassword && !(await provider.checkPassword(oldPassword))) {
        return response
          .status(401)
          .json({ error: 'Password does not match' })
      }

      await provider.update({
        password: newPassword,
        name_provider,
        email,
        cnpj
      })

      return response.json({ message: `user ${provider.name_provider} has been updated` })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async index (request, response) {
    const page = Number(request.query.page) || 1
    try {
      // Listagem de dados
      const providers = await Provider.findAll({
        attributes: ['id', 'name_provider', 'email', 'cnpj'],
        limit: 10,
        offset: (page - 1) * 10
      })

      return response.json(providers)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: 'there\'s been a mistake on the server' })
    }
  }

  async show (request, response) {
    // Exibir um único provedor
    const { id } = request.params

    try {
      const provider = await Provider.findByPk(id, {
        attributes: ['id', 'name_provider', 'email'],
        include: { association: 'products' }
      })

      if (!provider) return response.status(400).json({ error: "The supplier doesn't exist!" })

      return response.json(provider)
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async delete (request, response) {
    try {
      // Remover dados
      const provider = await Provider.findByPk(request.userId)

      provider.destroy()

      await provider.save()

      return response.json({ message: `The ${provider.name_provider} supplier has been successfully excluded!` })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: 'there\'s been a mistake on the server' })
    }
  }
}

export default new ProviderController()
