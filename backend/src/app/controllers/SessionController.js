import jwt from 'jsonwebtoken'

import User from '../models/User'
import Provider from '../models/Provider'

import authConfig from '../../config/auth'

class SessionController {
  async user (request, response) {
    const { email, password } = request.body

    const user = await User.findOne({ where: { email } })

    if (!user) { return response.status(401).json({ error: 'User not found' }) }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'password does not match' })
    }

    const { id, name } = user

    return response.json({
      user: { id, name, email },
      token: jwt.sign(
        { id },
        authConfig.secretUser,
        { expiresIn: authConfig.expiresIn }
      )
    })
  }

  async provider (request, response) {
    const { email, password } = request.body

    const provider = await Provider.findOne({ where: { email } })

    if (!provider) { return response.status(401).json({ error: 'Provider not found' }) }

    if (!(await provider.checkPassword(password))) {
      return response.status(401).json({ error: 'password does not match' })
    }

    const { id, name } = provider

    return response.json({
      provider: { id, name, email },
      token: jwt.sign(
        { id },
        authConfig.secretProvider,
        { expiresIn: authConfig.expiresIn }
      )
    })
  }
}

export default new SessionController()
