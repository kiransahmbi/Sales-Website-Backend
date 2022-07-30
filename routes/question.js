var express = require('express');
var router = express.Router();

let questionController = require('../controllers/questionAnswer');

// Get Router
router.get('/', questionController.getQuestions);

// Add Router
router.post('/add', questionController.processAddPage);

// Edit Router
router.post('/edit/:id', questionController.processEditPage);

// Delete Router
router.get('/delete/:id', questionController.performDelete);


module.exports = router;