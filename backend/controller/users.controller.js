// Trong tệp controller/usersController.js
const usersModel = require('../model/usersModel');

async function getAllUsers() {
    try {
        const result = await usersModel.find();
        return result;
    } catch (error) {
        console.log('Loi: ', error);
        throw error;
    }
}

async function createUsers(body) {
    try {
        const { name_us, password_us, user_name_us, image_us, email_us, phone_us, address_us } = body;

        // Create an object to store order information
        const orderData = {
            name_us: name_us,
            user_name_us: user_name_us,
            password_us: password_us,
            image_us: image_us,
            email_us: email_us,
            phone_us: phone_us,
            address_us: address_us
        };

        // Create a new order object using the usersModel
        const newUser = new usersModel(orderData); // Sử dụng usersModel thay vì Users

        // Save the new order to the database
        const savedOrder = await newUser.save();

        return savedOrder; // Return the newly created order
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}

//xóa theo id
async function removeUser(id) {
    try {
        const result = await usersModel.findByIdAndDelete(id)
        return result
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// cập nhật user theo id
async function updateByIdUser(id, body) {
    try {
        const user = await usersModel.findById(id)
        if (!user) {
            throw new Error('Không tìm thấy user')
        }
        const { name_us, password_us, user_name_us, email_us, phone_us, address_us } = body;
        const result = await usersModel.findByIdAndUpdate(id, { name_us, password_us, user_name_us, email_us, phone_us, address_us }, { new: true })
        return result

    } catch (error) {
        console.log('Lỗi: ', error);
        throw error
    }
}


async function getUserById(id) {
    try {
        const result = await usersModel.findById(id);

        if (!result) {
            throw new Error('User khong ton tai')
        }
        return result;
    } catch (error) {
        console.log("Loi: ", error);
        throw error;
    }
}

module.exports = { getAllUsers, createUsers, removeUser, updateByIdUser, getUserById };
