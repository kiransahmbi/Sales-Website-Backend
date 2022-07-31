var express = require('express');
var router = express.Router();

let advertisementController = require('../controllers/advertisement');
let authController = require('../controllers/auth');

// Get Advertisement List
router.get('/list', advertisementController.advertisementList);

// Add Router
router.post('/add', authController.requireAuth, advertisementController.processAdd);

// Edit Router
router.put('/edit/:id', authController.requireAuth, authController.isAllowed, advertisementController.processEdit);

// Delete Router
router.delete('/delete/:id', authController.requireAuth, authController.isAllowed, advertisementController.performDelete);

module.exports = router;