import { useState } from 'react'
import './App.css'
import ProductList from './components/productList';
import { useCart } from './context/CartContext';
import Cart from './components/cart';

function App() {
  const { cartItems, cartCount } = useCart();

  return (
    <>
      <div>
        {/*
         <p>Items in cart: {cartCount}</p>
        <pre>{JSON.stringify(cartItems, null, 2)}</pre> */}
        <Cart />

        <h1>Welcome to My Store</h1>
        <ProductList />
      </div>
    </>
  )
}

export default App
