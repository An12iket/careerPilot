import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importing navigation helpers
import '../styles/formStyle.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      setToken(response.data.token); // Store the token (e.g., in localStorage)
      console.log('Login successful', response.data);
      // Redirect after successful login
      navigate('/dashboard'); // Change this to your desired route
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error logging in');
    }
  };

  return (
    <div className="container">
      <h1>CareerPilot</h1>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {token && <p className="success">Token: {token}</p>}
      {error && <p className="error">{error}</p>}
      <p>
        New user? then{' '}
        <Link to="/signup" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
