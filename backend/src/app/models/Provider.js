import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class Provider extends Model {
  static init (connection) {
    super.init(
      {
        name_provider: Sequelize.STRING,
        email: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      { sequelize: connection }
    )

    // Criptografando senha
    this.addHook('beforeSave', async provider => {
      if (provider.password) {
        provider.password_hash = await bcrypt.hash(provider.password, 8)
      }
    })

    return this
  }

  // Método de verificação de senha
  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}

export default Provider
