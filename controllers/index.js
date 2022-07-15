exports.home = function(req, res, next) {
    res.render('homepage', { 
        title: 'Home'
    });
};

exports.aboutUs = function(req, res, next) {
    res.render('aboutus', { 
        title: 'About Us'
     });
}