'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        product_name: 'KitKat',
        price: 5.00,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Mucilon',
        price: 9.59,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Ninho',
        price: 12.60,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'PassaTempo',
        price: 3.60,
        amount: 100000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Nescau 2.0',
        price: 10.23,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Ruffles',
        price: 15.89,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Cheetos',
        price: 4.33,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Doritos',
        price: 14.60,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Fandangos',
        price: 3.60,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Ceboolitos',
        price: 6.22,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Empire',
        price: 210.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Lattitude',
        price: 200.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Grand',
        price: 190.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Gold',
        price: 160.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Grace',
        price: 195.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Dazzle',
        price: 170.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        product_name: 'Eterna',
        price: 210.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {})
  }
}
