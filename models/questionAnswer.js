// Import
let mongoose = require('mongoose');

// Create a model class
let questionAnswerModel = mongoose.Schema(
    {
        AdvertisementID: mongoose.Schema.Types.ObjectId,
        Question: String,
        Answer: String,
        Owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "QuestionAnswer"
    }
);

module.exports = mongoose.model("QuestionAnswer", questionAnswerModel)