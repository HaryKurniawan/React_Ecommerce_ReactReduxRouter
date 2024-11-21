import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notification } from 'antd';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Menampilkan notifikasi saat memasuki halaman login
  useEffect(() => {
    notification.info({
      message: 'Masukkan username dan password',
      description: 'Masukkan huruf atau kata apapun untuk login.',
      placement: 'top',
      duration: 3, // Durasi notifikasi
      onClose: () => {}, // Menambahkan tombol close di notifikasi
    });
  }, []);

  const handleLogin = () => {
    if (username && password) {
      // Simulasi login berhasil
      localStorage.setItem('access_token', 'Token_Berhasil_Login');
      notification.success({
        message: 'Berhasil Masuk',
        description: 'Login berhasil, selamat datang!',
        placement: 'top',
        duration: 3, // Durasi notifikasi
      });
      navigate('/'); // Navigasi ke halaman Home
    } else {
      notification.error({
        message: 'Gagal Login',
        description: 'Masukkan username dan password yang valid.',
        placement: 'top',
        duration: 3, // Durasi notifikasi
      });
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
