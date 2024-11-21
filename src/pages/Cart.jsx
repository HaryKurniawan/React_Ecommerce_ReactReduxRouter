import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart, toggleCart } from '../store';

const Cart = () => {
  const { items, showCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // Hitung total harga
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  // Fungsi untuk mengatur transformasi cart saat dibuka atau ditutup
  const cartTransform = showCart ? 'translateX(0)' : 'translateX(100%)';

  return (
    <div
      className="position-fixed top-0 end-0 h-100 bg-light shadow"
      style={{
        width: '350px',
        transform: cartTransform,
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1050,
      }}
    >
      {/* Close Button */}
      <button
        className="btn-close position-absolute top-0 end-0 m-2"
        onClick={() => dispatch(toggleCart())}
        aria-label="Close"
      ></button>

      <div className="p-3 d-flex flex-column h-100">
        <h5>Shopping Cart</h5>
        <div className="flex-grow-1 overflow-auto">
          <ul className="list-group mb-3">
            {items.length > 0 ? (
              items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div style={{ flex: 1 }}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 3, marginLeft: '10px' }}>
                    <h6 className="mb-1">
                      {item.title.length > 25 ? item.title.slice(0, 25) + '...' : item.title}
                    </h6>
                    <p className="mb-0">${item.price.toFixed(2)}</p>
                    <div className="d-flex align-items-center mt-2">
                      <button
                        className="btn btn-sm btn-secondary me-2"
                        onClick={() => dispatch(decrementQuantity(item.id))}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-secondary ms-2"
                        onClick={() => dispatch(incrementQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    x
                  </button>
                </li>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </ul>
        </div>

        {/* Checkout Section */}
        {items.length > 0 && (
          <div
            className="position-absolute bottom-0 start-0 w-100 bg-white shadow p-3"
            style={{
              borderTop: '1px solid #ddd',
            }}
          >
            <h5>Total: ${totalPrice.toFixed(2)}</h5>
            <button className="btn btn-primary w-100">Checkout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
