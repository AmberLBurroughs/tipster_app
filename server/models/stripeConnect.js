'use strict';
const uuidv1 = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const StripeConnect = sequelize.define('StripeConnect', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      isUnique: true
    },

    key: {
     type: DataTypes.STRING,
    },

    lastFour: {
      type: DataTypes.STRING,
    }

  });

  // StripeConnect.associate = function(models) {
  //   StripeConnect.belongsTo(models.User, {
  //     foreignKey: 'fk_userUUID',
  //     allowNull: false
  //   });
  // }
  return StripeConnect;
};