import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionHelper from 'utils/SessionHelper';
import DjangoClient from 'utils/DjangoClient';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let okCallback = (data) => {
        console.log(data);
        onLogin();
        SessionHelper.open();
        SessionHelper.setToken(data.token);
        navigate('/home');
    };
    let errorCallback = (error) => {
        console.log(error);
        alert('Invalid credentials');
    };
    let body = {"user_name": username, "password": password};
    let client = new DjangoClient();
    client.post("tokens/create", okCallback, errorCallback, body);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;

