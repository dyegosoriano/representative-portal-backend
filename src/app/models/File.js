import Sequelize, { Model } from 'sequelize'

export default class File extends Model {
  static init (connection) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,

        url: {
          type: Sequelize.VIRTUAL,
          get () {
            return `http://localhost:${process.env.PORT || 3333}/files/${this.path}`
          }
        }
      },
      { sequelize: connection }
    )

    return this
  }
}
