// authen.js
const jwt = require('jsonwebtoken');
const axios = require('axios');
const JWT_SECRET = 'shhhhhh';

const authen = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;
            next();
        } else {
            res.status(401).json({ message: 'Access denied A' });
        }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token expired' });
        } else {
            res.status(401).json({ message: 'Invalid token' });
        }
    }
}

module.exports = authen;
