// models/ClothingItem.js
const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
    image: {
        type: String, // URL of the uploaded image
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    style: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const ClothingItem = mongoose.model('ClothingItem', clothingItemSchema);
module.exports = ClothingItem;
