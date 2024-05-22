const authMiddleware = async (req, res, next) => {
    const sessionToken = req.headers.authorization;

    if (!sessionToken) {
        console.log('No session token found in the request headers');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        console.log('Verifying session token...');
        // Here, you might implement logic to verify the session token
        // For simplicity, let's assume the token is valid if it exists

        // Simulated token verification by checking if it exists
        if (!sessionTokenExists(sessionToken)) {
            console.log('Invalid session token');
            return res.status(401).json({ message: 'Invalid session token' });
        }

        console.log('Session token verified successfully');

        // Extract user information from the session token
        const decodedToken = decodeSessionToken(sessionToken);
        req.userId = decodedToken.userId;
        req.userRole = decodedToken.role;

        console.log('User ID:', req.userId);
        console.log('User Role:', req.userRole);

        // Access control based on user role
        if (req.userRole === 'admin') {
            console.log('Admin access granted');
            next();
        } else if (req.userRole === 'guest') {
            console.log('Guest access granted');
            next();
        } else {
            console.log('Access forbidden');
            return res.status(403).json({ message: 'Access forbidden' });
        }
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        return res.status(401).json({ message: 'Invalid session token' });
    }
};

// Simulated function to check if the session token exists
function sessionTokenExists(token) {
    // Implement logic to check if the token exists (e.g., check in a database or cache)
    // For demonstration purposes, we assume it exists
    return true;
}

// Simulated function to decode the session token
function decodeSessionToken(token) {
    // Split the token string by space to get the token value
    const tokenValue = token.split(' ')[1];
    
    // Decode the token value from base64
    const decodedTokenValue = Buffer.from(tokenValue, 'base64').toString('utf-8');
    
    // Parse the decoded token value to get the user information
    const user = JSON.parse(decodedTokenValue);
    
    // Extract user ID and role from the decoded token value
    const { userId, role } = user;

    // Return the decoded user ID and role
    return {
        userId: userId,
        role: role
    };
}


module.exports = authMiddleware;

