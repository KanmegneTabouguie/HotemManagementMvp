// controllers/authController.js
const authService = require('../services/authService');

exports.signup = async (req, res, next) => {
    try {
        const user = await authService.signup(req.body);
        res.json({ message: 'Signup successful', user });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const token = await authService.login(req.body);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

exports.logout = async (req, res, next) => {
    try {
        // Perform logout actions (e.g., invalidate token)
        res.json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }
};
