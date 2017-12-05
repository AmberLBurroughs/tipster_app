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

  getUser2(id, fields, func) {
    User.find({
      attributes: fields,
      where: {
        uuid: id
      }
    }).then(data => func(data.dataValues));
  }

};