// Set up ======================================================

const express      = require('express');
const bodyParser   = require('body-parser');
const logger       = require('morgan');
const axios        = require('axios');
const pg 				   = require('pg'); // postgresql
const fileUpload   = require('express-fileupload');

const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session'); // cookie session

// Configuration ==============================================

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));


// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());


// Enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  //access-control-allow-origin http://localhost:3000
  //res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  next();
});


// views
app.use(express.static('./client/build'));
// app.use(function(err, req, res, next) {
//     console.log(err);
// });

require('./server/config/passport')(passport); // pass passport for configuration

//app.use(session({ secret: 'thueeugurg5hi5ri7ri5tfg576rihufgk76g65ehi4wu3qa23' })); // session secret
app.use(cookieParser());

app.use(session({
    key: 'user_sid',
    resave: true,
    secret: '}wmpB2uLMMYu>Kt4#9.CDttvp=4KYq9rVfWP',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000,
        httpOnly: false
    }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());


const routes = require('./server/routes')(app, passport);;

/*
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));
*/
module.exports = app;