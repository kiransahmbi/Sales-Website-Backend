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
module.exports.displayAddPage = (req, res, next) => {
    let newItem = QuestionModel();

    res.render('question/questions', {
        title: 'Ask a Question',
        item: newItem
    });
}

module.exports.processAddPage = (req, res, next) => {
    console.log(req.body);
    try {
        let newItem = QuestionModel({
            _id: req.body.id,
            Question: req.body.Question,
            Answer: req.body.Answer
        });

        QuestionModel.create(newItem, (err, item) => {
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