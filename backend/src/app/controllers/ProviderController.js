import Provider from '../models/Provider'

class ProviderController {
  async store (request, response) {
    // Cadastrar provedor
    const { name_provider, email, cnpj, password } = request.body

    try {
      const emailExist = await Provider.findOne({ where: { email } })
      const cnpjExist = await Provider.findOne({ where: { cnpj } })

      if (emailExist) { return response.status(400).json({ error: 'The email has already been registered previously' }) }
      if (cnpjExist) { return response.status(400).json({ error: 'CNPJ has been previously registered' }) }

      const providerCreated = await Provider.create({ name_provider, password, email, cnpj })

      return response.json(providerCreated)
    } catch (error) {
      return response.status(500).json(error)
    }
  }
}

export default new ProviderController()
