import express from "express";
import pool from "../config/database.js";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// === HELPER: Decode Base64 and Save to Disk ===
const saveBase64Image = (base64String) => {
  try {
    // base64String looks like: "data:image/png;base64,iVBORw0KGgo..."
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    
    if (!matches || matches.length !== 3) {
      return null;
    }

    const type = matches[1]; // e.g. "image/jpeg"
    const data = matches[2]; // The binary data string
    const buffer = Buffer.from(data, 'base64');
    
    // Create filename: timestamp-random.extension
    const extension = type.split('/')[1];
    const filename = `${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
    
    fs.writeFileSync(path.join(uploadDir, filename), buffer);
    return filename;
  } catch (e) {
    console.error("Image save error:", e);
    return null;
  }
};

// === POST: Create Property ===
router.post("/", async (req, res) => {
  try {
    const {
      title, description, type, status, price, 
      address, city, state, zip_code,
      bedrooms, bathrooms, area_sqft, year_built, parking_spaces, 
      features, 
      images, // Expecting Array of Base64 strings
      agent_name, agent_email, agent_phone
    } = req.body;

    // 1. Process Images
    const savedImageNames = [];
    if (images && Array.isArray(images)) {
      images.forEach(imgStr => {
        const filename = saveBase64Image(imgStr);
        if (filename) savedImageNames.push(filename);
      });
    }

    // 2. Process Features (Ensure proper JSON)
    let featuresJSON = JSON.stringify([]);
    if (Array.isArray(features)) {
      featuresJSON = JSON.stringify(features);
    } else if (typeof features === 'string') {
      featuresJSON = JSON.stringify(features.split(',').map(f => f.trim()));
    }

    // 3. Insert into Database
    const [result] = await pool.execute(
      `INSERT INTO properties 
      (title, description, type, status, price, address, city, state, zip_code,
       bedrooms, bathrooms, area_sqft, year_built, parking_spaces, images, features,
       agent_name, agent_email, agent_phone)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title, description, type, status, price, 
        address, city, state, zip_code,
        bedrooms, bathrooms, area_sqft, year_built, parking_spaces, 
        JSON.stringify(savedImageNames), // Store ["file1.jpg", "file2.png"]
        featuresJSON,
        agent_name, agent_email, agent_phone
      ]
    );

    res.status(201).json({ message: "Property created", id: result.insertId });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

// === GET: Get All Properties with Filters ===
router.get("/", async (req, res) => {
  try {
    const { type, status, city, minPrice, maxPrice, bedrooms, search } = req.query;
    
    // Start building the query
    let query = "SELECT * FROM properties WHERE 1=1";
    const params = [];

    // Add filters dynamically
    if (type) {
      query += " AND type = ?";
      params.push(type);
    }

    if (status) {
      query += " AND status = ?";
      params.push(status);
    }

    if (city) {
      query += " AND city LIKE ?";
      params.push(`%${city}%`);  // Partial match for city
    }

    if (minPrice) {
      query += " AND price >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += " AND price <= ?";
      params.push(Number(maxPrice));
    }

    if (bedrooms) {
      query += " AND bedrooms >= ?";
      params.push(Number(bedrooms));
    }

    if (search) {
      query += " AND (title LIKE ? OR description LIKE ? OR address LIKE ?)";
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Add ordering
    query += " ORDER BY created_at DESC";

    // Execute query with parameters (prevents SQL injection)
    const [rows] = await pool.execute(query, params);
    res.json(rows);

  } catch (error) {
    console.error("Filter query error:", error);
    res.status(500).json({ error: error.message });
  }
});

// === GET: Get Single Property by ID ===
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if ID is valid
    if (!id) {
        return res.status(400).json({ error: "Invalid ID" });
    }

    // Execute Query
    const [rows] = await pool.execute("SELECT * FROM properties WHERE id = ?", [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Property not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("GET PROPERTY ERROR 👉", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
