'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      owner_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },
      confirmed: {
        type: Sequelize.DATE,
        allowNull: true
      },
      closed: {
        type: Sequelize.DATE,
        allowNull: true
      },
      delivered: {
        type: Sequelize.DATE,
        allowNull: true
      },
      on_my_way: {
        type: Sequelize.DATE,
        allowNull: true
      },
      canceled: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('orders')
  }
}
