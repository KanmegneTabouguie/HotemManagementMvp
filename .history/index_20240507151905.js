const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing cors middleware
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Import room routes


const app = express();

// Middleware
app.use(express.json());
// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors()); // Using cors middleware

// Routes
app.use('/auth', authRoutes);
app.use('/', roomRoutes); // Mount room routes at the root URL


const PORT = process.env.PORT || 3024;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
