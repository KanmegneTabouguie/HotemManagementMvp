const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing cors middleware
const authRoutes = require('./routes/authRoutes');
const roomRoutes = require('./routes/roomRoutes'); // Import room routes
const userRoutes = require('./routes/userRoutes'); // Import user routes
const reservationRoutes = require('./routes/reservationRoutes'); // Import reservation routes


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
app.use('/', userRoutes); // Mount user routes at the root URL
app.use('/', reservationRoutes); // Mount reservation routes at the '/reservations' URL



const PORT = process.env.PORT || 3053;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
