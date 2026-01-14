import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

// GET all enquiries
router.get('/', async (req, res) => {
  try {
    const [enquiries] = await pool.execute(
      'SELECT e.*, p.title as property_title, p.city FROM enquiries e JOIN properties p ON e.property_id = p.id ORDER BY e.created_at DESC'
    );
    res.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST create enquiry
router.post('/', async (req, res) => {
  try {
    const { property_id, name, email, phone, message } = req.body;

    const [result] = await pool.execute(
      'INSERT INTO enquiries (property_id, name, email, phone, message) VALUES (?, ?, ?, ?, ?)',
      [property_id, name, email, phone, message]
    );

    const [enquiry] = await pool.execute(
      'SELECT * FROM enquiries WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(enquiry[0]);
  } catch (error) {
    console.error('Error creating enquiry:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET enquiries by property ID
router.get('/property/:propertyId', async (req, res) => {
  try {
    const { propertyId } = req.params;
    const [enquiries] = await pool.execute(
      'SELECT * FROM enquiries WHERE property_id = ? ORDER BY created_at DESC',
      [propertyId]
    );
    res.json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;




