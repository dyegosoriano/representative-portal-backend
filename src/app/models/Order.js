import Sequelize, { Model } from 'sequelize'

export default class Order extends Model {
  static init (connection) {
    super.init(
      {
        confirmed: Sequelize.DATE,
        delivered: Sequelize.DATE,
        on_my_way: Sequelize.DATE,
        canceled: Sequelize.DATE,
        closed: Sequelize.DATE
      },
      { sequelize: connection }
    )

    return this
  }

  static associate (models) {
    this.belongsTo(models.User, { foreignKey: 'owner_id', as: 'owner' })
    this.hasMany(models.Item, { foreignKey: 'order_id', as: 'items' })
  }
}
