import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store';
import { notification } from 'antd'; // Import notification

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [quantity, setQuantity] = useState(1); // State untuk jumlah produk

  // Fungsi untuk menampilkan popup detail produk
  const handleShowDetail = () => {
    setShowDetail(true);
    document.body.style.overflow = 'hidden'; // Disable scroll
  };

  // Fungsi untuk menutup popup
  const handleCloseDetail = () => {
    setShowDetail(false);
    document.body.style.overflow = 'auto'; // Enable scroll
  };

  // Fungsi untuk mengatur quantity
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Fungsi untuk menampilkan notifikasi
  const showNotification = () => {
    notification.success({
      message: 'Berhasil Ditambahkan!',
      description: `${product.title} berhasil ditambahkan ke cart.`,
      placement: 'topRight',
      duration: 3,
    });
  };

  return (
    <>
      {/* Card Produk */}
      <div 
        className="card shadow-sm position-relative" 
        style={{ cursor: 'pointer', height: '100%' }}
        onClick={handleShowDetail}
      >
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.title} 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-truncate">
            {product.title.length > 20 ? `${product.title.substring(0, 20)}...` : product.title}
          </h6>
          <p className="mb-2"><strong>${product.price.toFixed(2)}</strong></p>
          <p className="text-muted mb-2">Rating: {product.rating.rate}</p>
          <button 
            className="btn btn-primary mt-auto" 
            onClick={(e) => {
              e.stopPropagation(); // Mencegah popup muncul saat tombol diklik
              dispatch(addToCart({ ...product, quantity: 1 })); // Menambahkan ke cart dengan quantity 1
              showNotification(); // Menampilkan notifikasi
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Popup Detail Produk */}
      {showDetail && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1051,
          }}
        >
          <div 
            className="bg-white p-4 rounded shadow-lg" 
            style={{ width: '400px', position: 'relative' }}
          >
            <button 
              className="btn-close position-absolute top-0 end-0 m-2" 
              onClick={handleCloseDetail}
              aria-label="Close"
            ></button>
            <img 
              src={product.image} 
              alt={product.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <h5 className="mt-3">{product.title}</h5>
            <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
            <p><strong>Rating:</strong> {product.rating.rate}</p>
            <div className="d-flex align-items-center mt-3">
              <button 
                className="btn btn-secondary me-2" 
                onClick={handleDecrement}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                className="btn btn-secondary ms-2" 
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
            <button 
              className="btn btn-success w-100 mt-3" 
              onClick={() => {
                dispatch(addToCart({ ...product, quantity })); // Mengirimkan quantity yang benar
                showNotification(); // Menampilkan notifikasi
                handleCloseDetail();
              }}
            >
              Add {quantity} to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
