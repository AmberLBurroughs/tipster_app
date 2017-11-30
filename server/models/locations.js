'use strict';

module.exports   = (sequelize, DataTypes) => {
  const Locations = sequelize.define('Locations', {
    placeID: {
      type: DataTypes.string,
      required: true,
      allowNull:false,
      isUnique :true
    },

    locationName: {
      type: DataTypes.string,
      required: true,
      allowNull:false,
      isUnique :true
    },
    
    locationAddress: {
      type: DataTypes.string,
      required: true,
      allowNull:false,
      isUnique :true
    }
  }