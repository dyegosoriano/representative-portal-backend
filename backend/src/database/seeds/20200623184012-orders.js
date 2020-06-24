'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        id: 1,
        owner_id: 1,
        confirmed_at: null,
        aproved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        owner_id: 1,
        confirmed_at: null,
        aproved_at: null,
        canceled_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        owner_id: 1,
        confirmed_at: null,
        aproved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        owner_id: 2,
        confirmed_at: null,
        aproved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {})
  }
}
