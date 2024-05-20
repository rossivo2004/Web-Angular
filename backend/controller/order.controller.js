const mongoose = require('mongoose');
const ordersModel = require('../model/orderModel');

async function getAllOrders() {
    try {
        const result = await ordersModel.find();
        return result;
    } catch (error) {
        console.log('Loi: ', error);
        throw error;
    }
}

async function createOrders(body) {
    try {
        const { cartItems, totalAmount, userId, orderDate, status, fullName, phoneNumber, address } = body;

        // Create an object to store order information
        const orderData = {
            cartItems: cartItems,
            totalAmount: totalAmount,
            userId: userId,
            orderDate: orderDate,
            status: status,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address
        };

        // Create a new order object using the Order model
        const newOrder = new Order(orderData);

        // Save the new order to the database
        const savedOrder = await newOrder.save();

        return savedOrder; // Return the newly created order
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

//lấy sản phẩm theo id
async function getOrderById(id) {
    try {
        const result = await ordersModel.findById(id);

        if (!result) {
            throw new Error('Don hang khong ton tai')
        }
        return result;
    } catch (error) {
        console.log("Loi: ", error);
        throw error;
    }
}

// tìm kiếm order theo id user
async function getOrderByIdUser(userId) {
    try {
        const result = await ordersModel.find({ userId: userId });
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}



module.exports = { getAllOrders, createOrders, getOrderById, getOrderByIdUser };