import React, { useState } from 'react';
import axios from 'axios';
import './IngredientInput.css'; // Add this line

const IngredientInput = ({ setRecipe }) => {
  const [ingredients, setIngredients] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ingredientList = ingredients.split(',').map(i => i.trim());

    const res = await axios.post('http://localhost:5000/api/recipes/generate', {
      ingredients: ingredientList
    });

    setRecipe(res.data);
  };

  return (
    <form onSubmit={handleSubmit} className="ingredient-form">
      <label htmlFor="ingredient-textarea" className="ingredient-label">
        🥕 Enter ingredients (comma-separated)
      </label>
      <textarea
        id="ingredient-textarea"
        placeholder="e.g., tomato, onion, garlic"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        className="ingredient-textarea"
        rows={4}
        required
      />
      <button type="submit" className="ingredient-button">🍳 Generate Recipe</button>
    </form>
  );
};

export default IngredientInput;
