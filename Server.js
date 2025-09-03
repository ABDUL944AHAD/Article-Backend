// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Routes
const articleRoutes = require('./routes/articleRoutes.js');
const newsletterRoutes = require('./routes/newsletterRoutes.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

// Admin creation script
const CreateAdminAccount = require('./scripts/admin');
require('./configuration/dbConfig.js'); // connect MongoDB

// Initialize app
const app = express();

// Middleware
app.use(express.json()); // parse JSON bodies
// ...existing code...
app.use(cors({
    origin: function (origin, callback) {
        const allowedOrigins = [
            'http://localhost:5173',
            'https://articlewrite.netlify.app'
        ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Instead of just error, log the blocked origin
            console.log('Blocked by CORS:', origin);
            callback(new Error('CORS not allowed for this origin'), false);
        }
    },
    credentials: true
}));


// Ensure admin exists on server start
CreateAdminAccount();

// Test route
app.get('/', (req, res) => {
    res.send('Hello from server');
});

// Routes
app.use('/articles', articleRoutes);      // article CRUD
app.use('/newsletter', newsletterRoutes); // newsletter subscription
app.use('/auth', authRoutes);             // signup/login
app.use('/admin', adminRoutes);           // admin dashboard

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
