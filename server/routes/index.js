const UserController                    = require('../controllers/user');
const { getUser2, updateUser, getUser } = UserController;

const LocationController = require('../controllers/location');
const { getWorkers }     = LocationController;

const passport       = require('passport');
const authKey        = require('../utils/authKey');

const locationRoutes = require("./api-location");
const tipRoutes      = require("./api-tips");
const userRoutes     = require("./api-user");

const { StripeCustomer, StripeConnect, User } = require('../models');

const stripe = require("stripe")(
  authKey.stripeKey["secretKey"]
);

const { getTipsterBalance, createCustomer } = require('../stripe/stripe-api');

module.exports = (app, passport, axios) => {

app.use("/api/tip", tipRoutes);
app.use("/api/location", locationRoutes);
app.use("/api/user", userRoutes);

// hack for console error
app.get("favicon.ico", (request, response) => {
  response.status(204); 
});

//==============================================
app.get('/api/search', (req, res) => {
  console.log("\n#######id,", req.session)
  console.log("\n>>>>>>hello", req.headers);
  console.log("%%%%%",req.isAuthenticated())
  console.log(getCurrentuserId(req));
  if(!req.isAuthenticated()){ 
    res.status(400).json({success: false, message: "Not logged in"})
  }
  // get user connecfg token 
  function results(userData){
    console.log("\nYYYYYYYY", userData);
    res.json(userData)
  }
  getUser(getCurrentuserId(req), results);

});

// example controller call
//app.post('/api/user', todosController.create);

// // logout of user account
// app.get('/logout', function(req, res) {
//     //req.logout();
//     req.session.destroy(function(err){
//       res.redirect('http://localhost:3000/');
//       if(err){
//         consoloe.log(err)
//       }
//     })
// });

// // process the signup form (passport) ==============================================

// // =====================================
// // LOGIN ===============================
// // =====================================
// // process the login form
// app.post('/login', function(req, res, next) {
//   passportAuthenticate('local-login', req, res, next);
// });

// // =====================================
// // SIGNUP ==============================
// // =====================================
// // process the signup form
// app.post('/signup', function(req, res, next) {
//   passportAuthenticate('local-signup', req, res, next);
// });

// passportAuthenticate = (localStrategy, req, res, next) => {
//   passport.authenticate(localStrategy, function(err, user, info) {
//     if (err) {
//       return next(err); // will generate a 500 error
//     }
//     // Generate a JSON response reflecting authentication status
//     if (! user) {
//       return res.send({ success : false, message : 'authentication failed' });
//     }
    
//     // ***********************************************************************
//     // "Note that when using a custom callback, it becomes the application's
//     // responsibility to establish a session (by calling req.login()) and send
//     // a response."
//     // Source: http://passportjs.org/docs
//     // ***********************************************************************
//     else{
//       req.login(user, loginErr => {
//         if (loginErr) {
//           //console.log("loginerr", loginErr)
//           return next(loginErr);
//         }
//         console.log(req.isAuthenticated());
//         console.log('sucess');
//         console.log(req.session.passport.user);
//         //

//         // do i need to send anthing back for a creating a cookie?

//         // res.json("hello")
//         // res.status(400).json( res.json({success: true});
//         return res.redirect("http://localhost:3000/search");
//       });  
//     }  
//   })(req, res, next);
// }

app.get("/api/admin/balance", (req, res) => {
  console.log(req.headers);
  getTipsterBalance((bal) => res.json(bal));
})

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
        res.cookie('user_id', user.username );
        res.cookie('connect_id', /*(user.fk_StripeConnect && user.fk_StripeConnect.length > 0)*/ null );
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


/*
curl https://connect.stripe.com/oauth/token \
   -d client_secret=sk_test_23uVzt61uqtKFblZHRDc9Lw7 \
   -d code="{AUTHORIZATION_CODE}" \
   -d grant_type=authorization_code
   */
//http://localhost:8000/?scope=read_write&code=ac_BuZu3ECAnvpUwFOqur2w29CUwMIo5jb4#
//8000/api/connect?scope=read_write&code=ac_BuafiShwXFN5LQe40rNCtZqnsqtYGFSL

// connect URL: https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_BuZkGIRpYOb0ib9eQwxxYgkBC5kfXQ7b&scope=read_write&state=${username}
app.get("/api/connect", (req, res) =>{
  const stripeCode = req.query.code;
  const stripeState = req.query.state;
  console.log('query', req.query)
  axios.post("https://connect.stripe.com/oauth/token",{
    client_secret:"sk_test_23uVzt61uqtKFblZHRDc9Lw7",
    code:stripeCode,
    grant_type:"authorization_code"
  })
  .then(function (response) {
    // console.log("1111111",response);

    var stripe = require("stripe")(
      "sk_test_23uVzt61uqtKFblZHRDc9Lw7"
    );

    stripe.accounts.retrieve(
      "acct_1BTfrWEHoxuvzr1B",
      function(err, account) {
        // asynchronously called
        console.log("account", account);
        // console.log("22222",response);
         StripeConnect.create({
            accessToken: response.data.access_token,
            livemode: response.data.livemode,
            refreshToken: response.data.refresh_token,
            publishableKey: response.data.stripe_publishable_key,
            connectUserId: response.data.stripe_user_id,
          })
          .then(function(connectedUser){
            console.log(connectedUser, account)
            User.update({ 
              firstName: account.legal_entity.first_name,
              lastName: account.legal_entity.last_name,
              email: account.legal_entity.phone_number,
              phone:account.email,
              fk_StripeConnect: connectedUser.dataValues.uuid},
              { where: { username:  stripeState} }).then(function(response){
                console.log(response);
                res.cookie('connect_id', true); // update cookie to note this user has a connect ID now.
                res.redirect("http://localhost:3000/rec/history")
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    );
   
  })
  .catch(function (error) {
    console.log(error);
  });
  
})
 // {
//   "access_token": "{ACCESS_TOKEN}",
//   "livemode": false,
//   "refresh_token": "{REFRESH_TOKEN}",
//   "stripe_publishable_key": "{PUBLISHABLE_KEY}",
//   "stripe_user_id": "{ACCOUNT_ID}",
// }







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