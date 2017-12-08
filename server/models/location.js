'use strict';

module.exports = (sequelize, DataTypes) => {
  var Location = sequelize.define('Location', {
    placeID: {
      type: DataTypes.STRING,
      required: true,
      allowNull:false,
      isUnique :true,
      primaryKey: true,
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
      as:'Worker', through: 'UserLocations', foreignKey: 'placeID'
    });
  }

  return Location;
};