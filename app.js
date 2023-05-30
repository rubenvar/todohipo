const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const robots = require('express-robots-txt');

const routes = require('./routes');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');
const sessionHandler = require('./handlers/sessionHandler');
require('./handlers/passport'); // specify the strategy for passport

// create Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // this is the folder for pug files
app.set('view engine', 'pug'); // pug engine

app.set('trust proxy', true);

// serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static')));

// takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populates req.cookies with cookies that came along with the request
app.use(cookieParser());

// sessions to store data on visitors from request to request:
// keeps users logged in + allows to send flash messages
app.use(sessionHandler);

// passport JS to handle logins
app.use(passport.initialize());
app.use(passport.session());

// flash middleware to use req.flash('error', 'Oh!'), it will pass the message to the next page
app.use(flash());

// pass variables to templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers; // some misc helper functions
  res.locals.flashes = req.flash(); // the flash messages
  res.locals.user = req.user || null; // the user data if they are authenticated
  res.locals.ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for']?.split(',')[0];
  res.locals.currentPath = req.path; // the path
  res.locals.env = process.env.NODE_ENV; // pass only the environment, not the whole process.env object
  next();
});

// add a robots.txt file
app.use(robots(`${__dirname}/static/robots.txt`));

// after allllll that above middleware, finally handle routes
app.use('/', routes);

// if routes didn't work, 404 them and forward to next error handler
app.use(errorHandlers.notFound);

// dandle the db validation errors
app.use(errorHandlers.flashValidationErrors);

// dev error handler (with stack trace highlighting):
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

// Done! 🚀
module.exports = app;
