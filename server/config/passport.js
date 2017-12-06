// config/passport.js
// configure for password being in a seperate table then user
// confirgure to use postgres


// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var db            = require('../models');

// expose this function to our app using module.exports
module.exports    = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, [user.uuid, user.fk_StripeCustomer, user.fk_StripeConnect]);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        db.User.findById(user[0]).then(function(user) {
	        if (user) {
	            done(null, user.get());
 
	        } else {
	 
	            done(user.errors, null);
	 
	        }
	 
	    });
    });


    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.User.findOne({
            where: {
            	email: req.body.email
            }
        }).then(function(user, err){
        	if (err) return done(err);

            // check to see if theres already a user with that email
            if (user) {
            	console.log('signupMessage', 'That email is already taken.');
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                // if there is no user with that email
                // create the user
                db.User.create({
    		      email: req.body.email,
                // chain then create pw
                })
                .then(function(dbUser){
                    db.LocalKey
                    .create({ 
                        UserUuid: dbUser.uuid,
                        localPassword: db.LocalKey.generateHash(req.body.password)
    		        })
                    .then(function(localKey) {
                      // send post back to render
                      return done(null, dbUser);
                    })
                     .catch(function (err) {
                      // handle error;
                      console.log(err);
                    }); 
                })
                .catch(function (err) {
    		      // handle error;
    		      console.log(err);
    		    }); 
            }
          });   

        });
    }));

    // // =========================================================================
    // // LOCAL LOGIN =============================================================
    // // =========================================================================
    // // we are using named strategies since we have one for login and one for signup
    // // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        //console.log("\n>>>>>>>>>>>>>> localsignin: ", req);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        db.User.findOne({
            where: {
                email:  email 
            }
        }).then(function(user, err) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            // get password associated with user logging in
            if (!user && db.LocalKey.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
