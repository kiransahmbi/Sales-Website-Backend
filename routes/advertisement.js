var express = require('express');
var router = express.Router();

let advertisementController = require('../controllers/advertisement');
let authController = require('../controllers/auth');

// Get Advertisement List
router.get('/list', advertisementController.advertisementList);

// Add Router
/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', authController.requireAuth, advertisementController.processAddPage);
//Detail Router
router.get('/details/:id', advertisementController.displayDetails);

// Edit Router
router.put('/edit/:id', authController.requireAuth, authController.isAllowed, advertisementController.processEditPage);

// Delete Router
router.delete('/delete/:id', authController.requireAuth, authController.isAllowed, advertisementController.performDelete);


module.exports = router;