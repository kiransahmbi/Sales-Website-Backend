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
            default: Date.now
        },
        Lifetime: {
            type: Date,
            default: () => {
                return new Date(new Date().setMonth(new Date().getMonth() + 1))
            }
        },
        ImageLink: String,
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        collection: "advertisements"
    }
);

module.exports = mongoose.model("Advertisement", advertisementModel)