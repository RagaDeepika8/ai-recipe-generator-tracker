// import { useState } from 'react';
// import axios from 'axios';
// import './Auth.css';

// const Auth = () => {
//   const [mode, setMode] = useState('login'); // 'login' or 'register'
//   const [form, setForm] = useState({ name: '', email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

//   try {
//     const res = await axios.post(url, form);

//     if (mode === 'register') {
//       alert('Registered successfully. Please log in.');
//       setMode('login'); // 🔁 switch to login mode after register
//     } else {
//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));
//       alert('Logged in as ' + res.data.user.name);
//       window.location.href = '/';
//     }
//   } catch (err) {
//     alert(err.response?.data?.error || 'Auth failed');
//   }
// };


//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h2 className="auth-heading">
//           {mode === 'login' ? 'Login' : 'Register'}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           {mode === 'register' && (
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               onChange={handleChange}
//               value={form.name}
//               required
//               className="auth-input"
//             />
//           )}
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             onChange={handleChange}
//             value={form.email}
//             required
//             className="auth-input"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             onChange={handleChange}
//             value={form.password}
//             required
//             className="auth-input"
//           />

//           <button type="submit" className="auth-btn">
//             {mode === 'login' ? 'Login' : 'Register'}
//           </button>
//         </form>

//         <p
//           onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
//           className="auth-toggle"
//         >
//           {mode === 'login'
//             ? 'New here? Register'
//             : 'Already have an account? Login'}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Auth;


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';


const Auth = ({ setIsAuthenticated }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
const API_BASE = 'https://your-render-backend.onrender.com';
  const handleSubmit = async (e) => {
  e.preventDefault();
  
const url = `${API_BASE}/api/auth/${mode}`;


  try {
    const res = await axios.post(url, form);

    if (mode === 'register') {
      alert('Registered! You can now log in.');
      setMode('login');
    } else {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setIsAuthenticated(true); 
      alert('Welcome, ' + res.data.user.name);
      // Delay redirect by next tick to let state settle
      navigate('/'); 
    }
  } catch (err) {
    alert(err.response?.data?.error || 'Auth failed');
  }
};


  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2 className="auth-heading">{mode === 'login' ? 'Login' : 'Register'}</h2>
        <form onSubmit={handleSubmit}>
          {mode === 'register' && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={form.name}
              required
              className="auth-input"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            className="auth-input"
          />
          <button type="submit" className="auth-btn">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>

        <p onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="auth-toggle">
          {mode === 'login' ? 'New here? Register' : 'Already have an account? Login'}
        </p>
      </div>
    </div>
  );
};

export default Auth;
