const UserController                    = require('../controllers/user');
const { getUser2, updateUser, getUser } = UserController;

const LocationController = require('../controllers/location');
const { getWorkers }     = UserController;

const passport       = require('passport');
const authKey        = require('../utils/authKey');

const locationRoutes = require("./api-location");
const tipRoutes      = require("./api-tips");

const { StripeCustomer } = require('../models');
const stripe             = require("stripe")(
  authKey.stripeKey["secretKey"]
);

const { getTipsterBalance, createCustomer } = require('../stripe/stripe-api');

module.exports = (app, passport) => {

// hack for console error
app.get("favicon.ico", (request, response) => {
  response.status(204); 
});

app.use("/api/location", locationRoutes);


//==============================================
app.get('/api/search', (req, res) => {
  console.log("\n#######id,", req.session)
  console.log("\n>>>>>>hello", req.headers);
  console.log("%%%%%",req.isAuthenticated())
  console.log(getCurrentuserId(req));
  if(!req.isAuthenticated()){ res.status(400).json({success: false, message: "Not logged in"})}
  // get user connecfg token 
  function results(userData){
    console.log("\nYYYYYYYY", userData);
    res.json(userData)
  }
  getUser(getCurrentuserId(req), results);

});

// example controller call
//app.post('/api/user', todosController.create);

// logout of user account
app.get('/logout', function(req, res) {
    //req.logout();
    req.session.destroy(function(err){
      res.redirect('http://localhost:3000/');
      if(err){
        consoloe.log(err)
      }
    })
});

// process the signup form (passport) ==============================================

// =====================================
// LOGIN ===============================
// =====================================
// process the login form
app.post('/login', function(req, res, next) {
  passportAuthenticate('local-login', req, res, next);
});

// =====================================
// SIGNUP ==============================
// =====================================
// process the signup form
app.post('/signup', function(req, res, next) {
  passportAuthenticate('local-signup', req, res, next);
});

passportAuthenticate = (localStrategy, req, res, next) => {
  passport.authenticate(localStrategy, function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    else{
      req.login(user, loginErr => {
        if (loginErr) {
          //console.log("loginerr", loginErr)
          return next(loginErr);
        }
        console.log(req.isAuthenticated());
        console.log('sucess');
        console.log(req.session.passport.user);
        //

        // do i need to send anthing back for a creating a cookie?

        // res.json("hello")
        // res.status(400).json( res.json({success: true});
        return res.redirect("http://localhost:3000/search");
      });  
    }  
  })(req, res, next);
}

// app.post("/api/tip", (req, res) => {
//   console.log(req.body, req.headers);
//   console.log(req.isAuthenticated());
//   let user = getCurrentuserId(req);
//   console.log(user);
//   let userAccts = getCurrentUserAccts(req);
//   if(userAccts.customer === null) {
//     let realStripeCust = null;
//     getUser2(user, ['email', 'fk_StripeCustomer'], (value) => {
//       realStripeCust = value.fk_StripeCustomer;
//       if(realStripeCust === null) {
//         let user_email = value.email;
//         let newCustomer = {
//           // default_source: req.body.token,
//           source: req.body.token.id,
//           email: user_email,
//         }
//         console.log(newCustomer);
//         createCustomer(newCustomer, ((newStripeCustomer) => {
//           console.log(newStripeCustomer);
//           StripeCustomer.create({
//             key: newStripeCustomer.id,
//             lastFour: req.body.token.card.last4
//           }).then((newEntry) => {
//             console.log(newEntry.dataValues);
//             updateUser({
//               uuid: user
//             },{
//               fk_StripeCustomer: newEntry.dataValues.uuid
//             }, (result) => {
//               console.log(result);
//               // req.login(req.user, function(err) {
//               //   if (err) {
//               //     throw err;
//               //     console.log(err);
//               //     return next(err);
//               //   }
//               //   else {
//               //     res.json("tip received");
//               //   }
//               // });
//               res.json({
//                 message: "StripeCustomer Acct created!",
//                 data: result
//               });
//             })
//           })
//         }));
//       }
//       else {
//         console.log(`this is the user's first time on the site. and they have a stripeCustomer account not reflected in this session`);
//         res.json(`this is the user's first time on the site. and they have a stripeCustomer account not reflected in this session`);
//       }
//     })
//   }
//   else {
//     console.log(`this customer has a stripeCustomer account in their session`);
//     res.json(`this customer has a stripeCustomer account in their session`)
//   }
// });

app.use("/api/tip", tipRoutes);

app.get("/api/admin/balance", (req, res) => {
  console.log(req.headers);
  getTipsterBalance((bal) => res.json(bal));
})

app.get("/api/location/:id/users", (req, res) =>{

  results = (usersData) => {
    res.json(userData)
  }

  getWorkers(req.perams.id, results);

  if(!req.isAuthenticated()){ 
    res.status(400).json({success: false, message: "Not logged in"})
  }
});

// logout of user account
app.get('/logout', (req, res) => {
    //req.logout();
    req.session.destroy(function(err){
      res.redirect('http://localhost:3000/');
      if(err){
        consoloe.log(err)
      }
    })
});

// process the signup form (passport) ==============================================

// =====================================
// LOGIN ===============================
// =====================================
// process the login form
app.post('/login', (req, res, next) => {
  passportAuthenticate('local-login', req, res, next);
});

// =====================================
// SIGNUP ==============================
// =====================================
// process the signup form
app.post('/signup', (req, res, next) => {
  passportAuthenticate('local-signup', req, res, next);
});

passportAuthenticate = (localStrategy, req, res, next) => {
  passport.authenticate(localStrategy, function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }
    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.send({ success : false, message : 'authentication failed' });
    }
    
    // ***********************************************************************
    // "Note that when using a custom callback, it becomes the application's
    // responsibility to establish a session (by calling req.login()) and send
    // a response."
    // Source: http://passportjs.org/docs
    // ***********************************************************************
    else{
      req.login(user, loginErr => {
        if (loginErr) {
          //console.log("loginerr", loginErr)
          return next(loginErr);
        }
        console.log(req.isAuthenticated());
        console.log('sucess');
        console.log(req.session.passport.user);
        //

        // do i need to send anthing back for a creating a cookie?

        // res.json("hello")
        // res.status(400).json( res.json({success: true});
        return res.redirect("http://localhost:3000/search");
      });  
    }  
  })(req, res, next);
}

//=======================================================================

// helpers
getCurrentuserId = (req) => {
  let userId;
  if(req.isAuthenticated()){
    userId = req.session.passport.user[0];
    console.log(`user: ${userId}`);
  } else {
    userId = false
  }
  return userId
}

getCurrentUserAccts = (req) => {
  let userAccts = {};
  if(req.isAuthenticated()){
    userAccts.customer = req.session.passport.user[1];
    userAccts.connect = req.session.passport.user[2];
  } else {
    userAccts = null;
  }
  return userAccts
}

// checkCookie = (req, res) => {

//  if(!req.isAuthenticated()){ res.status(400).json({success: false, message: "Not logged in"})}

// }


// isLoggedIn = (req, res, next) => {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('http://localhost:3000/');
// }
};