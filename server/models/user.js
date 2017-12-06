'use strict';
const uuidv1   = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  const User   = sequelize.define('User', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      isUnique :true
    },

    email: {
      type: DataTypes.STRING,
      isUnique :true,
      allowNull:false,
      required: true,
      validate: {
                isEmail : true
            }
    },
   //afterCreate
    username: {
      type: DataTypes.STRING,
    },

    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "/assets/images/default.png" 
    }
    // locations 
  }
  ,{
    hooks: {
      beforeCreate: user => {
        const emailArr = user.email.split("@");
        user.username = emailArr[0] + Math.random().toString(36).substring(7);
      }
    }
  });

  // methods ======================
  User.associate = models => {
    User.belongsToMany(models.Location, { as: 'workPlace', through: 'userLocation', foreignKey: 'LocationUUID' }),

    // has many transactions
    User.hasMany(models.Transaction);
  }

  return User;
};