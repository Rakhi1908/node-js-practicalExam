import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import './style.css';

export default function Login() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  async function Adduser(e) {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3333/login', { email, password });
      if (response.status === 200) {
        alert('User Found');
        navigate(`/page/?${email}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert('User not found');
      } else {
        alert('Something went wrong');
      }
    }
  }

  return (
    <div className="login-container">
      <h3>Login</h3>
      <form onSubmit={Adduser}>
        <input type="text" name="email" placeholder="Enter Email" onChange={(e) => setemail(e.target.value)} />
        <input type="password" name="password" placeholder="Enter Password" onChange={(e) => setpassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
