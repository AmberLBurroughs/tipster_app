const { Location, User } = require('../models');

module.exports = {
  // crud mthods
  getWorkers:(id, cb) => {
  	// Location.find({
  	// 	where: id,
  	// 	include:[
  	// 		{
  	// 			model: User, 
  	// 			as:'Workers'
  	// 		}
  	// 	]
  	// })
    Location.getUsers({
      where: {
        locationUUID: id
      }
    })
  	.then(users =>{
  		console.log(users.dataValues);
  		//return cb(users.dataValues);
  	})
  	.catch(err => console.log(err));
  }


  		// location.getUsers({
  		// 	where: {
  		// 		locationUUID: id
  		// 	}
  		// })
};