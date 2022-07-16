// Create a reference to the model
let AdvertisementModel = require('../models/advertisement');

function getErrorMessage(err) {
    if (err.errors) {
        for (let errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].message;
        }
    }
    if (err.message) {
        return err.message;
    } else {
        return 'Unknown server error';
    }
};

module.exports.advertisementList = function(req, res, next) {
    try {
        AdvertisementModel.find((err, advertisementList) => {
            console.log(advertisementList);
            if (err) {
                console.error(err);
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.render('advertisement/advertisements', {
                    title: 'Advertisements',
                    AdvertisementList: advertisementList
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}
// Details page
module.exports.displayDetails = (req, res, next) => {
    let id = req.params.id;

    AdvertisementModel.findById(id, (err, details) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('./advertisement/details', {
                title: 'Details',
                advertisement: details
            })
        }
    });
}

// Edit Controllers
module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;

    AdvertisementModel.findById(id, (err, itemToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            res.render('./advertisement/add_edit', {
                title: 'Edit Item',
                item: itemToEdit
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    try {
        let id = req.params.id

        let updatedItem = AdvertisementModel({
            _id: req.body.id,
            ProductName: req.body.productName,
            Brand: req.body.brand,
            Price: req.body.price,
            Category: req.body.category,
            Condition: req.body.condition,
            DateEnabled: req.body.dateEnabled,
            Lifetime: req.body.lifetime,
            Imagelink: req.body.Imagelink
        });

        console.log(updatedItem);

        AdvertisementModel.updateOne({ _id: id }, updatedItem, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                console.log(req.body);
                //refresh advertisements
                res.redirect('/advertisement/list');
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}

//Delete Controller
module.exports.performDelete = (req, res, next) => {
    try {
        let id = req.params.id;

        AdvertisementModel.remove({ _id: id }, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                // refresh advertisements
                res.redirect('/advertisement/list');
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}

// Add Controllers
module.exports.displayAddPage = (req, res, next) => {
    let newItem = AdvertisementModel();

    res.render('advertisement/add_edit', {
        title: 'Add a New Advertisement',
        item: newItem
    });
}

module.exports.processAddPage = (req, res, next) => {
    try {
        let newItem = AdvertisementModel({
            _id: req.body.id,
            ProductName: req.body.productName,
            Brand: req.body.brand,
            Price: req.body.price,
            Category: req.body.category,
            Condition: req.body.condition,
            DateEnabled: req.body.dateEnabled,
            Lifetime: req.body.lifetime
        });

        AdvertisementModel.create(newItem, (err, item) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
                // refresh advertisements
                console.log(item);
                res.redirect('/advertisement/list')
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}