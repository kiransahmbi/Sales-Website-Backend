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
        let questionAnswerList = await QuestionModel.find().populate({
            path: 'owner',
            select: 'id AdvertisementID Question Answer'
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

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;
    console.log(id);

    try {
        let updatedItem = QuestionModel({
            _id: id,
            AdvertisementID: req.body.AdvertisementID,
            Question: req.body.Question,
            Answer: req.body.Answer
        });

        console.log(updatedItem);

        QuestionModel.updateOne({ _id: id }, updatedItem, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200).json(updatedItem);
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

        QuestionModel.deleteOne({ _id: id }, (err) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: getErrorMessage(err)
                });
            } else {
                res.status(200);
            }
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: getErrorMessage(error)
        });
    }
}