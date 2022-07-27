let express = require('express');
let router = express.Router();

let usersController = require('../controllers/users');
let authController = require('../controllers/auth');

// Routes for sign-up
router.post('/signup', usersController.signup);

// Routes for sign-in
router.post('/signin', usersController.signin);

// Route for user profile
router.get('/me', authController.requireAuth, usersController.myprofile);

module.exports = router;
