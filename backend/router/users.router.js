// Trong tệp routes/users.js
const express = require('express');
const router = express.Router();
const usersController = require('../controller/users.controller');
const path = require('path');
const multer = require('multer');
const usersModel = require('../model/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'shhhhhh';
const JWT_EXPIRES_IN = '1h';

router.get('/', async (req, res) => {
    try {
        const users = await usersController.getAllUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});



// thêm user
router.post('/add', async (req, res) => {
    try {
        const savedUser = await usersController.createUsers(req.body);
        res.status(201).json(savedUser);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
});

// xóa user
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

//cập nhật user theo id
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

// Chi tiết user
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

// Đăng nhập
router.post('/login', async (req, res) => {
  try {
      const { user_name_us, password_us } = req.body;

      const user = await usersModel.findOne({ user_name_us });

      if (!user) {
          return res.status(404).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }

      const isMatch = await bcrypt.compare(password_us, user.password_us); 
      if (!isMatch) {
          return res.status(404).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
      }

      const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: 1 * 60 }); // 1 minute
      const refreshToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: 90 * 24 * 60 * 60 }); // 90 days

      res.status(200).json({ user, access_token: accessToken, refresh_token: refreshToken });
  } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/refresh-token', async (req, res) => {
    try {
      const { refresh_token } = req.body;
  
      if (!refresh_token) {
        return res.status(401).json({ message: 'Refresh token is required' });
      }
  
      // Xác thực refresh token
      jwt.verify(refresh_token, JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Invalid refresh token' });
        }
  
        // Tạo access token mới
        const accessToken = jwt.sign({ userId: user.userId, role: user.role }, JWT_SECRET, { expiresIn: 1 * 60 }); // 1 minute
        res.status(200).json({ access_token: accessToken });
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

router.post('/forgot_password', async (req, res) => {
    try {
        const { email } = req.body;
        const response = await usersController.forgotPassword(email);
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in /forgot_password route:", error.message);
        res.status(500).json({ message: error.message });
    }
});

router.post('/reset_password', async (req, res) => {
    try {
        const { token, password, passwordConfirm } = req.body;
        const response = await usersController.resetPassword(token, password, passwordConfirm);
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
