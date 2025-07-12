import React from 'react';
import axios from 'axios';
import './RecipeCard.css';

const RecipeCard = ({ title, content }) => {
  // Split the LLM output into ingredients and steps
  let ingredients = null;
  let steps = null;

  if (content) {
    const parts = content.split(/\n+/);
    const ingIdx = parts.findIndex((l) => /ingredient/i.test(l));
    const stepIdx = parts.findIndex((l) => /step/i.test(l) || /direction/i.test(l));

    if (ingIdx !== -1 && stepIdx !== -1 && stepIdx > ingIdx) {
      ingredients = parts.slice(ingIdx + 1, stepIdx).filter(Boolean);
      steps = parts.slice(stepIdx + 1).filter(Boolean);
    }
  }

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to save this recipe.');
      return;
    }

    try {
      const res = await axios.post(
        'http://localhost:5000/api/recipes/save',
        {
          title,
          content,
          ingredients: ingredients || ['N/A']
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(res.data.message || 'Recipe saved!');
    } catch (err) {
      console.error(err);
      alert('Failed to save recipe.');
    }
  };

  return (
    <div className="recipe-card">
      <h2>{title}</h2>

      {ingredients && (
        <>
          <p className="section-title">🧂 Ingredients</p>
          <ul className="ingredients-list">
            {ingredients.map((item, idx) => (
              <li key={idx}>✅ {item}</li>
            ))}
          </ul>
        </>
      )}

      {steps && (
        <>
          <p className="section-title">👨‍🍳 Steps</p>
          <ol className="steps-list">
            {steps.map((item, idx) => (
              <li key={idx}>➡️ {item}</li>
            ))}
          </ol>
        </>
      )}

      {!ingredients && !steps && <p>{content}</p>}

      <button onClick={handleSave} className="save-btn">
        💾 Save to Favorites
      </button>
    </div>
  );
};

export default RecipeCard;
