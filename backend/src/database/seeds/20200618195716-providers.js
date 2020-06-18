'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('providers', [
      {
        name_provider: 'Nestlé LTDA',
        email: 'nestle@email.com',
        cnpj: '12345678900',
        password_hash: '$2a$08$F.bNRBusQ7IScngrclisieEYJXhZRPNl/qx/vnfNPLGixV1emUd22',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_provider: 'Pepsico',
        email: 'pepsico@email.com',
        cnpj: '12345678901',
        password_hash: '$2a$08$F.bNRBusQ7IScngrclisieEYJXhZRPNl/qx/vnfNPLGixV1emUd22',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name_provider: 'Hinode LTDA',
        email: 'hinode@email.com',
        cnpj: '12345678902',
        password_hash: '$2a$08$F.bNRBusQ7IScngrclisieEYJXhZRPNl/qx/vnfNPLGixV1emUd22',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('providers', null, {})
  }
}
