const express = require('express');
const router = express.Router();
const ordersController = require('../controller/order.controller');
const path = require('path');
const multer = require('multer');
const Order = require('../model/orderModel'); // Adjust the path as necessary


router.get('/', async (req, res) => {
    try {
        const orders = await ordersController.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => {
    try {
        const orderData = req.body;
        const newOrder = await ordersController.createOrder(orderData);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
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