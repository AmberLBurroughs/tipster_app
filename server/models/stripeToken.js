'use strict';
const uuidv1 = require('uuid/v1');


module.exports = (sequelize, DataTypes) => {
  const StripeToken   = sequelize.define('StripeToken', {
  	uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      isUnique :true
    },

    token: {
    	type: DataTypes.STRING,
    	isUnique :true
    }

  });
  
  StripeToken.associate = function(models) {
    StripeToken.belongsTo(models.User, {
     foreignKey: {
          allowNull: false,
          onDelete: 'CASCADE',
        }
    });
  } 
  return StripeToken;
};