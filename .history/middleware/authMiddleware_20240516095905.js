const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Authorization header not found in the request headers');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = {
            userId: decodedToken.userId,
            role: decodedToken.role
        };

        console.log('Decoded Token:', decodedToken);

        // Routes accessible to both guests and admins
        if (decodedToken.role === 'admin' || decodedToken.role === 'guest') {
            console.log('Access granted');
            next();
        } else {
            console.log('Access forbidden');
            return res.status(403).json({ message: 'Access forbidden' });
        }
    } catch (error) {
        console.log('Invalid or expired token', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

// Middleware to restrict access to admin-only routes
const adminMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.log('Authorization header not found in the request headers');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);

        req.user = {
            userId: decodedToken.userId,
            role: decodedToken.role
        };

        console.log('Decoded Token:', decodedToken);

        if (decodedToken.role === 'admin') {
            console.log('Admin access granted');
            next();
        } else {
            console.log('Access forbidden. Admin role required.');
            return res.status(403).json({ message: 'Access forbidden. Admin role required.' });
        }
    } catch (error) {
        console.log('Invalid or expired token', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authMiddleware, adminMiddleware };
