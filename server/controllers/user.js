const User = require('../models').User;

  // crud mthod
  // getUser: function(req, res) {
  // 	console.log(req);
  // }

module.exports = {

  getUser: (id, cb) => {
	  console.log("\n%%%%%%%%%",id)
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
 	},

  getUser2: (findParam, fields, func) => {
    User.find({
      attributes: fields,
      where: findParam
    }).then(data => func(data.dataValues));
  },

  updateUser: (identifier, newData, func) => {
    User.update(
      newData,{
        where: identifier
      }
    ).then(data => func(data));
  }
}