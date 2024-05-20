const express = require('express');
const router = express.Router();
const productsController = require('../controller/products.controller');
const path = require('path');
const multer = require('multer');

router.get('/', async (req, res) => {
    try {
        const products = await productsController.getAllProduct();
        return res.status(200).json(products);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
});

router.get('/productsHot', async (req, res) => {
    try {
        const products = await productsController.getProductsHot();
        return res.status(200).json(products);
    } catch (error) {
        console.log("loi: ", error);
        res.status(500).json({ mess: error });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const pro = await productsController.getProductById(id);
        return res.status(200).json(pro)
    } catch (error) {
        console.log("lỗi: ", error);
        throw error
    }
})

//lấy sản phẩm sale ngẫu nhiên
router.get('/discount/discountedProducts', async (req, res) => {
    try {
        const discountedProducts = await productsController.getDiscountedProducts();
        return res.status(200).json(discountedProducts);
    } catch (error) {
        console.log("Lỗi: ", error);
        res.status(500).json({ mess: error });
    }
});

// lấy sản phẩm theo tag
router.get('/tagname/:categoryTag', async (req, res) => {
    try {
        const categoryTag = req.params.categoryTag; // Lấy giá trị categoryTag từ tham số URL
        const products = await productsController.getProductByCategoryTag(categoryTag);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi khi lấy sản phẩm theo category tag:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy sản phẩm theo category tag' });
    }
});


//Lấy danh sách sản phẩm liên quan với sản phẩm hiển thị ở trang chi tiết
router.get('/sanphamlienquan/:productid', async (req, res) => {
    try {
        const productId = req.params.productid; // Lấy productId từ URL
        const result = await productsController.getRelatedProducts(productId); // Truyền productId vào hàm
        return res.status(200).json(result);
    } catch (error) {
        console.log("Lỗi: ", error);
        res.status(500).json({ error: error.message }); // Trả về lỗi 500 nếu có lỗi xảy ra
    }
});

router.get('/page/:page', async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const perPage = 2; // Số lượng sản phẩm trên mỗi trang
        const products = await productsController.getProductsByPage(page, perPage);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// thêm sản phẩm
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

router.post('/add', upload.fields([
    { name: 'image_pr_1', maxCount: 1 },
    // { name: 'image_pr_2', maxCount: 1 },
    // { name: 'image_pr_3', maxCount: 1 },
    // { name: 'image_pr_4', maxCount: 1 },
    // { name: 'image_pr_5', maxCount: 1 }
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

        const result = await productsController.insertProduct(body);
        // Tiếp tục xử lý thông tin sản phẩm
        // Gọi hàm insertProduct từ productController và xử lý kết quả

        // Chuỗi HTML chứa mã JavaScript để hiển thị cửa sổ cảnh báo
        const alertScript = `
            <script>
                alert('Thêm sản phẩm thành công');
                window.location.href = 'http://localhost:1234/admin_product';
            </script>
        `;

        // Gửi cảnh báo và chuyển hướng về trang http://localhost:1234/admin_product
        res.send(alertScript);
    } catch (error) {
        console.log('Không thêm sản phẩm được', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const proDel = await productsController.removeProduct(id);
        return res.status(200).json({ message: "Xóa sản phẩm thành công" });
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
        const proUpdate = await productsController.updateByIdProduct(id, body)
        return res.status(200).json({ ProductUpdate: proUpdate })
    } catch (error) {
        console.log("Lỗi cập nhật product theo id: ", error);
        return res.status(500).json({ mess: error })
    }
});

router.get('/search/:keyword', async function (req, res) {
    try {
        const { keyword } = req.params;
        const products = await productsController.searchProduct(keyword);
        return res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi khi tìm kiếm sản phẩm:', error);
        res.status(500).send('Đã xảy ra lỗi khi tìm kiếm sản phẩm');
    }
});

module.exports = router;
