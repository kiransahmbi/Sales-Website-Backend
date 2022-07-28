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

module.exports.advertisementList = async function(req, res, next){  

    try {
        let advertisementList = await AdvertisementModel.find().populate({
            path: 'owner',
            select: 'firstName lastName email username admin created'
        });

        res.status(200).json(advertisementList);
        
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
    
}

// // Details page
// module.exports.displayDetails = (req, res, next) => {
//     let id = req.params.id;

//     AdvertisementModel.findById({_id: id}, (err, details) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         } else {
//             QuestionModel.find({AdvertisementID : id}, (err, questions) => {
//                 res.render('advertisement/details', {
//                     title: 'Details',
//                     Advertisement: details,
//                     Questions: questions
//                 })
//             })
//         }
//     });
// }

// Edit Controllers
// module.exports.displayEditPage = (req, res, next) => {
//     let id = req.params.id;

//     AdvertisementModel.findById(id, (err, itemToEdit) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         } else {
//             res.render('advertisement/add_edit', {
//                 title: 'Edit Advertisement',
//                 item: itemToEdit
//             })
//         }
//     });
// }

module.exports.processEdit = (req, res, next) => {
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
            ImageLink: req.body.ImageLink,
            owner: (req.body.owner == null || req.body.owner == "") ? req.payload.id : req.body.owner
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
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Item Updated Successfully"
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

//Delete Controller
module.exports.performDelete = (req, res, next) => {
    try {
        let id = req.params.id;

        AdvertisementModel.remove({ _id: id }, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Item Deleted Successfully"
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

// Add Controllers
module.exports.displayAddPage = (req, res, next) => {
    let newItem = AdvertisementModel();

    res.render('advertisement/add_edit', {
        title: 'Add a Advertisement',
        item: newItem
    });
}

module.exports.processAdd = (req, res, next) => {
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
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(item);
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}