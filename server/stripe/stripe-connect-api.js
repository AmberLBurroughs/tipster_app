//http://localhost:8000/?scope=read_write&code=ac_BuZu3ECAnvpUwFOqur2w29CUwMIo5jb4#



const authKey = require('../utils/authKey');

const stripe = require("stripe")(
  authKey.stripeKey["secretKey"]
);

module.exports = {

	
}