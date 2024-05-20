const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
    name_ct: { type: String, required: true },
    image_ct: { type: String, require: true },
    tag_ct: { type: String, require: true }

});

module.exports = mongoose.model('categories', categoriesSchema);
