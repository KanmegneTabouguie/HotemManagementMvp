const jwt = require('jsonwebtoken');
const Blacklist = require('../models/blacklist');

// Generate a random secret key
const secretKey = jwt.sign({}, null, { expiresIn: '1h' });

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        // Check if the token is blacklisted
        const isBlacklisted = await Blacklist.isTokenBlacklisted(token);
        if (isBlacklisted) {
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        // Verify the token using the generated secret key
        const decodedToken = jwt.verify(token, secretKey);
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
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;