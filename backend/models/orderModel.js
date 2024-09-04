import mongoose from "mongoose";

// Define a schema for the shipping address
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    additionalInfo: { type: String, required: true },
    region: { type: String, required: true }
});

// Define the order schema
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
    paymentMethod: {
        type: String,
        enum: ["Paystack"],
        required: true
    },
    shippingAddress: {
        type: addressSchema,
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

export default Order;
