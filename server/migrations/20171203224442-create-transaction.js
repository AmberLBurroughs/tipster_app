'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      uuid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      placeID: {
        type: Sequelize.STRING,
        required: true,
        allowNull:false,
        isUnique :true
      },
      recieverID: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        required: true,
        allowNull:false
      },
      amount: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull:false
      },
       note: {
        type: Sequelize.TEXT
      },
      anonymous: {
        type:Sequelize.BOOLEAN
      },

      Status: {
        type: Sequelize.STRING,
        required: true,
        default: "pending"
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
    return queryInterface.dropTable('Transactions');
  }
};