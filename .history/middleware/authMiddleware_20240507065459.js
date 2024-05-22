const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await Blacklist.isTokenBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        const decodedToken = jwt.verify(token, '922da06d39fddd27efe159bcecbd2db3c5c0f71c2e5b898559497c34d9c459e0');
        req.userId = decodedToken.userId;
        req.userType = decodedToken.userType; // Assuming userType is included in the token payload

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

const decodedToken = jwt.verify(token, '922da06d39fddd27efe159bcecbd2db3c5c0f71c2e5b898559497c34d9c459e0');


