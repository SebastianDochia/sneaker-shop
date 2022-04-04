const mongoose = require('mongoose');

const PromotionSchema = new mongoose.Schema({
    promotionName: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
        maxlenght: [35, 'Name cannot be more than 35 characters']
    },
    promotionEyeCatcher: {
        type: String,
        required: [true, 'Description is required'],
        maxlenght: [30, 'Description cannot be more than 30 characters']
    },
    itemsInPromotion: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Promoteditem',
        required: true
    }],
    promotionType: {
        type: String,
        enum: ['Discount', 'TwoForOne'],
        required: true
    },
});

module.exports = mongoose.model('Promotion', PromotionSchema);