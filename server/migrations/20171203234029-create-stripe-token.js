'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StripeTokens', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        isUnique :true
      },
      token: {
        type: Sequelize.STRING,
        isUnique :true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userUUID: {
        type: Sequelize.UUID,
          references: {
            model: 'User',
            key: 'uuid',
            as: 'userUUID',
          },
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('StripeTokens');
  }
};