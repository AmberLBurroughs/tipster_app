'use strict';

module.exports   = (sequelize, DataTypes) => {
  const Transactions = sequelize.define('Transactions', {

    senderID: {
      type: DataTypes.string,
      required: true,
      allowNull:false,
    },

    recieverID: {
      type: DataTypes.string,
      required: true,
      allowNull:false,
    },

    Amount: {
      type: DataTypes.integer,
      required: true,
      allowNull:false,
    }

  }