'use strict';

const bcrypt     = require('bcrypt');
   
module.exports   = (sequelize, DataTypes) => {
  const LocalKey = sequelize.define('LocalKey', {
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

  LocalKey.associate = models => {
    LocalKey.belongsTo(models.User, {
      foreignKey: 'UserID',
      onDelete: 'CASCADE',
    });
  }
  return LocalKey;
};