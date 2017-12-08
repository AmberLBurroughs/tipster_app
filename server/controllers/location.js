const { Location, User } = require('../models');

module.exports = {
  // crud mthods
  getWorkers:(id, cb) => {
  	Location.findAll({
      where: {placeID: id},
      include: [{
        model: User,
        as: 'Worker',
        through: {
          attributes: ['placeID'],
        }
      }]
    })
    // Location.getUsers({
    //   where: {
    //     placeID: id
    //   }
    // })
  	.then(users => {
  		console.log(users.dataValues);
  		return cb(users.dataValues);
  	})
  	.catch(err => console.log(err));
  }


  		// location.getUsers({
  		// 	where: {
  		// 		locationUUID: id
  		// 	}
  		// })
};