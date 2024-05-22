const authMiddleware = async (req, res, next) => {
    const sessionToken = req.headers.authorization;
    const userId = req.headers['x-userid']; // Changed to lowercase and using square brackets
    const userRole = req.headers['x-userrole']; // Changed to lowercase and using square brackets

    console.log('Session Token:', sessionToken);
    console.log('User ID:', userId);
    console.log('User Role:', userRole);

    if (!sessionToken || !userId || !userRole) {
        console.log('Session token, user ID, or user role not found in the request headers');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Routes accessible to both guests and admins
    if (userRole === 'admin' || userRole === 'guest') {
        console.log('Access granted');
        next();
    } else {
        console.log('Access forbidden');
        return res.status(403).json({ message: 'Access forbidden' });
    }
};

// Middleware to restrict access to admin-only routes
const adminMiddleware = async (req, res, next) => {
    const userRole = req.headers['x-userrole']; // Changed to lowercase and using square brackets

    console.log('User Role:', userRole);

    if (userRole === 'admin') {
        console.log('Admin access granted');
        next();
    } else {
        console.log('Access forbidden. Admin role required.');
        return res.status(403).json({ message: 'Access forbidden. Admin role required.' });
    }
};

module.exports = { authMiddleware, adminMiddleware };
