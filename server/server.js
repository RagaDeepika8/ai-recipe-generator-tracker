require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const app = express();
app.use(cors({
  origin: 'https://ragadeepika8.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Optional: Handle preflight
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://ragadeepika8.github.io');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Basic test route
app.get("/:", (req, res) => res.send("API Running"));

app.use('/api/recipes', recipeRoutes); // ✅ mount router at this path
app.use('/api/auth', authRoutes);      // ✅ mount auth router

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

