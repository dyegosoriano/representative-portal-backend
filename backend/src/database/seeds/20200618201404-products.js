'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        name_product: 'KitKat',
        price: 5.00,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Mucilon',
        price: 9.59,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Ninho',
        price: 12.60,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'PassaTempo',
        price: 3.60,
        amount: 100000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Nescau 2.0',
        price: 10.23,
        amount: 10000,
        provider_id: 1,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Ruffles',
        price: 15.89,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Cheetos',
        price: 4.33,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Doritos',
        price: 14.60,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Fandangos',
        price: 3.60,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Ceboolitos',
        price: 6.22,
        amount: 10000,
        provider_id: 2,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Empire',
        price: 210.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Lattitude',
        price: 200.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Grand',
        price: 190.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Gold',
        price: 160.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Grace',
        price: 195.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Dazzle',
        price: 170.00,
        amount: 10000,
        provider_id: 3,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_product: 'Eterna',
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
