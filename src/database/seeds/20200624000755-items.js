'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('items', [
      {
        id: 1,
        order_id: 1,
        provider_id: 1,
        product_id: 1,
        product_name: 'Produto 1',
        amount: 27,
        total_price: 135,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        order_id: 1,
        provider_id: 1,
        product_id: 4,
        product_name: 'Produto 2',
        amount: 3,
        total_price: 10.8,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 3,
        order_id: 1,
        provider_id: 2,
        product_id: 10,
        product_name: 'Produto 3',
        amount: 31,
        total_price: 192.82,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 4,
        order_id: 4,
        provider_id: 2,
        product_id: 6,
        product_name: 'Produto 4',
        amount: 4,
        total_price: 63.56,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 5,
        order_id: 4,
        provider_id: 3,
        product_id: 13,
        product_name: 'Produto 5',
        amount: 2,
        total_price: 380,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('items', null, {})
  }
}
