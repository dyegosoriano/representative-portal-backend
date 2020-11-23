import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

export default class Provider extends Model {
  static init (connection) {
    super.init(
      {
        name_provider: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        logo_id: Sequelize.INTEGER,
        email: Sequelize.STRING,
        cnpj: Sequelize.STRING
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
    // this.hasMany(models.User, { foreignKey: 'provider_id', as: 'users' })
  }

  // Método de verificação de senha
  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
