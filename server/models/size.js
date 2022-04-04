const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
    size: {
        type: Number,
        required: [true, 'Number is required'],
        unique: true,
        trim: true
    },
    stockStatus: {
        type: String,
        enum: ['InStock', 'JustAFewLeft', 'OutOfStock'],
        required: [true, 'stockStatus is required']
    }
});

module.exports = mongoose.model('Size', SizeSchema);