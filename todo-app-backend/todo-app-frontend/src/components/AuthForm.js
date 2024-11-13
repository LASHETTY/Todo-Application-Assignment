// src/components/AuthForm.js
import React, { useState } from 'react';
import { signup, login } from '../utils/api';

const AuthForm = ({ type }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authFunc = type === 'login' ? login : signup;
    const response = await authFunc(formData);
    if (response.error) {
      setError(response.error);
    } else {
      window.location.href = '/';
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">{type === 'login' ? 'Login' : 'Sign Up'}</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AuthForm;
