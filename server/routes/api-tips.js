const UserController = require('../controllers/user');
const { getUser2, updateUser } = UserController;
const { StripeCustomer, User, Transaction } = require('../models');
const { createCustomer, charge } = require('../stripe/stripe-api.js');

const express = require("express");
const router = express.Router();

var twilio = require('twilio');

var accountSid = 'AC6ad1592690b7c6dab18e0c7d57068a35'; // Your Account SID from www.twilio.com/console
var authToken = '2baf4dffb34ea1b205284ae3dcd0fe95';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

router.post("/", (req, res) => {
  console.log(req.body, req.headers);
  console.log(req.isAuthenticated());
  let user = getCurrentuserId(req);
  console.log(user);
  let tipperData;
  let receiverData;
  // getUser2({uuid: user}, ['uuid','email','fk_StripeCustomer'], ((data) => {
  //   console.log(data);
  //   tipperData =  data;
  User.find({
    attributes: ['uuid','email','fk_StripeCustomer', 'phone'],
    where: {
      uuid: user
    },
    include: [{
      model: StripeCustomer
    }]
  }).then((data) => {
    console.log(`tried to find user: ${data.dataValues}`);
    tipperData = data.dataValues;
    getUser2({username: req.body.recipient}, ['uuid', 'username' ], ((data) => {
      console.log(data);
      receiverData = data;
      if (tipperData.fk_StripeCustomer === null) {
        let user_email = tipperData.email;
        let newCustomer = {
          // default_source: req.body.token,
          source: req.body.token.id,
          email: user_email,
        }
        console.log(newCustomer);
        createCustomer(newCustomer, ((newStripeCustomer) => {
          console.log(newStripeCustomer);
          StripeCustomer.create({
            key: newStripeCustomer.id,
            lastFour: req.body.token.card.last4
          }).then((newEntry) => {
            console.log(newEntry.dataValues);
            updateUser({
              uuid: user
            },{
              fk_StripeCustomer: newEntry.dataValues.uuid
            }, (result) => {
              // console.log(result);
              // tipperData = result[1][0].dataValues;
              // console.log(`tipperdata when user has just been created:`);
              // console.log(tipperData);
              User.find({
                attributes: ['uuid','email','fk_StripeCustomer'],
                where: {
                  uuid: user
                },
                include: [{
                  model: StripeCustomer
                }]
              }).then(data => {
                tipperData = data.dataValues;
                charge(req, tipperData, receiverData, ((result) => {
                  console.log(result);
                  let newTransaction = {
                    fk_place_id: req.body.location.id,
                    amount: result.amount,
                    note: req.body.note,
                    anonymous: req.body.anonymous,
                    status: result.outcome.type,
                    fk_tipperuuid: tipperData.uuid,
                    fk_receiveruuid: receiverData.uuid
                  }
                  console.log(newTransaction);
                  Transaction.create(newTransaction)
                  .then(insertionOutcome => {
                    console.log(insertionOutcome.dataValues);
                    res.json({
                      message: "StripeCustomer Acct created and tip sent!",
                      result: result,
                      transactionWrite: insertionOutcome
                    }); 
                  })
                }));
              })
            })
          })
        }));
      }
      else {
        console.log(`tipperdata when user already exists:`);
        console.log(tipperData);
        charge(req, tipperData, receiverData, ((result) => {
          console.log(result);
          let newTransaction = {
            fk_place_id: req.body.location.id,
            amount: result.amount,
            note: req.body.note,
            anonymous: req.body.anonymous,
            status: result.outcome.type,
            fk_tipperuuid: tipperData.uuid,
            fk_receiveruuid: receiverData.uuid
          }
          console.log(newTransaction);
          Transaction.create(newTransaction)
          .then(insertionOutcome => {
            console.log(insertionOutcome);
            res.json({
              message: "StripeCustomer Acct created and tip sent!",
              result: result,
              transactionWrite: insertionOutcome
            }); 
          })
        }));
      }
    }));
  });
});

module.exports = router;