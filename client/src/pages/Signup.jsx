import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Importing Link and useNavigate
import '../styles/formStyle.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api/users/register', {
        email,
        password,
      });
      console.log('User registered:', response.data);
      
      // Redirect to dashboard upon successful registration
      navigate('/dashboard'); // Replace '/dashboard' with the actual route to your dashboard
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error registering');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleRegister}>
        <h1>Sign-Up for CareerPilot</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /> <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /> <br />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>
        Already a user?{' '}
        <Link to="/" className="login-link">Login</Link>
      </p>
    </div>
  );
};

export default Register;
