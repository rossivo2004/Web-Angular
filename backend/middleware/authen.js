const jwt = require('jsonwebtoken');

const authen = async (req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            const data = jwt.verify(token, 'shhhhhh');
            req.user = data.user;
            console.log('Authenticated user:', req.user);
            next();
        }else{
            res.status(401).json({ message: 'Access denied' });
        }
    } catch (error) {
        console.error('JWT Verification Error:', error);
        res.status(401).json({ message: 'Access denied' });
    }
}

module.exports = authen;
