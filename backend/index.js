var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var app = express();

const productRouter = require('../backend/router/products.router');
const categoryRouter = require('../backend/router/categories.router');
const orderRouter = require('../backend/router/order.router');
const userRouter = require('../backend/router/users.router');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Web_Food')
    .then(() => console.log('Kết nối thành công'))
    .catch((err) => console.log('Thất bại: ', err))

app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders', orderRouter);
app.use('/users', userRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.sendFile(path.join(__dirname, 'public', 'error.html'));
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


module.exports = app;
