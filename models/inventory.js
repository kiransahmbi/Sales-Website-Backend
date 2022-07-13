// Import
let mongoose = require('mongoose');

// Create a model class
let inventoryModel = mongoose.Schema(
    {
        Name: String,
        ContactNumber: Number,
        tags: [],
        EmailAddress: String,
     
    },
    {
        collection: "Name"
    }
);

module.exports = mongoose.model("Inventory", inventoryModel);