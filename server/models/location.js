'use strict';

const uuidv1     = require('uuid/v1');

module.exports   = (sequelize, DataTypes) => {
	const Location = sequelize.define('Location', {  
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
      isUnique :true
    }

	});

// methods ======================
	Location.associate = function(models) {
	  // HAS MANY
	  Location.hasMany(models.User,{
	  	as:'Workers', through: 'userLocation', foreignKey: 'locationUUID'
	  });
	} 

  return Location;
};


/*location can have many users


users can have many locations */



