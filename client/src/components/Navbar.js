import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert("Logged out successfully!");
    navigate('/auth');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">🏠 Generate</Link>
      <Link to="/saved" className="nav-link">📖 Saved</Link>

      {user ? (
        <button onClick={handleLogout} className="nav-btn">🚪 Logout</button>
      ) : (
        <Link to="/auth" className="nav-link">⬅️ Back to Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
