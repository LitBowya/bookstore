const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [{
        title: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        book: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Book'
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    payment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
