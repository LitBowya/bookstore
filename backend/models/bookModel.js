const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category' // Reference to Category model
    },
    coverImage: {
        type: String, // URL to the cover image
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
