import Sequelize, { Model } from 'sequelize'

export default class Product extends Model {
  static init (connection) {
    super.init(
      {
        product_name: Sequelize.STRING,
        amount: Sequelize.INTEGER,
        price: Sequelize.INTEGER
      },
      { sequelize: connection }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'owner' })
  }
}
