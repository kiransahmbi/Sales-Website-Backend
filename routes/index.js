var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', home);

function home (req, res, next) {
  res.render('homepage',
   { 
     title: 'Home'
     });
};
router.get('/aboutme', aboutMe);

function aboutMe (req, res, next) {
  res.render('aboutme',
   { 
     title: 'About Me'
     });
};

router.get('/services', services);

function services (req, res, next) {
  res.render('services',
   { 
     title: 'Services' 
     });
};

router.get('/projects', projects);

function projects (req, res, next) {
  res.render('projects',
   { 
     title: 'My Work'
     });
};

router.get('/contactme', ContactMe);

function ContactMe (req, res, next) {
  res.render('contactme',
   { 
     title: 'Lets Connect'
     });
};

module.exports = router;
