import express from "express";
import pool from '../config/database.js';

const router = express.Router();

/* ==============================
   GET ALL NEW LAUNCH PROJECTS
============================== */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT * 
       FROM new_launches 
       WHERE is_active = 1 
       ORDER BY created_at DESC`
    );

    res.json(rows);
  } catch (error) {
    console.error("New Launch Error:", error);
    res.status(500).json({
      message: "Failed to fetch new launch projects",
    });
  }
});

export default router;
