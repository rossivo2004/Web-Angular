const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name_us: { type: String },
    password_us: { type: String, required: true },
    user_name_us: { type: String, required: true },
    image_us: { type: String },
    email_us: { type: String, require: true },
    phone_us: { type: Number },
    address_us: { type: String }
});

module.exports = mongoose.model('users', usersSchema);
