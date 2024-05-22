const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

const secretKey = '71905540f68219e68d5ede31a7a9a07c50473fd1c6ecd9570952528a6549c485';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        console.log('No token found in the request headers');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await Blacklist.isTokenBlacklisted(token);
        if (isBlacklisted) {
            console.log('Token is blacklisted');
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        // Verify the token using the secret key
        console.log('Verifying token...');
        const decodedToken = jwt.verify(token, secretKey);
        console.log('Token verified successfully');

        req.userId = decodedToken.userId;
        req.userType = decodedToken.userType;

        // Access control based on user type
        if (req.userType === 'admin') {
            next();
        } else if (req.userType === 'guest') {
            next();
        } else {
            return res.status(403).json({ message: 'Access forbidden' });
        }
    } catch (error) {
        console.log('Error in authMiddleware:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
