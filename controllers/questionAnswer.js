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
module.exports.getQuestions = async function (req, res, next) {

    try {
        QuestionModel.find((err, questionAnswerList) => {
            if (err) {
                console.error(err);
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(questionAnswerList);
            }
        });
                 
    } catch (error) {
        return res.status(400).json(
            { 
                success: false, 
                message: getErrorMessage(error)
            }
        );
    }
}

module.exports.processAdd = (req, res, next) => {
    try {
        let newItem = QuestionModel({
            _id: req.body.id,
            AdvertisementID: req.body.AdvertisementID,
            Question: req.body.Question
        });

        QuestionModel.create(newItem, (err, item) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                console.log(item);

                res.status(200).json(
                    {
                        success: true,
                        message: 'Item added successfully.',
                        item: item
                    }
                )
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}

module.exports.processEdit = (req, res, next) => {
    let id = req.params.id;

    try {
        let updatedItem = QuestionModel({
            _id: id,
            AdvertisementID: req.body.AdvertisementID,
            Question: req.body.Question,
            Answer: req.body.Answer
        });

        QuestionModel.updateOne({ _id: id }, updatedItem, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                console.log(updatedItem);

                res.status(200).json(
                    {
                        success: true,
                        message: 'Item edited successfully.',
                        item: item
                    }
                )
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

        QuestionModel.remove({ _id: id }, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(
                    {
                        success: true,
                        message: 'Item deleted successfully.'
                    }
                )
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}