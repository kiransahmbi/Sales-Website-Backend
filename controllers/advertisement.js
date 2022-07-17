// Create a reference to the model
let AdvertisementModel = require('../models/advertisement');
let QuestionModel = require('../models/questionAnswer');

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

    AdvertisementModel.findById({_id: id}, (err, details) => {
        if (err) {
            console.log(err);
            res.end(err);
        } else {
            QuestionModel.find({AdvertisementID : id}, (err, questions) => {
                res.render('advertisement/details', {
                    title: 'Details',
                    Advertisement: details,
                    Questions: questions
                })
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
            res.render('advertisement/add_edit', {
                title: 'Edit Advertisement',
                item: itemToEdit
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {
    try {
        let id = req.params.id

        let updatedItem = AdvertisementModel({
            _id: id,
            ProductName: req.body.ProductName,
            Brand: req.body.Brand,
            Description: req.body.Description,
            Price: req.body.Price,
            Category: req.body.Category,
            Condition: req.body.Condition,
            ImageLink: req.body.ImageLink
        });

        if (req.body.DateEnabled) {
            updatedItem.DateEnabled = req.body.DateEnabled;
        }

        if (req.body.Lifetime) {
            updatedItem.Lifetime = req.body.Lifetime;
        }

        console.log(updatedItem);

        AdvertisementModel.updateOne({ _id: id }, updatedItem, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
            } else {
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
        title: 'Add a Advertisement',
        item: newItem
    });
}

module.exports.processAddPage = (req, res, next) => {
    console.log(req.body);
    try {
        let newItem = AdvertisementModel({
            _id: req.body.id,
            ProductName: req.body.ProductName,
            Brand: req.body.Brand,
            Description: req.body.Description,
            Price: req.body.Price,
            Category: req.body.Category,
            Condition: req.body.Condition,
            ImageLink: req.body.ImageLink
        });

        if (req.body.DateEnabled) {
            newItem.DateEnabled = req.body.DateEnabled;
        }

        if (req.body.Lifetime) {
            newItem.Lifetime = req.body.Lifetime;
        }

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