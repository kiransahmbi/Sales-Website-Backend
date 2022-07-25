exports.home = function(req, res, next) {
    res.render('index', { 
        title: 'Home'
    });
};

exports.aboutUs = function(req, res, next) {
    res.render('aboutus', { 
        title: 'About Us'
     });
};

exports.users = function(req, res, next) {
    res.render('signup', { 
      title: 'Sign-up',
      
    });
}

exports.signin = function(req, res, next) {
    res.render('signin', { 
      title: 'Sign-in',
      
    });
}
