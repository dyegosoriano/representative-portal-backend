'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        name: 'Dyego Soriano',
        email: 'dyego@email.com',
        cnpj: '12345678900',
        // provider_id: 1,
        password_hash: '$2a$08$F.bNRBusQ7IScngrclisieEYJXhZRPNl/qx/vnfNPLGixV1emUd22',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Rebecca Soriano',
        email: 'rebecca@email.com',
        cnpj: '12345678901',
        // provider_id: 1,
        password_hash: '$2a$08$F.bNRBusQ7IScngrclisieEYJXhZRPNl/qx/vnfNPLGixV1emUd22',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
