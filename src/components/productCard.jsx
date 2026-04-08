import React from 'react';
import '../styles/productCard.css';
import { useCart } from '../context/CartContext'; // 👈 plug into the socket

function ProductCard({ product }) {
  const { addToCart } = useCart(); // 👈 grab just the function you need

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">${product.price}</p>
      <button
        className="add-to-cart-button"
        onClick={() => addToCart(product)} // 👈 pass the whole product object
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;