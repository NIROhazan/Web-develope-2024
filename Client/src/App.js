import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import ShoppingCart from "./components/ShoppingCart";
import OrderPage from "./pages/OrderPage";
import "./App.css";

function App() {
  // State to manage the shopping cart, loaded from local storage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State to manage the visibility of the shopping cart
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Effect to save the cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item._id === product._id);
      if (productExists) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Function to remove a product from the cart
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      const productExists = prevCart.find((item) => item._id === product._id);
      if (productExists) {
        if (productExists.quantity > 0) {
          return prevCart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        }
      }
      return prevCart;
    });
  };

  // Function to delete a product from the cart
  const deleteFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  // Function to toggle the visibility of the shopping cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Calculate the total quantity of items in the cart
  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Router>
      {/* Navigation bar */}
      <NavBar
        toggleCart={toggleCart}
        cartQuantity={cartQuantity}
        totalPrice={totalPrice}
      />
      <Routes>
        {/* Home page route */}
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        {/* Order page route */}
        <Route
          path="/order"
          element={<OrderPage cart={cart} setCart={setCart} />}
        />
      </Routes>
      {/* Shopping cart component, displayed if isCartOpen is true */}
      {isCartOpen && (
        <ShoppingCart
          cart={cart}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          deleteFromCart={deleteFromCart}
          toggleCart={toggleCart}
        />
      )}
    </Router>
  );
}

export default App;
