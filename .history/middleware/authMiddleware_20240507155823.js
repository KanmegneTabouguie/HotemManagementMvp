const authMiddleware = async (req, res, next) => {
    const sessionToken = req.headers.authorization;
    const userId = req.headers.userId;
    const userRole = req.headers.role;

    if (!sessionToken || !userId || !userRole) {
        console.log('Session token, user ID, or user role not found in the request headers');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    console.log('User ID:', userId);
    console.log('User Role:', userRole);

    if (userRole === 'admin') {
        console.log('Admin access granted');
        next();
    } else if (userRole === 'guest') {
        console.log('Guest access granted');
        next();
    } else {
        console.log('Access forbidden');
        return res.status(403).json({ message: 'Access forbidden' });
    }
};

module.exports = authMiddleware;
