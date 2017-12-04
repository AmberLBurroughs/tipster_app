'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Locations', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        isUnique :true
      },
      placeID: {
        type: Sequelize.STRING,
        required: true,
        allowNull:false,
        isUnique :true
      },
      locationName: {
        type: Sequelize.STRING,
        required: true,
        allowNull:false,
        isUnique :true
      },
      locationAddress: {
        type: Sequelize.STRING,
        required: true,
        allowNull:false,
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
    return queryInterface.dropTable('Locations');
  }
};