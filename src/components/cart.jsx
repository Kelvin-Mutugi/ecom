import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/cart.css';

function Cart() {
    const { cartItems, cartCount } = useCart();

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <span className="cart-count">{cartCount} items</span>
            </div>

            <div className="cart-content">
                {cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Your cart is empty</p>
                    </div>
                ) : (
                    <>
                        <ul className="cart-items-list">
                            {cartItems.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <p className="cart-item-price">
                                            ${item.price.toFixed(2)} × {item.quantity}
                                        </p>
                                    </div>
                                    <div className="cart-item-price">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
                            <p className="cart-total">
                                Total: ${total.toFixed(2)}
                            </p>
                        </div>

                        <div className="cart-actions">
                            <button className="cart-btn cart-btn-continue">
                                Continue Shopping
                            </button>
                            <button className="cart-btn cart-btn-checkout">
                                Proceed to Checkout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Cart;