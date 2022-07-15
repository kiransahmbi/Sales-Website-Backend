var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', home);

function home (req, res, next) {
  res.render('Portfolio',
   { 
     title: 'Home',
     userName: req.user ? req.user.username : ''
     });
};
router.get('/abtMe', aboutMe);

function aboutMe (req, res, next) {
  res.render('AboutMe',
   { 
     title: 'About Me' ,
     userName: req.user ? req.user.username : ''
     });
};

router.get('/ser', services);

function services (req, res, next) {
  res.render('Services',
   { 
     title: 'Services' ,
     userName: req.user ? req.user.username : ''
     });
};

router.get('/projects', projects);

function projects (req, res, next) {
  res.render('Projects',
   { 
     title: 'My Work', // add variables to be inserted//
     userName: req.user ? req.user.username : ''
     });
};

router.get('/ContactMe', ContactMe);

function ContactMe (req, res, next) {
  res.render('ContactMe',
   { 
     title: 'Lets Connect', // add variables to be inserted//
     userName: req.user ? req.user.username : ''
     });
};



module.exports = router;
