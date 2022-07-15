var express = require('express');
var router = express.Router();

let inventoryController = require('../controller/inventory');


function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;
        return res.redirect('/users/signin');
    }
    next();
}

/* GET home page. */
router.get('/list',requireAuth, inventoryController.inventoryList);


// Routers for edit
router.get('/edit/:id',requireAuth, inventoryController.displayEditPage);
router.post('/edit/:id',requireAuth, inventoryController.processEditPage);

// Router for delete
router.get('/delete/:id',requireAuth, inventoryController.performDelete);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add',requireAuth, inventoryController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add',requireAuth, inventoryController.processAddPage);




module.exports = router;