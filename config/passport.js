// const passport = require('passport');

// module.exports = function() {
//     const User = require('../models/user');

//     //When a user is authenticated, passport will 
//     //save its -id propertyt to the session.

//     passport.serializeUser((user, done) => {
//         done(null, user.id);
//     });

//     //later on, when the user object is needed, 
//     //passport will use the -id property to grab
//     //the user object from th database.
//     passport.deserializeUser((id, done) => {
//         User.findOne({
//             _id: id
//         }, '-password -salt', (err, user) => {
//             done(err, user);
//         });
//     });

//     require('./local')();
// };