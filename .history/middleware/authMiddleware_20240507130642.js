const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

// Replace 'your_secret_key' with the generated key
const secretKey = '71905540f68219e68d5ede31a7a9a07c50473fd1c6ecd9570952528a6549c485';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    console.log('Token:', token); // Log the token
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await Blacklist.isTokenBlacklisted(token);
        console.log('Is blacklisted:', isBlacklisted); // Log if token is blacklisted
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        // Verify the token using the generated secret key
        const decodedToken = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decodedToken); // Log the decoded token
        req.userId = decodedToken.userId;
        req.userType = decodedToken.userType; // Assuming userType is included in the token payload

        // Access control based on user type
        if (req.userType === 'admin') {
            // Allow access to admin-only routes
            next();
        } else if (req.userType === 'guest') {
            // Allow access to guest-only routes
            next();
        } else {
            // For other user types, deny access
            return res.status(403).json({ message: 'Access forbidden' });
        }
    } catch (error) {
        console.error('Error verifying token:', error); // Log any errors
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
