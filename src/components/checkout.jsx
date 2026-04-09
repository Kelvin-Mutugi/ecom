
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import '../styles/checkout.css';

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'mpesa'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.phone || !formData.address || !formData.city || !formData.postalCode) {
      alert('Please fill in all fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    // Simulate order placement
    const newOrderId = 'ORD-' + Date.now();
    const order = {
      id: newOrderId,
      customer: formData,
      items: cartItems,
      total: cartTotal,
      timestamp: new Date().toLocaleString(),
      status: 'Pending'
    };

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, order]));

    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <div className="success-icon">✓</div>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for your purchase.</p>
          <div className="order-details">
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Total Amount:</strong> ${cartTotal.toFixed(2)}</p>
            <p>A confirmation email will be sent to {formData.email}</p>
          </div>
          <button 
            className="checkout-btn checkout-btn-primary"
            onClick={() => {
              setOrderPlaced(false);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                address: '',
                city: '',
                postalCode: '',
                paymentMethod: 'mpesa'
              });
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        {/* Order Summary */}
        <div className="checkout-section order-summary">
          <h2>Order Summary</h2>
          
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your cart is empty. Add items before checking out.</p>
            </div>
          ) : (
            <>
              <div className="summary-items">
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-info">
                      <h4>{item.name}</h4>
                      <p className="item-quantity">Qty: {item.quantity}</p>
                    </div>
                    <div className="summary-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-total">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span>FREE</span>
                </div>
                <div className="total-row total-amount">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Checkout Form */}
        <div className="checkout-section checkout-form-section">
          <form onSubmit={handleSubmitOrder}>
            <h2>Shipping Information</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+254..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Street Address *</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City *</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode">Postal Code *</label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h2>Payment Method</h2>
            
            <div className="payment-options">
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={formData.paymentMethod === 'mpesa'}
                  onChange={handleInputChange}
                />
                <span>M-Pesa</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  checked={formData.paymentMethod === 'credit_card'}
                  onChange={handleInputChange}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={formData.paymentMethod === 'paypal'}
                  onChange={handleInputChange}
                />
                <span>PayPal</span>
              </label>
            </div>

            <button
              type="submit"
              className="checkout-btn checkout-btn-primary"
              disabled={cartItems.length === 0}
            >
              Place Order - ${cartTotal.toFixed(2)}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Checkout;