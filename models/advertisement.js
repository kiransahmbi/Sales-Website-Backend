// Import
let mongoose = require('mongoose');

// Create a model class
let advertisementModel = mongoose.Schema(
    {
        ProductName: String,
        Brand: String,
        Price: Number,
        Category: String,
        Condition: String,
        ExpiryDate: Date,
        
    },
    {
        collection: "Advertisement"
    }
);

module.exports = mongoose.model("Advertisement", advertisementModel)