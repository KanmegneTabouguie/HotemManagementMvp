// routes/protectedRoute.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.get('/protected', authMiddleware, (req, res) => {
    // This route is protected and can only be accessed if the token is valid
    // req.userId will contain the user ID extracted from the token
    res.status(200).json({ message: 'Protected route accessed successfully' });
});

module.exports = router;
