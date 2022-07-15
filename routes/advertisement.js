var express = require('express');
var router = express.Router();

// Get Advertisement List
router.get('/list', advertisementController.advertisementList);

// Add Router
router.get('/add', advertisementController.displayAddPage);
router.post('/add', advertisementController.processAddPage);

// Edit Router
router.get('/edit/:id', advertisementController.displayEditPage);
router.post('/edit/:id', advertisementController.processEditPage);

// Delete Router
router.get('/delete/:id', advertisementController.performDelete);

module.exports = router;