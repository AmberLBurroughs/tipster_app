const User = require('../models').User;

  // crud mthod
  // getUser: function(req, res) {
  // 	console.log(req);
  // }
var getUser = function(id, cb) {
	//console.log("\n%%%%%%%%%",id)
 		User.find({
 			attributes: ['username', 'firstName', 'lastName', 'image'],
 			where: {
 				uuid: id
 			}
 		})
 		.then(user => {
 			//console.log("\n******", user.dataValues)
 			 return cb(user.dataValues);
 		})
 		.catch(err => console.log(err));
 		
 	}




module.exports = getUser;