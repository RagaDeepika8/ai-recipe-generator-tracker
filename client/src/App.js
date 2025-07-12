import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Saved from './pages/Saved';
import Navbar from './components/Navbar';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/"
          element={isAuthenticated ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/saved"
          element={isAuthenticated ? <Saved /> : <Navigate to="/auth" replace />}
        />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
