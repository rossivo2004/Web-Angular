const express = require('express');
const router = express.Router();
const productsController = require('../controller/products.controller');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const authen = require('../middleware/authen');
const jwt = require('jsonwebtoken');

// Middleware setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../public/images/');
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const checkImg = (req, file, cb) => {
    if (!file.originalname.match(/\.(png|jpg|jpeg|webp|gif)$/)) {
        return cb(new Error('Vui lòng nhập đúng định dạng'));
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: checkImg });

router.post('/add', authen, upload.single('image_pr_1'), async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request Files:', req.file);

        const body = req.body;
        const file = req.file;

        if (file) {
            body.image_pr_1 = path.basename(file.filename);
            console.log(`File saved: ${body.image_pr_1}`);
        }

        await productsController.insertProduct(body);

        res.status(200).json({ message: 'Thêm sản phẩm thành công', product: body });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: error.message });
    }
});
    
// Route Handlers
router.get('/', async (req, res) => {
    try {
        const result = await productsController.getAllProduct(req.query);
        res.status(200).json({ products: result });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/admin_pr', authen, async (req, res) => {
    try {
        const result = await productsController.getAllProduct(req.query);
        res.status(200).json({ products: result });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/productsHot', async (req, res) => {
    try {
        const products = await productsController.getProductsHot();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productsController.getProductById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/discount/discountedProducts', async (req, res) => {
    try {
        const discountedProducts = await productsController.getDiscountedProducts();
        res.status(200).json(discountedProducts);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/tagname/:categoryTag', async (req, res) => {
    try {
        const { categoryTag } = req.params;
        const products = await productsController.getProductByCategoryTag(categoryTag);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products by category tag:', error);
        res.status(500).json({ message: 'An error occurred while fetching products by category tag' });
    }
});

router.get('/sanphamlienquan/:productid', async (req, res) => {
    try {
        const { productid } = req.params;
        const relatedProducts = await productsController.getRelatedProducts(productid);
        res.status(200).json(relatedProducts);
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/page/:page', async (req, res) => {
    try {
        const page = parseInt(req.params.page);
        const perPage = 2; // Products per page
        const products = await productsController.getProductsByPage(page, perPage);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching paginated products:', error);
        res.status(500).json({ message: error.message });
    }
});



router.delete('/delete/:id', authen, async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch the product to get the image filename
        const product = await productsController.getProductById(id);

        if (!product) {
            return res.status(404).json({ message: 'Sản phẩm không tồn tại' });
        }

        // Remove the product
        await productsController.removeProduct(id);

        // Delete the image file
        const imagePath = path.join(__dirname, '../public/images/', product.image_pr_1);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error deleting image file:', err);
                return res.status(500).json({ message: 'Lỗi xóa tệp hình ảnh' });
            }

            res.status(200).json({ message: "Xóa sản phẩm thành công" });
        });
    } catch (error) {
        console.error("Error: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.put('/edit/:id', authen, async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        const updatedProduct = await productsController.updateByIdProduct(id, body);
        res.status(200).json({ ProductUpdate: updatedProduct });
    } catch (error) {
        console.error("Error updating product by id: ", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { keyword } = req.query;
        const products = await productsController.searchProduct(keyword);
        res.status(200).json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ message: 'An error occurred while searching for products' });
    }
});
router.post('/refresh-token', async (req, res, next) => {
try {
    let { refresh_token } = req.body;
    const data = jwt.verify(refresh_token, 'shhhhhh');
    const access_token = jwt.sign({user: data.user}, 'shhhhhh', {expiresIn: 1 * 60});
    refresh_token = jwt.sign({user: data.user}, 'shhhhhh', {expiresIn: 90 * 24 * 60 * 60});
    res.status(200).json({user: data.user, access_token, refresh_token })
} catch (error) {
    res.status(414).json({error: error.message})
}
})

module.exports = router;
