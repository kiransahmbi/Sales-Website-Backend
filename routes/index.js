var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

// Get Homepage
router.get('/', indexController.home);

// // Get About Us
// router.get('/aboutus', indexController.aboutUs);

module.exports = router;