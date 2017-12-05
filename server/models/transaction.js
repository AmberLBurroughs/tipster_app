'use strict';
const uuidv1      = require('uuid/v1');
module.exports    = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
     uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      isUnique :true
    }, 
    
    placeID: {
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
      isUnique :true
    },
    recieverID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      required: true,
      allowNull:false
    },
    amount: {
      type: DataTypes.INTEGER,
      required: true,
      allowNull:false
    },

    note: {
      type: DataTypes.TEXT
    },

    anonymous: {
      type:DataTypes.BOOLEAN
    },

    Status: {
      type: DataTypes.STRING,
      required: true,
      default: "pending"
    }
  }); 

  Transaction.associate = models => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'userUUID',});
  }
  
  return Transaction;
};