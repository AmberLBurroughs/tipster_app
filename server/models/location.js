'use strict';
const uuidv1   = require('uuid/v1');

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {

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

    locationName: {
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
      isUnique :true
    },
    
    locationAddress: {
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
    }

  });

  // methods ======================
  Location.associate = models => { 
    Location.belongsToMany(models.User,{
      as:'Workers', through: 'user_locations', foreignKey: 'userUUID'
    });
  }

  return Location;
};