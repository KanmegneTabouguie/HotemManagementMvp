// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

// Assuming you have a global variable or module-level variable to store blacklisted tokens
let blacklist = new Set();

const authMiddleware = (req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.authorization.split(' ')[1]; // Assuming token is sent in the Authorization header
        
        // Check if the token is blacklisted
        if (blacklist.has(token)) {
            return res.status(401).json({ message: 'Unauthorized - Token is blacklisted' });
        }
        
        // Verify the token
        jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized - Invalid token' });
            } else {
                // Token is valid, proceed to the next middleware or route handler
                req.userId = decodedToken.userId;
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
