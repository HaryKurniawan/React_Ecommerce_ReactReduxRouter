import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../store"; // Pastikan toggleCart ada di store Anda
import './navbar.css'; // Import styling khusus

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("access_token");
  const cartCount = useSelector((state) => state.cart.items.length);
  const dispatch = useDispatch();

  // State untuk mengontrol visibility menu di tampilan mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Jika halaman saat ini adalah login, maka navbar tidak akan ditampilkan
  if (location.pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle menu saat hamburger diklik
  };

  // Fungsi untuk menambahkan kelas aktif pada menu
  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyStore</Link>
      </div>

      {/* Tombol Hamburger untuk mobile */}
      <div className="navbar-hamburger" onClick={toggleMenu}>
        &#9776; {/* Simbol hamburger */}
      </div>

      <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
        <Link to="/" className={isActive("/")}>Home</Link>
        <Link to="/about" className={isActive("/about")}>About</Link>

        {isLoggedIn ? (
          <>
            <Link to="/profile" className={isActive("/profile")}>Profile</Link>
            <button
              className="btn btn-cart"
              onClick={() => dispatch(toggleCart())}
            >
              Cart ({cartCount})
            </button>
          </>
        ) : (
          <button className="btn btn-login" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
