const usersModel = require('../model/usersModel');
const bcrypt = require('bcrypt');

const login = async (user_name_us, password_us) => {
    const user = await usersModel.findOne({ user_name_us });
    if (!user) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
    }
    const passwordMatch = await bcrypt.compare(password_us, user.password_us);
    if (!passwordMatch) {
        throw new Error('Tên đăng nhập hoặc mật khẩu không đúng');
    }
    return user;
}

const forgotPassword = async (email) => {
    const user = await usersModel.findOne({email});
    if(user){
        const token = jwt.sign({id: user.id}, 'shhhhhh', {expiresIn: 5 * 60});
        user.resetPasswordToken = token;
        await user.save();
        return token;
    }
    return null;
}

const resetPassword = async (token, password) => {
    const user = await usersModel.findOne({resetPasswordToken: token});

    if(user){
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password_us =  hash;
        user.resetPasswordToken =  null;
        await user.save();
        return true;
    }
    return false;
}

module.exports = {
    login, resetPassword,forgotPassword
}