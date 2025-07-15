import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import './Saved.css';

const Saved = () => {
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.warn('User not authenticated.');
          return;
        }

        const res = await axios.get('http://ai-recipe-generator-tracker.onrender.com/api/recipes/saved', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRecipes(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error('Failed to fetch saved recipes:', err);
      }
    };

    fetchSaved();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filteredRecipes = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query)
    );

    setFiltered(filteredRecipes);
  };

  return (
    <div className="saved-container">
      <h1 className="saved-heading">
        <span className="icon">📚</span> Saved Recipes
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <input
          type="text"
          placeholder="🔍 Search recipes by title..."
          value={search}
          onChange={handleSearch}
          style={{
            padding: '0.7rem 1rem',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '1rem',
            outlineColor: '#facc15',
          }}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="saved-message">No matching recipes found.</p>
      ) : (
        <div className="recipes-grid">
          {filtered.map((r) => (
            <RecipeCard key={r._id} title={r.title} content={r.content} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;
