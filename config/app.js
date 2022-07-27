// Importing modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require('passport');
var errorHandler = require('./error-handler');
var cors = require('cors');

var indexRouter = require('../routes/index');
var advertisementRouter = require('../routes/advertisement');
var questionRouter = require('../routes/question');
var usersRouter = require('../routes/users');

const { allowedNodeEnvironmentFlags } = require('process');

// Instantiate Express
var app = express();

// Enable CORS
app.use(cors());
app.options('*', cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Set up Passport
app.use(passport.initialize());

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
