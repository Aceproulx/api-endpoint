const express = require('express');
const router = express.Router();
const db = require('../models/db'); // Ensure this connects to your database

// GET /lecturers - Retrieve all lecturers
router.get('/', (req, res) => {
  db.query('SELECT * FROM lecturers', (error, results) => {
    if (error) {
      console.error('Error fetching lecturers:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// GET /lecturers/:id - Retrieve a lecturer by ID
router.get('/:id', (req, res) => {
  const lecturerId = req.params.id;
  db.query('SELECT * FROM lecturers WHERE id = ?', [lecturerId], (error, results) => {
    if (error) {
      console.error('Error fetching lecturer:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Lecturer not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// POST /lecturers - Add a new lecturer
router.post('/', (req, res) => {
  const { name, department, email, phone } = req.body;
  db.query(
    'INSERT INTO lecturers (name, department, email, phone) VALUES (?, ?, ?, ?)',
    [name, department, email, phone],
    (error, results) => {
      if (error) {
        console.error('Error adding lecturer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Lecturer added successfully', id: results.insertId });
      }
    }
  );
});

// PUT /lecturers/:id - Update an existing lecturer
router.put('/:id', (req, res) => {
  const lecturerId = req.params.id;
  const { name, department, email, phone } = req.body;
  db.query(
    'UPDATE lecturers SET name = ?, department = ?, email = ?, phone = ? WHERE id = ?',
    [name, department, email, phone, lecturerId],
    (error, results) => {
      if (error) {
        console.error('Error updating lecturer:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Lecturer not found' });
      } else {
        res.json({ message: 'Lecturer updated successfully' });
      }
    }
  );
});

// DELETE /lecturers/:id - Delete a lecturer by ID
router.delete('/:id', (req, res) => {
  const lecturerId = req.params.id;
  db.query('DELETE FROM lecturers WHERE id = ?', [lecturerId], (error, results) => {
    if (error) {
      console.error('Error deleting lecturer:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Lecturer not found' });
    } else {
      res.json({ message: 'Lecturer deleted successfully' });
    }
  });
});

module.exports = router;
