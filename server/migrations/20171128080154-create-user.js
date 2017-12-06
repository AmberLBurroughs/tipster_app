'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
    uuid: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      isUnique :true
    },
    email: {
      type: Sequelize.STRING,
      isUnique :true,
      allowNull:false,
      required: true,
      validate: {
                isEmail : true
            }
    },
    username: {
      type: Sequelize.STRING,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.STRING,
      defaultValue: "/assets/images/default.png" 
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    locationUUID: {
      type: Sequelize.UUID,
        references: {
          model: 'Location',
          key: 'uuid',
          as: 'locationUUID',
        },
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};

/*

If, for whatever reason, we needed to rollback (undo) the migration, the down function would be executed and it would undo whatever the up function did, thus returning the our database to the same state it was in before we performed the migration.

*/