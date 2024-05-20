const mongoose = require('mongoose');
const categoriesModel = require('../model/categoriesModel');
const productsModel = require('../model/productsModel');

async function getAllCategories() {
    try {
        const result = await categoriesModel.find();
        return result;
    } catch (error) {
        console.log('Loi: ', error);
        throw error;
    }
}

async function getDetailCategory(id) {
    try {
        const result = await categoriesModel.findById(id);
        if (!result) {
            throw new Error('Category khong ton tai')
        }
        return result;
    } catch (error) {
        console.log("Loi: ", error);
        throw error;
    }
}

async function edit_category(id, body) {
    try {
        const result = await categoriesModel.findByIdAndUpdate(id, body, { new: true });
        return result;
    } catch (error) {
        console.log('Loi: ', error);
        throw error;
    }
}

async function createCategory(body) {
    try {
        const { name_ct, tag_ct, image_ct } = body;
        const newCategory = new categoriesModel({ name_ct, tag_ct, image_ct });
        const result = await newCategory.save();
        return result;

    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}


async function deleteCategory(id) {
    try {
        // Tìm category dựa trên ID
        const category = await categoriesModel.findById(id);

        // Kiểm tra xem category có tồn tại không
        if (!category) {
            throw new Error("Không tìm thấy danh mục có ID này.");
        }

        // Kiểm tra xem tag name của category có được sử dụng trong bất kỳ sản phẩm nào hay không
        const categoryInUse = await productsModel.exists({ category_pr_tag: category.tag_ct });

        if (categoryInUse) {
            throw new Error("Không thể xóa danh mục đang được sử dụng trong sản phẩm.");
        }

        // Nếu không có sản phẩm nào sử dụng tag name của category, tiến hành xóa category
        const result = await categoriesModel.findByIdAndDelete(id);
        return result;
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
}

module.exports = { getAllCategories, edit_category, createCategory, deleteCategory, getDetailCategory };