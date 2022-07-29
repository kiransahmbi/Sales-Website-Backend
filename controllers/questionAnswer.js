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

// Add Controllers
module.exports.getQuestions = async (req, res, next) => {

    try {
        let questionAnswerList = await QuestionModel.find().populate({
            path: 'Owner',
            select: '_id AdvertisementID Question Answer'
        });

        res.status(200).json(questionAnswerList);
        
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}

module.exports.processAddPage = (req, res, next) => {
    
    console.log(req.body);
    try {
        let newItem = QuestionModel({
            _id: req.body.id,
            AdvertisementID: req.body.advertisementID,
            Question: req.body.Question,
            Owner: (req.body.owner == null || req.body.owner == "") ? req.payload.id : req.body.owner
        });

        QuestionModel.create(newItem, (err, item) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                console.log(item);
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


// Edit Controllers
// module.exports.displayEditPage = (req, res, next) => {
//     let id = req.params.id;
//     let advertisement = req.params.advertisement;

//     QuestionModel.findById(id, (err, itemToEdit) => {
//         if (err) {
//             console.log(err);
//             res.end(err);
//         } else {
//             res.render('question/add_update', {
//                 title: 'Update Answer',
//                 item: itemToEdit,
//                 action: "edit",
//                 Advertisement: advertisement
//             })
//         }
//     });
// }

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    let advertisement = req.params.advertisement;

    try {
        let updatedItem = QuestionModel({
            _id: req.params.id,
            AdvertisementID: req.params.advertisement,
            Question: req.body.Question,
            Answer: req.body.Answer,
            Owner: (req.body.owner == null || req.body.owner == "") ? req.payload.id : req.body.owner
        });

        console.log(updatedItem);

        QuestionModel.updateOne({ _id: id }, updatedItem, (err) => {
            if (err) {
                console.log(err);
                res.end(err);
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

//Delete Controller
module.exports.performDelete = (req, res, next) => {
    try {
        console.log(req.params);
        let id = req.params.id;

        QuestionModel.deleteOne({ _id: id }, (err) => {
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