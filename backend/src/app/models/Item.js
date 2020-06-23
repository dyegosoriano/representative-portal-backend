import Sequelize, { Model } from 'sequelize'

export default class Item extends Model {
  static init (connection) {
    super.init(
      {
        amount: Sequelize.INTEGER,
        total_price: Sequelize.DECIMAL
      },
      { sequelize: connection }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' })
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'provider' })
    this.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' })
  }
}
