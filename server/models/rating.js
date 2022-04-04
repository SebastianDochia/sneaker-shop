const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, 'UserID is required'],
        unique: true,
        trim: true
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required']
    }
});

module.exports = mongoose.model('Rating', RatingSchema);