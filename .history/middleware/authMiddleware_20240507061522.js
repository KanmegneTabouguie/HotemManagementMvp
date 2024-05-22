const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decodedToken = jwt.verify(token, '922da06d39fddd27efe159bcecbd2db3c5c0f71c2e5b898559497c34d9c459e0');
        req.userId = decodedToken.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

const decodedToken = jwt.verify(token, '922da06d39fddd27efe159bcecbd2db3c5c0f71c2e5b898559497c34d9c459e0');

