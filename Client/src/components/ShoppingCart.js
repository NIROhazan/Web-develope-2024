import React from "react";
import { useNavigate } from "react-router-dom";
import "./ShoppingCart.css";

const ShoppingCart = ({
  cart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  toggleCart,
}) => {
  // Calculate the total price of items in the cart
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const navigate = useNavigate();

  // Function to proceed to the checkout page
  const proceedToCheckout = () => {
    //Check if there are any items with a quantity of 0
    const hasZeroQuantityItem = cart.some((item) => item.quantity === 0);
    if (cart.length < 1) {
      //  Check if any item in the cart has a quantity of 0
      alert("Cart is Empty , please add at least one product.");
      return;
    }
    if (hasZeroQuantityItem) {
      alert(
        "There is an item in the cart with a quantity of 0. Please remove it or increase its quantity before proceeding."
      );
      return;
    }
    // Close the cart and navigate to the order page
    toggleCart();
    navigate("/order");
  };

  // Function to handle adding an item to the cart
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  // Function to handle deleting an item from the cart
  const handleDeleteFromCart = (itemId) => {
    deleteFromCart(itemId);
  };

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart:</h2>
      <button className="close-button" onClick={toggleCart}>
        Close
      </button>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            <span>
              <img className="image" src={item.image} alt={item.name} />
              <br />
              {item.name}
              <br />
            </span>
            <span> Quantity: {item.quantity} , </span>
            <span> Price for one: {item.price} NIS</span>
            <br />
            <span> Total Price: {item.price * item.quantity} NIS</span>
            <div>
              <button onClick={() => handleAddToCart(item)}>+</button>
              <button onClick={() => handleRemoveFromCart(item)}>-</button>
              <button onClick={() => handleDeleteFromCart(item._id)}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <h3>Total: {totalPrice} NIS</h3>
      <button className="button" onClick={proceedToCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default ShoppingCart;
