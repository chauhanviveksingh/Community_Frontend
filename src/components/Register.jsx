import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function Register() {
  const [formData, setFormData] = useState({ username: '', password: '', role: 'resident' });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
     const resp=await api.post('/auth/register', formData);
     console.log(resp);
      navigate('/login');
    } catch (error) {
      console.log(error)
      console.error('Registration failed:', error.response?.data);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="username" placeholder="Username" onChange={handleInputChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
      <select name="role" onChange={handleInputChange} required>
      <option value="Not selected">Not selected</option> 
        <option value="ADMIN">Admin</option>
        <option value="RESIDENT">Resident</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
