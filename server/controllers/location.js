const Location = require('../models').Location;

module.exports = {
  // crud mthods
  getWorkers:(id, cb) => {
  	Location.find({
  		where:{
        uuid: id
      },
  		include:[
  			{
  				model: User, 
  				as:'workPlace'
  			}
  		]
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