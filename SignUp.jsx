import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './style.css';

export default function SignUp() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const navigate = useNavigate();

  async function Adduser(e) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3333/adduser', { email, password });
      alert('User Added');
      navigate('/Login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup-container">
      <h3>Sign-up here</h3>
      <form onSubmit={Adduser}>
        <input
          type="text"
          name="email"
          placeholder="Enter Email"
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={(e) => setpassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
