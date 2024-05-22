const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

// Replace 'your_secret_key' with the generated key
const secretKey = '71905540f68219e68d5ede31a7a9a07c50473fd1c6ecd9570952528a6549c485';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        console.log('Verifying token...');
        // Check if the token is blacklisted
        const isBlacklisted = await Blacklist.isTokenBlacklisted(token);
        console.log('Is token blacklisted:', isBlacklisted);

        if (isBlacklisted === undefined || isBlacklisted === null) {
            // Handle case where isBlacklisted is not iterable or not defined
            console.error('Error: isBlacklisted is not defined or not iterable');
            throw new Error('Error checking token blacklist');
        }

        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        // Verify the token using the generated secret key
        console.log('Decoding token...');
        const decodedToken = jwt.verify(token, secretKey);
        console.log('Decoded token:', decodedToken);

        req.userId = decodedToken.userId;
        req.userType = decodedToken.userType; // Assuming userType is included in the token payload

        // Access control based on user type
        if (req.userType === 'admin') {
            // Allow access to admin-only routes
            console.log('User is admin. Allowing access.');
            next();
        } else if (req.userType === 'guest') {
            // Allow access to guest-only routes
            console.log('User is guest. Allowing access.');
            next();
        } else {
            // For other user types, deny access
            console.error('Access forbidden for user:', req.userId);
            return res.status(403).json({ message: 'Access forbidden' });
        }
    } catch (error) {
        console.error('Error in authMiddleware:', error.message);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
