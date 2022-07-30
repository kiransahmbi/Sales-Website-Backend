// Import
let mongoose = require('mongoose');

// Create a model class
let questionAnswerModel = mongoose.Schema(
    {
        AdvertisementID: mongoose.Schema.Types.ObjectId,
        Question: String,
        Answer: String
    },
    {
        collection: "QuestionAnswer"
    }
);

module.exports = mongoose.model("QuestionAnswer", questionAnswerModel)