const mongoose = require('mongoose');

const PromotedItemSchema = new mongoose.Schema({
    itemId: {
        type: String,
        required: [true, 'Id is required'],
        unique: true,
        trim: true,
        maxlenght: [35, 'Name cannot be more than 35 characters']
    },
    priceModifier: {
        type: Number,
        required: [true, 'Price Modifier is required']
    }
});

module.exports = mongoose.model('PromotedItem', PromotedItemSchema);