const express = require('express');
const cors = require('cors');
const app = express();
const lecturersRouter = require('./controllers/lecturersController');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/lecturers', lecturersRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
