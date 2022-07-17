var express = require('express');
var router = express.Router();

let questionController = require('../controllers/questionAnswer');

// Add Router
router.get('/add/:advertisement', questionController.displayAddPage);
router.post('/add/:id/:advertisement', questionController.processAddPage);

// Edit Router
router.get('/edit/:id/:advertisement', questionController.displayEditPage);
router.post('/edit/:id/:advertisement', questionController.processEditPage);

// Delete Router
router.get('/delete/:id/:advertisement', questionController.performDelete);


module.exports = router;