import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

export default class User extends Model {
  static init (connection) {
    super.init(
      {
        password_hash: Sequelize.STRING,
        // provider_id: Sequelize.INTEGER,
        password: Sequelize.VIRTUAL,
        email: Sequelize.STRING,
        name: Sequelize.STRING,
        cnpj: Sequelize.REAL
      },
      { sequelize: connection }
    )

    // Criptografando senha
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8)
      }
    })

    return this
  }

  // static associate (models) {
  //   this.belongsTo(models.Provider, { foreignKey: 'id', as: 'provider' })
  // }

  // Método de verificação de senha
  checkPassword (password) {
    return bcrypt.compare(password, this.password_hash)
  }
}
