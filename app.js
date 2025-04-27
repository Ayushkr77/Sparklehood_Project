const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const incidentRoutes = require('./routes/incidentRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/incidents', incidentRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
.catch((err) => console.error('MongoDB connection error:', err));
