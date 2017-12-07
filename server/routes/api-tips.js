const UserController = require('../controllers/user');
const { getUser2, updateUser } = UserController;
const { StripeCustomer, User, Transaction} = require('../models');
const { createCustomer, charge } = require('../stripe/stripe-api.js');

const express = require("express");
const router = express.Router();

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
    attributes: ['uuid','email','fk_StripeCustomer'],
    where: {
      uuid: user
    },
    include: [{
      model: StripeCustomer
    }]
  }).then((data) => {
    console.log(data.dataValues);
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
              console.log(result);
              charge(req, tipperData, receiverData, ((result) => {
                console.log(result);
                let newTransaction = {
                  placeID: req.body.location.id,
                  receiverID: receiverData.uuid,
                  amount: result.amount,
                  note: req.body.note,
                  anonymous: req.body.anonymous,
                  status: result.outcome.type,
                  userUUID: tipperData.uuid
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
            })
          })
        }));
      }
      else {
        charge(req, tipperData, receiverData, ((result) => {
          console.log(result);
          let newTransaction = {
            placeID: req.body.location.id,
            receiverID: receiverData.uuid,
            amount: result.amount,
            note: req.body.note,
            anonymous: req.body.anonymous,
            status: result.outcome.type,
            userUUID: tipperData.uuid
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
  // let userAccts = getCurrentUserAccts(req);
  // if(userAccts.customer === null) {
  //   let realStripeCust = null;
  //   getUser2({'uuid': user}, ['email', 'fk_StripeCustomer'], (value) => {
  //     realStripeCust = value.fk_StripeCustomer;
  //     if(realStripeCust === null) {
  //       let user_email = value.email;
  //       let newCustomer = {
  //         // default_source: req.body.token,
  //         source: req.body.token.id,
  //         email: user_email,
  //       }
  //       console.log(newCustomer);
  //       createCustomer(newCustomer, ((newStripeCustomer) => {
  //         console.log(newStripeCustomer);
  //         StripeCustomer.create({
  //           key: newStripeCustomer.id,
  //           lastFour: req.body.token.card.last4
  //         }).then((newEntry) => {
  //           console.log(newEntry.dataValues);
  //           updateUser({
  //             uuid: user
  //           },{
  //             fk_StripeCustomer: newEntry.dataValues.uuid
  //           }, (result) => {
  //             console.log(result);
  //             res.json({
  //               message: "StripeCustomer Acct created!",
  //               data: result
  //             });
  //           })
  //         })
  //       }));
  //     }
  //     else {
  //       console.log(`this is the user's first time on the site. and they have a stripeCustomer account not reflected in this session`);
  //       res.json(`this is the user's first time on the site. and they have a stripeCustomer account not reflected in this session`);
  //     }
  //   })
  // }
  // else {
  //   console.log(`this customer has a stripeCustomer account in their session`);
  //   res.json(`this customer has a stripeCustomer account in their session`)
  // }
});

module.exports = router;