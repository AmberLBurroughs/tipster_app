'use strict';
const uuidv1 = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const StripeCustomer = sequelize.define('StripeCustomer', {
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

  // StripeCustomer.associate = function(models) {
  //   StripeCustomer.belongsTo(models.User, {
  //     foreignKey: 'fk_userUUID',
  //     allowNull: false
  //   });
  // }

  return StripeCustomer;
};
