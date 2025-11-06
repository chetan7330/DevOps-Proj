require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const studentsRoutes = require('./routes/students');

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mydb';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/students', studentsRoutes);

// Default route
app.get('/', (req, res) => res.send('Backend API running ✅'));

// Connect MongoDB and start
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
