// Importing modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
<<<<<<< Updated upstream
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var errorHandler = require('./error-handler');
var cors = require('cors');
=======
let session = require('express-session');
let flash = require('connect-flash');
>>>>>>> Stashed changes

var indexRouter = require('../routes/index');
var advertisementRouter = require('../routes/advertisement');
var questionRouter = require('../routes/question');
var usersRouter = require('../routes/users');

const { allowedNodeEnvironmentFlags } = require('process');

// Instantiate Express
var app = express();

<<<<<<< Updated upstream
// Enable CORS
app.use(cors());
app.options('*', cors());
=======
app.use(session({
  saveUninitialized: true,
  resave:true,
  secret:"sessionSecret"
}));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
>>>>>>> Stashed changes

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set up Passport
<<<<<<< Updated upstream
app.use(passport.initialize());
=======
app.use(flash());
>>>>>>> Stashed changes

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/advertisement', advertisementRouter);
app.use('/question', questionRouter);

// Any error handler middleware must be added after you define your routes
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(errorHandler);

module.exports = app;
