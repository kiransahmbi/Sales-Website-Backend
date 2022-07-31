exports.home = function(req, res, next) {
    // res.render('index', { 
    //     title: 'Home'
    // });
    res.redirect('/advertisement/list');
};

// exports.aboutUs = function(req, res, next) {
//     res.render('aboutus', {
//         title: 'About Us'
//     });
// };

// exports.users = function(req, res, next) {
//     res.render('signup', {
//         title: 'Sign-up',
//         userName: req.user ? req.user.username : ''
//     });
// }

// exports.signin = function(req, res, next) {
//     res.render('signin', {
//         title: 'Sign-in',
//         userName: req.user ? req.user.username : ''

//     });
// }