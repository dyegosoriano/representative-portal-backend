'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('providers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name_provider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      logo_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        allowNull: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('providers')
  }
}
