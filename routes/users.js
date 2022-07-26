let express = require('express');
let router = express.Router();
let usersController = require('../controllers/users');
let passport = require('passport');

// Routes for sign-up
//router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.signup);

// Routes for sign-in
//router.get('/signin', usersController.renderSignin);
router.post('/signin', usersController.signin);

// Route for sign-out
router.get('/signout', usersController.signout);
router.get('/me', authController.requireAuth, usersController.myprofile);

module.exports = router;
