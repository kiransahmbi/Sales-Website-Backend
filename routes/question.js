var express = require('express');
var router = express.Router();

let questionController = require('../controllers/questionAnswer');

// Get Router
router.get('/', questionController.getQuestions);

// Add Router
router.post('/add', questionController.processAdd);

// Edit Router
router.put('/edit/:id/:advertisement', questionController.processEdit);

// Delete Router
router.delete('/delete/:id', questionController.performDelete);


module.exports = router;