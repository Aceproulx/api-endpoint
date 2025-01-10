const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models/db');
const mahasiswaRouter = require('./controllers/mahasiswaController');

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Route for mahasiswa endpoints
app.use('/mahasiswa', mahasiswaRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
