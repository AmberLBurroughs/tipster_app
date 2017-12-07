const Location = require('../models').Location;

module.exports = {
  // crud mthods
  getUsers:(id) => {
  	Location.find({
  		where: id
  		include:[
  			{
  				model: User, 
  				as:'workPlace'
  			}
  		]
  	}),
  		// location.getUsers({
  		// 	where: {
  		// 		locationUUID: id
  		// 	}
  		// })
  }
};