// Import
let mongoose = require('mongoose');

// Create a model class
let advertisementModel = mongoose.Schema(
    {
        ProductName: String,
        Description: String,
        Brand: String,
        Price: Number,
        Category: String,
        Condition: String,
        DateEnabled: {
            type: Date,
            default: "$currentDate"
        },
        Lifetime: {
            type: Date,
            default: {
                $dateAdd: {
                    startDate: "$currentDate",
                    unit: "month",
                    amount: 1
                    }
            }
        }   
    },
    {
        collection: "advertisements"
    }
);

module.exports = mongoose.model("Advertisement", advertisementModel)