// Trong tệp routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');
const path = require('path');
const multer = require('multer');
const usersModel = require('../model/usersModel');

router.get('/', async (req, res) => {
    try {
        const users = await usersController.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});

// Tạo route để nhận dữ liệu đơn hàng và lưu vào MongoDB
router.post('/add', async (req, res) => {
    try {
        const { name_us, password_us, user_name_us, image_us, email_us, phone_us, address_us } = req.body;

        // Tạo một đối tượng mới để lưu trữ thông tin đơn hàng và thông tin người nhận
        const userData = {
            name_us: name_us,
            user_name_us: user_name_us,
            password_us: password_us,
            image_us: image_us,
            email_us: email_us,
            phone_us: phone_us,
            address_us: address_us
        };

        // Tạo một đối tượng đơn hàng mới từ mô hình mongoose (usersModel)
        const newUser = new usersModel(userData); // Sử dụng usersModel thay vì User

        // Lưu đơn hàng mới vào cơ sở dữ liệu
        const savedOrder = await newUser.save();

        res.status(201).json(savedOrder); // Trả về đơn hàng vừa được tạo thành công
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' }); // Trả về thông báo lỗi nếu có lỗi xảy ra
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userDel = await usersController.removeUser(id);
        return res.status(200).json({ message: "Xóa user thành công" });
    } catch (error) {
        console.log("Lỗi: ", error);
        return res.status(500).json({ message: error });
    }
});

//cập nhật sản phẩm theo id
router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const body = req.body
        const userUpdate = await usersController.updateByIdUser(id, body)
        return res.status(200).json({ UserUpdate: userUpdate })
    } catch (error) {
        console.log("Lỗi cập nhật product theo id: ", error);
        return res.status(500).json({ mess: error })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const pro = await usersController.getUserById(id);
        return res.status(200).json(pro)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})



module.exports = router;
