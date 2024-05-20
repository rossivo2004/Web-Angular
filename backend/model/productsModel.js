const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name_pr: { type: String, required: true },
    category_pr: {
        // category_pr_name: { type: String, required: true },
        category_pr_tag: { type: String, required: true }
    },
    price_pr: { type: Number, required: true },
    image_pr: {
        image_pr_1: { type: String, require: true },
    },
    description_pr: { type: String, required: true },
    description_pr_detail: { type: String, required: true },
    discount_pr: { type: Number, require: true },
    quantity_pr: { type: Number, require: true },
    view_pr: { type: Number },
    weight_pr: { type: Number, require: true },
    sale_pr: { type: Number },
    rating_pr: { type: Number }

});

module.exports = mongoose.model('products', productsSchema);
