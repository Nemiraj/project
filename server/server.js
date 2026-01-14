import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // Import path

import propertyRoutes from './routes/properties.js';
import enquiryRoutes from './routes/enquiries.js';
import authRoutes from './routes/auth.js';
import newLaunchRoutes from "./routes/newLaunchController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =====================================================
// 1. MIDDLEWARE (THE FIX IS HERE)
// =====================================================
app.use(cors());

// ⚠️ REPLACE YOUR OLD app.use(express.json()) WITH THIS:
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// =====================================================
// 2. ROUTES
// =====================================================

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use("/api/new-launches", newLaunchRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// =====================================================
// 3. ERROR HANDLING
// =====================================================
app.use((err, req, res, next) => {
  console.error("🔥 SERVER ERROR STACK:", err.stack); // Log full error to terminal
  res.status(500).json({ 
    error: err.message || 'Something went wrong!',
    type: err.name // This will help debug if it happens again
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});