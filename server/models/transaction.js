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
    
    // placeID: {
    //   type: DataTypes.STRING,
    //   required: true,
    //   allowNull: false
    // },

    // receiverID: {
    //   type: DataTypes.UUID,
    //   required: true,
    //   allowNull:false
    // },
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

    status: {
      type: DataTypes.STRING,
      required: true,
      default: "pending"
    },

    // fk_place_id: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: "Locations", // Can be both a string representing the table name, or a reference to the model
    //     key:   "placeID"
    //   }
    // },
  }); 

  Transaction.associate = models => {
    Transaction.belongsTo(models.User, {
      foreignKey: 'fk_tipperuuid',});

    Transaction.belongsTo(models.User, {
      foreignKey: 'fk_receiveruuid',});

    Transaction.belongsTo(models.Location, {
      foreignKey: 'fk_place_id',
      targetKey: 'placeID'
    });
  }
  
  return Transaction;
};