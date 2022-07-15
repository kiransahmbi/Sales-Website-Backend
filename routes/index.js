var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', home);

function home (req, res, next) {
  res.render('homepage',
   { 
     title: 'BuySell Used Products!'
     });
};
router.get('/aboutus', aboutUs);

function aboutUs (req, res, next) {
  res.render('aboutus',
   { 
     title: 'About Us'
     });
};

module.exports = router;
