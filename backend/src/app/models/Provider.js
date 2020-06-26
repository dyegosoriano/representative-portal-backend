import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

export default class Provider extends Model {
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
    this.addHook('beforeSave', async (provider) => {
      if (provider.password) {
        provider.password_hash = await bcrypt.hash(provider.password, 8)
      }
    })

    return this
  }

  static associate (models) {
    this.hasMany(models.Product, { foreignKey: 'provider_id', as: 'products' })
  }

  // Método de verificação de senha
  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
