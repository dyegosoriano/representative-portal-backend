'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('orders', [
      {
        id: 1,
        owner_id: 1,
        confirmed_at: null,
        approved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        owner_id: 1,
        confirmed_at: new Date(),
        approved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        owner_id: 1,
        confirmed_at: null,
        approved_at: new Date(),
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        owner_id: 2,
        confirmed_at: null,
        approved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        owner_id: 1,
        confirmed_at: null,
        approved_at: null,
        canceled_at: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 6,
        owner_id: 1,
        confirmed_at: null,
        approved_at: new Date(),
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 7,
        owner_id: 1,
        confirmed_at: new Date(),
        approved_at: null,
        canceled_at: null,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 8,
        owner_id: 1,
        confirmed_at: null,
        approved_at: null,
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
