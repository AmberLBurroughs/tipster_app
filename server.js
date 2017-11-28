// Set up ======================================================

const express      = require('express');
const bodyParser   = require('body-parser');
const logging      = require('morgan');
const axios        = require('axios');
const pg 				   = require('pg'); // postgresql
const fileUpload   = require('express-fileupload');

const passport     = require('passport');
const flash        = require('connect-flash');
const cookieParser = require('cookie-parser');
const session      = require('express-session'); // cookie session


const PORT = process.env.PORT || 3010;


// Configuration ==============================================

const app = express();

const db = require('./models');
require('./config/passport')(passport); // pass passport for configuration

app.use(logging('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

// Enable CORS so that browsers don't block requests.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  next();
});

app.use(express.static('./client/build'));
app.use(function(err, req, res, next) {
    console.log(err);
});


//app.use(session({ secret: 'thueeugurg5hi5ri7ri5tfg576rihufgk76g65ehi4wu3qa23' })); // session secret
app.use(session({
    key: 'user_sid',
    secret: 'kjakjasdksdkldksdfklsdkdjkldsif',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

const routes = require("./routes/routes");

// launch ======================================================
db.sequelize.sync({}).then(function() {
	app.listen(PORT, function() {
	  console.log("App listening on PORT " + PORT);
	});
});
