'use strict';
const uuidv1 = require('uuid/v1');


module.exports = (sequelize, DataTypes) => {
  const User   = sequelize.define('User', {
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

  return User;
};