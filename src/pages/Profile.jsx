import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, notification } from 'antd';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: '',
    photo: ''
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('profile'));
    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const handleLogout = () => {
    // Hapus token dari localStorage
    localStorage.removeItem('access_token');
    // Menampilkan notifikasi logout sukses
    notification.success({
      message: 'Berhasil Logout',
      description: 'Anda telah berhasil logout.',
    });
    // Redirect ke halaman utama (Home)
    navigate('/');
  };

  const handleShowLogoutModal = () => {
    setIsModalVisible(true); // Menampilkan modal konfirmasi logout
  };

  const handleCancelLogout = () => {
    setIsModalVisible(false); // Menutup modal konfirmasi
  };

  const handleConfirmLogout = () => {
    setIsModalVisible(false); // Menutup modal konfirmasi
    handleLogout(); // Logout dan redirect
  };

  const handleEdit = () => {
    // Menyimpan perubahan ke localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Halaman Profile</h1>
      <p>Selamat datang di halaman profile Anda.</p>

      {/* Menampilkan foto profil */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src={profile.photo || 'https://via.placeholder.com/150'}
          alt="Profile"
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px',
          }}
        />
      </div>

      {/* Form untuk mengedit profile */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Nama"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          style={inputStyle}
        />
        <input
          type="text"
          name="address"
          value={profile.address}
          onChange={handleChange}
          placeholder="Alamat"
          style={inputStyle}
        />
      </div>

      {/* Tombol Edit dan Simpan */}
      <button
        onClick={handleEdit}
        style={buttonStyle}
      >
        Simpan Perubahan
      </button>

      {/* Tombol Logout */}
      <button
        onClick={handleShowLogoutModal}
        style={{ ...buttonStyle, backgroundColor: '#ff5733', marginTop: '20px' }}
      >
        Logout
      </button>

      {/* Modal Konfirmasi Logout */}
      <Modal
        title="Konfirmasi Logout"
        visible={isModalVisible}
        onOk={handleConfirmLogout}
        onCancel={handleCancelLogout}
        okText="Ya"
        cancelText="Tidak"
      >
        <p>Apakah Anda yakin ingin logout?</p>
      </Modal>
    </div>
  );
};

// Gaya untuk tombol dan input
const buttonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  marginTop: '20px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  margin: '5px',
  borderRadius: '5px',
  width: '100%',
  maxWidth: '300px',
  border: '1px solid #ddd',
};

export default Profile;
