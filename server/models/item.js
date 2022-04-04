const mongoose = require('mongoose');
const slugify = require('slugify');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true,
        maxlenght: [35, 'Name cannot be more than 30 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlenght: [350, 'Description cannot be more than 350 characters']
    },
    shortDescription: {
        type: String,
        required: [true, 'Short Description is required'],
        maxlenght: [50, 'Short Description cannot be more than 50 characters']
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    ratings: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Rating',
        required: true
    }],
    sizes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Size',
        required: true
    }],
    isStarted: {
        type: String,
        enum: ['Men', 'Women'],
        required: true
    },
});

ItemSchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

module.exports = mongoose.model('Item', ItemSchema);