const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET /mahasiswa
router.get('/', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (error, results) => {
    if (error) {
      console.error('Error fetching mahasiswa:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// GET /mahasiswa/:nim
router.get('/:nim', (req, res) => {
  const mahasiswaNim = req.params.nim;
  db.query('SELECT * FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error, results) => {
    if (error) {
      console.error('Error fetching mahasiswa:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Mahasiswa not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// POST /mahasiswa
router.post('/', (req, res) => {
  const { nim, nama, gender, prodi, alamat } = req.body;
  db.query(
    'INSERT INTO mahasiswa (nim, nama, gender, prodi, alamat) VALUES (?, ?, ?, ?, ?)',
    [nim, nama, gender, prodi, alamat],
    (error, results) => {
      if (error) {
        console.error('Error adding mahasiswa:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.status(201).json({ message: 'Mahasiswa added successfully', nim });
      }
    }
  );
});


// PUT /mahasiswa/:nim
router.put('/:nim', (req, res) => {
  const mahasiswaNim = req.params.nim;
  const { nama, gender, prodi, alamat } = req.body;
  db.query(
    'UPDATE mahasiswa SET nama = ?, gender = ?, prodi = ?, alamat = ? WHERE nim = ?',
    [nama, gender, prodi, alamat, mahasiswaNim],
    (error) => {
      if (error) {
        console.error('Error updating mahasiswa:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      } else {
        res.json('Updating mahasiswa Successfully');
      }
    }
  );
});

// DELETE /mahasiswa/:nim
router.delete('/:nim', (req, res) => {
  const mahasiswaNim = req.params.nim;
  db.query('DELETE FROM mahasiswa WHERE nim = ?', [mahasiswaNim], (error) => {
    if (error) {
      console.error('Error deleting mahasiswa:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      res.json({ message: 'Mahasiswa deleted successfully' });
    }
  });
});

module.exports = router;
