const express = require('express');
const cors = require('cors'); // Importing cors middleware
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Import room routes


const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Using cors middleware

// Routes
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});