import jwt from 'jsonwebtoken'

import User from '../models/User'
import Provider from '../models/Provider'

import authConfig from '../../config/auth'

class SessionController {
  async user (request, response) {
    const { email, password } = request.body

    try {
      const user = await User.findOne({ where: { email } })

      if (!user) { return response.status(401).json({ error: 'User not found' }) }

      if (!(await user.checkPassword(password))) {
        return response.status(401).json({ error: 'password does not match' })
      }

      const { id, name, cnpj } = user

      return response.json({
        user: { name, email, cnpj },
        token: jwt.sign(
          { id },
          authConfig.secretUser,
          { expiresIn: authConfig.expiresIn }
        )
      })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }

  async provider (request, response) {
    const { email, password } = request.body

    try {
      const provider = await Provider.findOne({ where: { email } })

      if (!provider) { return response.status(401).json({ error: 'Provider not found' }) }

      if (!(await provider.checkPassword(password))) {
        return response.status(401).json({ error: 'password does not match' })
      }

      const { id, name_provider, cnpj } = provider

      return response.json({
        provider: { name_provider, email, cnpj },
        token: jwt.sign(
          { id },
          authConfig.secretProvider,
          { expiresIn: authConfig.expiresIn }
        )
      })
    } catch (error) {
      console.log(`error.message >>> ${error.message} <<<`)

      return response
        .status(500)
        .json({ error: "there's been a mistake on the server" })
    }
  }
}

export default new SessionController()
