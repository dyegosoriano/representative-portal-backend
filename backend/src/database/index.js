import Sequelize from 'sequelize'

import User from '../app/models/User'
import Provider from '../app/models/Provider'
import Product from '../app/models/Product'
import Order from '../app/models/Order'
import Item from '../app/models/Item'

import databaseConfig from '../config/database'

const models = [User, Provider, Product, Order, Item]

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
