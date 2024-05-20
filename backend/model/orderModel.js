const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: String, required: true },
    // productImg: { type: String, required: true },
    quantity: { type: Number, required: true }
});

const ordersSchema = new Schema({
    cartItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    userId: { type: String },
    orderDate: { type: Date, default: Date.now },
    status: { type: Number, required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    address: { type: String, required: true }

});

module.exports = mongoose.model('Order', ordersSchema);
