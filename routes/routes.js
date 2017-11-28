const db       = require("../models");
const express  = require("express");
const passport = require('passport');


const router   = express.Router();

// hack for console error
router.get("favicon.ico", function(request, response) {
  response.status(204);
});

// logout of user account
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

// process the signup form ==============================================
//=======================================================================

router.post('/signup', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      //console.log("passport err", err)
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
        //console.log("loginerr", loginerr)
        return next(loginErr);
      }

      // console.log('redirecting....');

      // return res.redirect(req.headers.referer);
      // return res.redirect("/account");
      
    });      
  })(req, res, next);
});

router.post('/login', (req, res, next) => {
 
  passport.authenticate('local-login', (err, user, info) => {
    if (err) {
      //console.log("passport err", err)
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
      //var userId = user.dataValues.id;
      console.log('redirecting....')

      // if (!req.session.userid) {
      //   var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
      //   delete req.session.redirectTo;
      //   // is authenticated ?
      //   res.redirect(redirectTo);
      // } else {
      //     next();
      // }
      // console.log("=====================signup: ",req.headers.referer);
    //return res.redirect(req.headers.referer);
      // return res.redirect("/account");
      
    });      
  })(req, res, next);
});


getCurrentuserId = (req) => {
  const userId;
    if(req.isAuthenticated()){
      userId = req.session.passport.user;
    } else {
      userId = false
    }
    return userId
}

module.exports = router;