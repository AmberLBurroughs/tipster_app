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
      // defaultValue: () => {
      //   const emailArr = User.email.split("@");
      //   return emailArr[0] + Math.random().toString(36).substring(7);
      // }
    },

    firstName: {
      type: DataTypes.STRING,
    },

    lastName: {
      type: DataTypes.STRING,
    },

    image: {
      type: DataTypes.STRING,
      defaultValue: "/assets/uploads/default.png" 
    }
  }
  ,{
    hooks: {
      beforeCreate: user => {
        const emailArr = user.email.split("@");
        user.username = emailArr[0] + Math.random().toString(36).substring(7);
      }
    }

   }
   );

  
  // methods ======================
  
    User.associate = models => {

  }

  return User;
};