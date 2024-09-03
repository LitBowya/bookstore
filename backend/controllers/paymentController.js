import Payment from "../models/paymentModel.js";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Book from "../models/bookModel.js";
import paystack from "../config/paystackConfig.js";
import logger from "../utils/logger.js";

// Get all payments for a specific user
export const getPayments = async (req, res, next) => {
    try {
        const { userId } = req.body;

        const payments = await Payment.find({ userId }).populate({
            path: "orderId",
            select: "orderItems totalPrice",
        });

        logger.info(`Payments fetched successfully for user: ${userId}`);
        res.json({
            status: "success",
            message: "Payments fetched successfully",
            payments,
        });
    } catch (error) {
        logger.error(`Error fetching payments: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Get all payments (admin use case)
export const getAllPayments = async (req, res, next) => {
    try {
        const payments = await Payment.find({})
            .populate({
                path: "orderId",
                select: "orderItems totalPrice",
            })
            .populate({
                path: "userId",
                select: "name email profilePicture",
            });

        logger.info(`All payments fetched successfully`);
        res.json({
            status: "success",
            message: "All payments fetched successfully",
            payments,
        });
    } catch (error) {
        logger.error(`Error fetching all payments: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Create a new payment
export const createPayment = async (req, res, next) => {
    try {
        const { orderId, amount, paymentMethod, transactionId } = req.body;

        const payment = new Payment({
            userId: req.user.id,
            orderId,
            amount,
            paymentMethod,
            transactionId,
        });

        const createdPayment = await payment.save();
        logger.info(`Payment created successfully: ${createdPayment._id}`);
        res.status(201).json({
            status: "success",
            message: "Payment created successfully",
            payment: createdPayment,
        });
    } catch (error) {
        logger.error(`Error creating payment: ${error.message}`);
        res.status(500).json({ status: "failed", message: "Internal Server Error" });
        next(error);
    }
};

// Initiate Payment
export const initiatePayment = async (req, res, next) => {
    try {
        const { email, orderId } = req.body;

        if (!email || !orderId) {
            return res.status(400).json({
                status: "failed",
                message: "Email and order ID are required",
            });
        }

        const order = await Order.findById(orderId).populate("orderItems.book", "price");
        if (!order) {
            return res.status(404).json({ status: "failed", message: "Order not found" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }
        const userId = user._id;

        const amount = order.totalPrice;

        const paymentData = {
            amount: amount * 100, // Convert to kobo
            email,
            metadata: {
                userId: userId.toString(),
                orderId: orderId,
            },
            callback_url: process.env.PAYSTACK_CALLBACK_URL,
        };

        const response = await paystack.transaction.initialize(paymentData);

        if (response.status) {
            res.json({
                status: "success",
                message: "Payment initiated successfully",
                data: {
                    authorization_url: response.data.authorization_url,
                    access_code: response.data.access_code,
                    reference: response.data.reference,
                },
            });
        } else {
            res.status(400).json({
                status: "failed",
                message: response.message,
            });
        }
    } catch (error) {
        next(error);
    }
};

// Verify Payment
export const verifyPayment = async (req, res, next) => {
    try {
        const { reference } = req.query;

        if (!reference) {
            return res.status(400).json({ status: "failed", message: "Reference is required" });
        }

        // Verify the payment with Paystack
        const response = await paystack.transaction.verify({ reference });

        if (response.status) {
            const paymentData = response.data;

            if (!paymentData || !paymentData.metadata || !paymentData.metadata.orderId || !paymentData.metadata.userId) {
                return res.status(400).json({ status: "failed", message: "Invalid payment data" });
            }

            const userId = paymentData.metadata.userId;
            const orderId = paymentData.metadata.orderId;

            let payment = await Payment.findOne({ transactionId: paymentData.reference });
            if (!payment) {
                // Create a new payment record if it doesn't exist
                payment = new Payment({
                    userId,
                    orderId,
                    amount: paymentData.amount / 100, // Convert from kobo to currency
                    paymentMethod: "Paystack",
                    transactionId: paymentData.reference,
                    status: "Completed", // Set payment status as completed
                });
                await payment.save();

                // Update the order status to 'Paid' upon successful payment
                const order = await Order.findById(orderId);
                if (!order) {
                    return res.status(404).json({ status: "failed", message: "Order not found" });
                }

                order.isPaid = true;
                order.paidAt = Date.now();
                await order.save();
            }

            logger.info(`Payment verified successfully: ${paymentData.reference}`);
            res.json({
                status: "success",
                message: "Payment verified successfully",
                payment,
            });
        } else {
            logger.error(`Payment verification failed: ${response.message}`);
            res.status(400).json({ status: "failed", message: response.message });
        }
    } catch (error) {
        logger.error(`Error verifying payment: ${error.message}`);
        if (!res.headersSent) {
            res.status(500).json({ status: "failed", message: "Internal Server Error" });
        }
        next(error);
    }
};
