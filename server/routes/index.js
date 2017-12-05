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


//==============================================
app.get('/api/search', (req, res) => {
  console.log("\n#######id,", req.session)
  console.log("\n>>>>>>hello", req.headers);
  console.log("%%%%%",req.isAuthenticated())



// get current user sesion id 
// query u

  if(!req.isAuthenticated()){ res.status(400).json({success: false, message: "Not logged in"})}
  res.json({
    message: 'Welcome to the Tipster User search!',
    id: getCurrentuserId(req)
  });
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