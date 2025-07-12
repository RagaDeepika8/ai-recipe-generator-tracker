const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: String,
  content: String,
  ingredients: [String],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
