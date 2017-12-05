'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('LocalKeys', {
      uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        isUnique :true
      },
      localPassword: {
        type: Sequelize.STRING,
        required: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // userUUID: {
      //   type: Sequelize.UUID,
      //     references: {
      //       model: 'User',
      //       key: 'uuid',
      //       as: 'userUUID',
      //     },
      // }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('LocalKeys');
  }
};

/*

If, for whatever reason, we needed to rollback (undo) the migration, the down function would be executed and it would undo whatever the up function did, thus returning the our database to the same state it was in before we performed the migration.

*/