require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');




const app = express();
app.use(cors({
  origin: 'https://RagaDeepika8.github.io',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.options('*', cors()); // Enable preflight across all routes

app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Basic test route
app.get("/", (req, res) => res.send("API Running"));

app.use('/api/recipes', recipeRoutes);
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

