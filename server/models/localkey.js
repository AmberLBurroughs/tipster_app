'use strict';

const uuidv1     = require('uuid/v1');

const bcrypt     = require('bcrypt');   
module.exports   = (sequelize, DataTypes) => {
  const LocalKey = sequelize.define('LocalKey', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      isUnique :true
    },

    localPassword: {
      type: DataTypes.STRING,
      required: true
    }
  });
  
  // methods ======================
  // generating a hash
  LocalKey.generateHash = password =>{
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };

  // checking if password is valid
  LocalKey.validPassword = password => {
      return bcrypt.compareSync(password, this.localPassword);
  };

  LocalKey.associate = function(models) {
    LocalKey.belongsTo(models.User, {
      foreignKey: {
      allowNull: false
      }
    });
  } 
  return LocalKey;
};