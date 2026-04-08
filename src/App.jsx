import { useState } from 'react'
import './App.css'
import ProductList from './components/productList';

function App() {

  return (
    <>
      <div>
        <h1>Welcome to My Store</h1>
        <ProductList />
      </div>
    </>
  )
}

export default App
