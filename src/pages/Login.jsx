import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('access_token', 'Token_Berhasil_Login');
      navigate('/'); // Navigasi ke halaman Home
    } else {
      alert('Please enter valid username and password');
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Login Page</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '10px', margin: '10px' }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '10px', margin: '10px' }}
        />
      </div>
      <div>
        <button onClick={handleLogin} style={{ padding: '10px 20px' }}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
