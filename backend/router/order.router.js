const express = require('express');
const router = express.Router();
const ordersController = require('../controller/order.controller');
const path = require('path');
const multer = require('multer');
const Order = require('../model/orderModel'); // Adjust the path as necessary


router.get('/', async (req, res) => {
    try {
        const orders = await ordersController.getAllOrders();
        return res.status(200).json(orders);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});


// Tạo route để nhận dữ liệu đơn hàng và lưu vào MongoDB
router.post('/add', async (req, res) => {
    try {
        const { cartItems, totalAmount, userId, orderDate, status, fullName, phoneNumber, address } = req.body;

        // Tạo một đối tượng mới để lưu trữ thông tin đơn hàng và thông tin người nhận
        const orderData = {
            cartItems: cartItems,
            totalAmount: totalAmount,
            userId, userId,
            orderDate: orderDate,
            status: status,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address
        };

        // Tạo một đối tượng đơn hàng mới từ mô hình mongoose
        const newOrder = new Order(orderData);

        // Lưu đơn hàng mới vào cơ sở dữ liệu
        const savedOrder = await newOrder.save();

        res.status(201).json(savedOrder); // Trả về đơn hàng vừa được tạo thành công
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' }); // Trả về thông báo lỗi nếu có lỗi xảy ra
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const pro = await ordersController.getOrderById(id);
        return res.status(200).json(pro)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})

router.get('/userbyid/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await ordersController.getOrderByIdUser(id); // Sửa tên hàm ở đây
        return res.status(200).json(orders);
    } catch (error) {
        console.log("Lỗi: ", error);
        return res.status(500).json({ error: "Đã xảy ra lỗi khi lấy đơn đặt hàng của người dùng" });
    }
});
module.exports = router;