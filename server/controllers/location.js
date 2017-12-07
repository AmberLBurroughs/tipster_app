const Location = require('../models').Location;

module.exports = {
  // crud mthods

  getUsers:() =>{
  		location.getUsers({
  			where: {
  				locationUUID: id
  			}
  		})
  }
};