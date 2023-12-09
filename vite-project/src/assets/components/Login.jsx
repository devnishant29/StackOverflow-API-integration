// Login.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import url from "../../details"
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${url}`+"login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data)

        if (data.status === 1) {
          // Login successful
          localStorage.setItem('Id', data.data._id);
          localStorage.setItem('UserName', data.data.firstName);
          setLoginError(null);
          console.log('Login successful! User ID:', data.data._id);
          console.log('Login successful! User Name:', data.data.firstName);
          navigate("/home");
        } else {
          // Login failed
          setLoginError(data.message);
          console.error('Login failed:', data.message);
        }
      } else {
        // Handle non-OK response
        setLoginError('Server error. Please try again.');
        console.error('Server error:', response.statusText);
      }
    } catch (error) {
      // Handle fetch error
      setLoginError('An error occurred. Please try again.');
      console.error('Fetch error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow" style={{ width: '500px', height: '400px' }}>
        <h2 className="mb-4">Login</h2>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <button
          className="btn btn-primary"
          onClick={handleLogin}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Click to Login"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
