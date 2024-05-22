const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authService = {
    signup: async (userData) => {
        const { username, email, password, role } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            User.createUser({ username, email, password: hashedPassword, role }, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    },

    login: async (email, password) => {
        const user = await User.findByEmail(email);
        if (!user) throw new Error('User not found');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        return token;
    }
};

module.exports = authService;
