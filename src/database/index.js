import Sequelize from 'sequelize'

import databaseConfig from '../config/database'

import Provider from '../app/models/Provider'
import Product from '../app/models/Product'
import Order from '../app/models/Order'
import Item from '../app/models/Item'
import User from '../app/models/User'
import File from '../app/models/File'

const models = [User, Provider, Product, Order, Item, File]

class Database {
  constructor () {
    this.init()
  }

  init () {
    // Conectando com banco de dados
    this.connection = new Sequelize(databaseConfig)

    models
    // Conectando models com banco de dados
      .map(model => model.init(this.connection))
    // Chamando método de associação
      .map(model => { model.associate && model.associate(this.connection.models) })
  }
}

export default new Database()
