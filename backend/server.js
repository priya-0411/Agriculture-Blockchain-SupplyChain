require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Agriculture Blockchain Supply Chain API' });
});

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Product Routes
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// Pinata + Blockchain Routes
const pinataRoutes = require('./routes/pinata');
app.use('/api/pinata', pinataRoutes);

// Distributor Routes
const distributorRoutes = require('./routes/distributor');
app.use('/api/distributor', distributorRoutes);

// Retailer Routes
const retailerRoutes = require('./routes/retailer');
app.use('/api/retailer', retailerRoutes);

// MongoDB Connection and Server Start
const startServer = async () => {
  const mongoUri = process.env.MONGO_URI;
  if (mongoUri) {
    try {
      await mongoose.connect(mongoUri, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log('Connected to MongoDB successfully');
      // Drop legacy email index (schema now uses mobile)
      const User = require('./models/User');
      await User.collection.dropIndex('email_1').catch(() => {});
    } catch (error) {
      console.warn('MongoDB connection failed (server will still run):', error.message);
    }
  } else {
    console.warn('MONGO_URI not set - using demo mode');
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
