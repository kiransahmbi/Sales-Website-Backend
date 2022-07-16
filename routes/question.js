var express = require('express');
var router = express.Router();

let questionController = require('../controllers/question');

// Add Router
router.get('/add', questionController.displayAddPage);
router.post('/add', questionController.processAddPage);


module.exports = router;