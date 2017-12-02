const UserController = require('../controllers').user;
const passport       = require('passport');
const authKey        = require('../utils/authKey');

const stripe = require("stripe")(
  authKey.stripeKey["secretKey"]
);


module.exports = (app, passport) => {

// hack for console error
app.get("favicon.ico", function(request, response) {
  response.status(204);
});


// test route for account landing page
app.get('/api/user', (req, res) => {
  if(req.isAuthenticated()){
    res.status(200)
    .send({
      message: 'Welcome to the Tipster User API!',
      id: getCurrentuserId(req)
    })
  }
  else {
    res.redirect('/');
  }
});

// example controller call
//app.post('/api/user', todosController.create);


// logout of user account
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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

    req.login(user, loginErr => {
      if (loginErr) {
        //console.log("loginerr", loginErr)
        return next(loginErr);
      }
      console.log(req.isAuthenticated());
      console.log('sucess');
      return res.redirect("/api/user");
    });      
  })(req, res, next);
}

//=======================================================================

// helpers
getCurrentuserId = (req) => {
  let userId;
    if(req.isAuthenticated()){
      userId = req.session.passport.user;
    } else {
      userId = false
    }
    return userId
}

// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on 
//     if (req.isAuthenticated())
//         return next();

//     // if they aren't redirect them to the home page
//     res.redirect('/');
// }

 // currentUser: getCurrentuserId(req),
 // isLoggedIn: req.isAuthenticated()


};