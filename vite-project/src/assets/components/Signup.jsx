// SignUp.js

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'; // Import your custom CSS file
import url from "../../details"
import { NavLink } from 'react-router-dom';


const SignUp = () => {

  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    // Basic email validation, you may want to enhance it
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    // Make a POST request to your backend API with formData
    try {
      const response = await fetch(`${url}`+"signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Successful signup, you can redirect or perform any other action
        console.log('Signup successful!');
      } else {
        // Handle error from the backend
        console.error('Signup failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow signup-form">
        <h2 className="mb-4">Sign Up</h2>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input
            type="text"
            className={`form-control ${emailError ? 'is-invalid' : ''}`}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSignUp}
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Click to Sign Up"
        >
          Sign Up
        </button>
      </div>
      <p>Already have account ? <NavLink to={"/login"}  >Login</NavLink>

      </p>
     
    </div>
  );
};

export default SignUp;
