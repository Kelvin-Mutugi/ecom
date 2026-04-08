import { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context object
const CartContext = createContext();

// 2. The Provider — this is what wraps your app and holds the state
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initialization
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  function addToCart(product) {
    setCartItems((prev) => {
      // Check if this product is already in the cart
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        // It's already there — just increase quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item — add it with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  }

  // REMOVE FROM CART
  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  }

  // CLEAR CART (useful after M-Pesa payment succeeds)
  function clearCart() {
    setCartItems([]);
  }

  // Total number of items (for navbar badge)
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

// 3. Custom hook — so any component can just call useCart()
export function useCart() {
  return useContext(CartContext);
}