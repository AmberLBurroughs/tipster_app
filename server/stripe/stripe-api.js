const authKey = require('../utils/authKey');

const stripe = require("stripe")(
  authKey.stripeKey["secretKey"]
);

module.exports = {
  getTipsterBalance: (func) => {
    stripe.balance.retrieve((err, balance) => {
      if (err) {
        throw err;
      }
      else {
        console.log(balance);
        func(balance);
      }
    })
  },

  createCustomer: (customer) => {
    stripe.customers.create(customer)
    .then(response => {
      console.log(response);
    })
  }
  
}