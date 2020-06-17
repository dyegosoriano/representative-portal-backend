import Sequelize, { Model } from 'sequelize'

class Product extends Model {
  static init (connection) {
    super.init(
      {
        name_product: Sequelize.STRING,
        price: Sequelize.INTEGER,
        amount: Sequelize.INTEGER
      },
      { sequelize: connection }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'owner' })
  }
}

export default Product
