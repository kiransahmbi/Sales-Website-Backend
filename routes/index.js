var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');
let usersController = require('../controllers/users');

// Get Homepage
router.get('/', indexController.home);

// Get About Us
router.get('/aboutus', indexController.aboutUs);

/* GET signup page. */
router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.signup);

/* GET signin page. */
router.get('/signin', usersController.renderSignin);
router.post('/signin', usersController.signin);


module.exports = router;
