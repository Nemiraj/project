import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import propertyRoutes from './routes/properties.js';
import enquiryRoutes from './routes/enquiries.js';
import authRoutes from './routes/auth.js';
import newLaunchRoutes from "./routes/newLaunchController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* =====================================================
   FIX FOR __dirname (ES MODULE)
===================================================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =====================================================
   1. MIDDLEWARE
===================================================== */
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

/* =====================================================
   2. STATIC FILES
===================================================== */

// Uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// React build folder
app.use(express.static(path.join(__dirname, "client", "dist")));

/* =====================================================
   3. API ROUTES
===================================================== */
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/new-launches', newLaunchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

/* =====================================================
   4. FRONTEND FALLBACK (VERY IMPORTANT)
===================================================== */
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

/* =====================================================
   5. ERROR HANDLING
===================================================== */
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR STACK:", err.stack);
  res.status(500).json({
    error: err.message || 'Something went wrong!',
    type: err.name
  });
});

/* =====================================================
   6. START SERVER
===================================================== */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
