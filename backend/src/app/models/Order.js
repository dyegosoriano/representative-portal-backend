import Sequelize, { Model } from 'sequelize'

export default class Order extends Model {
  static init (connection) {
    super.init(
      {
        aproved_at: Sequelize.DATE,
        canceled_at: Sequelize.DATE,
        confirmed_at: Sequelize.DATE
      },
      { sequelize: connection }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' })
    this.hasMany(models.Item, { foreignKey: 'order_id', as: 'itens' })
  }
}
