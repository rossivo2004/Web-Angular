const express = require('express');
const router = express.Router();
const categoriesController = require('../controller/categories.controller');
const path = require('path');
const multer = require('multer');

router.get('/', async (req, res) => {
    try {
        const categories = await categoriesController.getAllCategories();
        return res.status(200).json(categories);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});

// router.put('/edit/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const body = req.body;
//         const result = await categoriesController.updateCategory(id, body);
//         return res.status(200).json(result);
//     } catch (error) {
//         console.log("Lỗi: ", error);
//         throw error;
//     }
// });

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images'); // Thư mục lưu trữ hình ảnh
    },
    filename: function (req, file, cb) {
        // Tên file sẽ được lưu trữ là timestamp hiện tại + tên gốc của file
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const checkImg = ((req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|webp|gif)$/)) {
        return cb(new Error('Vui lòng nhập đúng định dạng'))
    }
    cb(null, true)
})

const upload = multer({ storage: storage, fileFilter: checkImg });

router.post('/add_ct', upload.fields([
    { name: 'image_ct', maxCount: 1 }
]), async (req, res) => {
    try {
        const body = req.body;
        const files = req.files;

        // Lấy chỉ tên tệp của các ảnh tải lên từ req.files và lưu vào body
        if (files) {
            for (const key in files) {
                body[key] = path.basename(files[key][0].filename);
            }
        }

        const result = await categoriesController.createCategory(body);
        // Tiếp tục xử lý thông tin sản phẩm
        // Gọi hàm insertProduct từ productController và xử lý kết quả

        // Chuỗi HTML chứa mã JavaScript để hiển thị cửa sổ cảnh báo
        const alertScript = `
            <script>
                alert('Thêm sản phẩm thành công');
            </script>
        `;

        // Gửi cảnh báo và chuyển hướng về trang http://localhost:4200/admin_category
        res.send(alertScript);
    } catch (error) {
        console.log('Không thêm sản phẩm được', error);
        res.status(500).json({ message: error.message });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await categoriesController.deleteCategory(id);
        if (result) {
            return res.status(200).json({ message: 'Category deleted successfully' });
        } else {
            return res.status(404).json({ message: 'Category not found' });
        }
    } catch (error) {
        console.log("Lỗi: ", error);
        res.status(500).json({ mess: error });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const cate = await categoriesController.getDetailCategory(id);
        return res.status(200).json(cate)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})

router.put('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const result = await categoriesController.edit_category(id, body);
        return res.status(200).json(result);
    } catch (error) {
        console.log("Lỗi: ", error);
        throw error;
    }
});

module.exports = router;