import React, { useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './Home.css';

const Home = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateRecipe = async (e) => {
    e.preventDefault();
    if (!ingredients) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/recipes/generate', {
        ingredients: ingredients.split(',').map(i => i.trim())
      });
      setRecipe(res.data);
    } catch (err) {
      console.error(err);
      setRecipe({ title: 'Error', content: 'Failed to generate recipe.' });
    }
    setLoading(false);
  };

  const saveRecipe = async () => {
    try {
      await axios.post('http://localhost:5000/api/recipes/save', {
        title: recipe.title,
        content: recipe.content,
        ingredients: ingredients.split(',').map(i => i.trim())
      });
      alert('Recipe saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save recipe.');
    }
  };

  return (
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-heading"><span className="icon">🍽️</span> AI-Powered Recipe Generator</h1>


        <form onSubmit={generateRecipe} className="form-card">
          <label>Enter ingredients (comma-separated)</label>
          <textarea
            className="ingredients-input"
            rows={3}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="generate-btn"
          >
            🍳 Generate Recipe
          </button>
        </form>

        {loading && <p className="loading-message">Generating...</p>}
        {recipe && <RecipeCard title={recipe.title} content={recipe.content} onSave={saveRecipe} />}
            </div>
    </div>
  );
};

export default Home;