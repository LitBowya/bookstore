import mongoose from 'mongoose';

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
        ref: 'Category'
    },
    coverImage: {
        type: String,
    },
    bookPdf: {
        type: String,
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

export default Book;
