var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var passport = require('passport');
var flash    = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var swig = require('swig');
var passportConfig = require('./config/passport');

app.use(express.static(__dirname + '/public'));

// Swig rendering
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + "/views");

// Cookies and Session
app.use(cookieParser()); // read cookies (needed for auth)
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: true,
    saveUninitialized: true
})); 

// Forms parsing
app.use(bodyParser.urlencoded({ // get information from html forms
  extended: true
}));

// required for passport
passportConfig(passport); // pass passport for configuration of strategies
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);