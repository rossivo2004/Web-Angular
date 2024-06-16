const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId,  ref: 'User' },
  cartItems: { type: Array, required: true },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, required: true }, // Ensure this is a string
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true }
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
