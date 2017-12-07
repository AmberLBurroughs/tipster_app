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

  createCustomer: (customer, func) => {
    stripe.customers.create(customer)
    .then(response => {
      func(response);
    })
  },

  charge: (req, sender, recip, func) => {
    let chargeObject = {
      amount: req.body.amount * 100, //need to convert to cents
      currency: "usd",
      description: `Tip to ${req.body.recipient}for $${req.body.amount} at ${req.body.location.name}\nNote: ${req.body.note}`,
      metadata: {
        for: recip.username
      },
      receipt_email: sender.email,
      customer: sender['StripeCustomer'].dataValues.key
    }
    console.log(chargeObject);
    stripe.charges.create(chargeObject,
      function(err, charge) {
      // asynchronously called
      if (err) {
        throw err;
        console.log(`error`);
      }
      func(charge); 
    });
  }
  
}