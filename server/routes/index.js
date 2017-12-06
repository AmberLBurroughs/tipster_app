const UserController = require('../controllers/user');
const { getUser2, updateUser, getUser } = UserController;

const { StripeCustomer } = require('../models');

const passport       = require('passport');
const authKey        = require('../utils/authKey');

const stripe = require("stripe")(
  authKey.stripeKey["secretKey"]
);

const { getTipsterBalance, createCustomer } = require('../stripe/stripe-api');

module.exports = (app, passport) => {

// hack for console error
app.get("favicon.ico", function(request, response) {
  response.status(204); 
});


//==============================================
app.get('/api/search', function(req, res) {
  console.log("\n#######id,", req.session)
  console.log("\n>>>>>>hello", req.headers);
  console.log("%%%%%",req.isAuthenticated())
  console.log(getCurrentuserId(req));
// get current user sesion id 
// query user table
// get user username , user first name, user last name, user image

// get user connecfg token 
function results(userData){
  console.log("\nYYYYYYYY", userData);
  res.json(userData)
}
getUser(getCurrentuserId(req), results);

if(!req.isAuthenticated()){ res.status(400).json({success: false, message: "Not logged in"})}

    //send response from controller
  // res.json({
  //   message: 'Welcome to the Tipster User search!',
  //   id: getCurrentuserId(req)
  // });
});


// api/user




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

app.post("/api/tip", (req, res) => {
  console.log(req.body, req.headers);
  console.log(req.isAuthenticated());
  let user = getCurrentuserId(req);
  console.log(user);
  let userAccts = getCurrentUserAccts(req);
  if(userAccts.customer === null) {
    let user_email = null;
    getUser2(user, ['email'], data => {
      user_email = data.email;
      let newCustomer = {
        // default_source: req.body.token,
        source: req.body.token.id,
        email: user_email,
      }
      console.log(newCustomer);
    // stripe.customer.create({
    //   default_source: req.body.token,
    //   source: req.body.token,
    //   email: user_email,
    // }).then(response => {
    //   console.log(response);
    // })
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
            req.login(req.user, function(err) {
              if (err) {
                throw err;
                console.log(err);
                return next(err);
              }
              else {
                res.json("tip received");
              }
            });
          })
        })

      }));
      // req.login(user, function(err) {
      //   if (err) {
      //     console.log(err);
      //     return next(err);
      //   }
      //   else {
      //     res.json("tip received");
      //   }
      // })
      // res.json("tip received");
    })
  }
  else {
    res.json("user already has a customer account");
  }
});

app.get("/api/admin/balance", (req, res) => {
  console.log(req.headers);
  getTipsterBalance((bal) => res.json(bal));

})

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

// isLoggedIn = (req, res, next) => {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('http://localhost:3000/');
// }

 // currentUser: getCurrentuserId(req),
 // isLoggedIn: req.isAuthenticated()

};