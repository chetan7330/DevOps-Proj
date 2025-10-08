const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

const studentRoutes = require('./routes/studentRoutes');
// Changed base path to '/students' to match frontend fetch URLs
app.use('/students', studentRoutes);

module.exports = app;
