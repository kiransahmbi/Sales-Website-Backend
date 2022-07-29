var express = require('express');
var router = express.Router();

let questionController = require('../controllers/questionAnswer');

// Get Router
router.get('/:advertisement', questionController.getQuestions);

// Add Router
router.post('/add/:id/:advertisement', questionController.processAddPage);

// Edit Router
router.post('/edit/:id/:advertisement', questionController.processEditPage);

// Delete Router
router.get('/delete/:id/:advertisement', questionController.performDelete);


module.exports = router;