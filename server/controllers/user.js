const User = require('../models').User;


module.exports = {
  // crud mthods
 	getUser(id) {
 		User.find({
 			attributes: ['username', 'firstName', 'lastName', 'Image'],
 			where: {
 				uuid: id
 			}
 		})
 	},

};