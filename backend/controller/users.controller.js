const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const usersModel = require('../model/usersModel');
const usersService = require('../services/users.service');
const getContstants = require('../helper/constants').getContstants;

const JWT_SECRET = 'shhhhhh'; // Replace with your own secret key
const JWT_EXPIRES_IN = '1h'; // Token expiry time

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

        let user = await usersModel.findOne({ email_us });

        if (user) {
            throw new Error("Email đã tồn tại");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password_us, salt);

        const userData = {
            name_us: name_us || "",
            user_name_us,
            password_us: hash,
            image_us: image_us || "",
            email_us,
            phone_us: phone_us || 0,
            address_us: address_us || "",
            role: 0,
            resetPasswordToken: null
        };

        const newUser = new usersModel(userData);
        const savedUser = await newUser.save();

        return savedUser;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}



// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
    }
}

async function removeUser(id) {
    try {
        const result = await usersModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

async function updateByIdUser(id, body) {
    try {
        const user = await usersModel.findById(id);
        if (!user) {
            throw new Error('Không tìm thấy user');
        }
        const { name_us, password_us, user_name_us, email_us, phone_us, address_us } = body;

        if (password_us) {
            const salt = bcrypt.genSaltSync(10);
            body.password_us = bcrypt.hashSync(password_us, salt);
        }

        const result = await usersModel.findByIdAndUpdate(id, { name_us, password_us, user_name_us, email_us, phone_us, address_us }, { new: true });
        return result;
    } catch (error) {
        console.log('Lỗi: ', error);
        throw error;
    }
}

async function getUserById(id) {
    try {
        const result = await usersModel.findById(id);

        if (!result) {
            throw new Error('User không tồn tại');
        }
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

async function loginUser(user_name_us, password_us) {
    try {
        const user = await usersService.login(user_name_us, password_us);
        return user;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

// async function loginUser(email_us, password_us) {
//     try {
//         const user = await usersModel.findOne({ email_us });

//         if (!user) {
//             throw new Error("User không tồn tại");
//         }

//         const isMatch = await bcrypt.compare(password_us, user.password_us);
//         if (!isMatch) {
//             throw new Error("Sai mật khẩu");
//         }

//         const token = jwt.sign({ id: user._id, email_us: user.email_us, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

//         return { token, user };
//     } catch (error) {
//         console.log("Lỗi: ", error);
//         throw error;
//     }
// }

const forgotPassword = async (email) => {
    try {
        const user = await usersModel.findOne({ email_us: email });
        if (user) {
            const token = jwt.sign({ id: user._id }, getContstants().JWT_SECRET, { expiresIn: 5 * 60 });
            user.resetPasswordToken = token;
            await user.save();

            const mailOptions = {
                from: getContstants().MAIL,
                to: email,
                subject: 'Reset Password',
                html: `<a href="http://localhost:4200/reset_password?token=${token}">Reset password</a>`
            };
            await transporter.sendMail(mailOptions);
            return true;
        }
        //console.error("User not found with email:", email);
        //return false;
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return error.message;
    }
};


// const forgotPassword = async (email) => {
//     try {
//         const user = await usersModel.findOne({ email });
//         if (user) {
//             const token = jwt.sign({ id: user._id }, getContstants().JWT_SECRET, { expiresIn: 5 * 60 });
//             user.resetPasswordToken = token;
//             await user.save();

//             const mailOptions = {
//                 from: getContstants().MAIL,
//                 to: email,
//                 subject: 'Reset Password',
//                 html: `<a href="${getContstants().HOST}/reset_password?token=${token}">Reset password</a>`
//             };
//             await transporter.sendMail(mailOptions);
//             return true;
//         }
//         console.error("User not found with email:", email);
//         return false;
//     } catch (error) {
//         console.error("Error in forgotPassword:", error);
//         return false;
//     }
// };

const resetPassword = async (token, password, passwordConfirm) => {
    if (password !== passwordConfirm) {
        throw new Error('Passwords do not match');
    }
    const data = jwt.verify(token, getContstants().JWT_SECRET);
    if (data && data.id) {
        // const user = await usersModel.findOne({ resetPasswordToken: token });
        // if (user) {
        //     const salt = bcrypt.genSaltSync(10);
        //     const hash = bcrypt.hashSync(password, salt);
        //     user.password_us = hash;
        //     user.resetPasswordToken = null;
        //     await user.save();
        //     return true;
        // }
        const result = await usersService.resetPassword(token, password);
        return result;
    }
    return false;
};


const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: getContstants().MAIL,
        pass: getContstants().APP_PASSWORD
    }
});


module.exports = { getAllUsers, createUsers, loginUser, removeUser, updateByIdUser, getUserById, 
    authenticateToken, forgotPassword, resetPassword };
