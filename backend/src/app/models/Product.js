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

  static assossiate (models) {
    this.belongsTo(models.Provider, { foreignKey: 'name_provider', as: 'owner' })
  }
}

export default Product
