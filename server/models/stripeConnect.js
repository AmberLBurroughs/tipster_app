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

    accessToken: {
     type: DataTypes.STRING
    },

    livemode: {
      type: DataTypes.BOOLEAN
    },
    refreshToken: {
      type: DataTypes.STRING
    },
    publishableKey: {
      type: DataTypes.STRING
    },
    connectUserId: {
      type: DataTypes.STRING,
      isUnique: true
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