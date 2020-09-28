'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          id: 1,
          owner_id: 1,
          closed: null,
          canceled: null,
          confirmed: null,
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          owner_id: 1,
          closed: null,
          canceled: null,
          confirmed: new Date(),
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          owner_id: 1,
          closed: new Date(),
          canceled: null,
          confirmed: null,
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 4,
          owner_id: 2,
          closed: null,
          canceled: null,
          confirmed: null,
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 5,
          owner_id: 1,
          closed: null,
          canceled: new Date(),
          confirmed: null,
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 6,
          owner_id: 1,
          closed: new Date(),
          canceled: null,
          confirmed: null,
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 7,
          owner_id: 1,
          closed: null,
          canceled: null,
          confirmed: new Date(),
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 8,
          owner_id: 1,
          closed: null,
          canceled: null,
          confirmed: null,
          delivered: null,
          on_my_way: null,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('orders', null, {})
  }
}
