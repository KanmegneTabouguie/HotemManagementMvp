// index.js

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const db = require('./config/db');

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Database connected');
    }
});

// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
