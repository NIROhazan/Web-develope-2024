import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderPage.css";

const OrderPage = ({ cart, setCart }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shippingOption, setShippingOption] = useState("fast");
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  // Calculate total amount whenever the cart or shipping option changes
  useEffect(() => {
    const cartTotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingCost = shippingOption === "fast" ? 100 : 0;
    setTotalAmount(cartTotal + shippingCost);
  }, [cart, shippingOption]);

  // Handle form submission
  const handleOrderSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (cart.length === 0) {
      alert(
        "Your cart is empty. Please add items to the cart before submitting an order."
      );
      return;
    }
    if (cart.some((item) => item.quantity === 0)) {
      alert(
        "There is an item in the cart with a quantity of 0. Please remove it or update its quantity before submitting an order."
      );
      return;
    }

    // Create order details object
    const orderDetails = {
      name,
      email,
      phone,
      address,
      shippingOption,
      cart,
      totalAmount,
    };

    // Submit the order
    submitOrder(orderDetails);
  };

  // Function to submit the order to the server
  const submitOrder = (orderDetails) => {
    fetch("http://localhost:3000/submit-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to submit order");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.message);
        alert(
          `Order submitted successfully! Your order number is ${data.orderId}`
        );
        setCart([]); // Clear the cart
        navigate("/"); // Navigate to home page
      })
      .catch((error) => {
        console.error("Error submitting order:", error);
        alert("Failed to submit order. Please try again.");
      });
  };

  return (
    <div className="order-page">
      <h2>Order Details</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item._id} className="cart-item">
            <span>
              <img src={item.image} width="200" height="75" alt={item.name} />
            </span>
            <span>{item.name}</span>
            <span>Quantity: {item.quantity}</span>
            <span>Price per unit: {item.price} NIS</span>
            <span>Total price: {item.price * item.quantity} NIS</span>
          </div>
        ))}
      </div>
      <form className="order-form" onSubmit={handleOrderSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <div className="shipping-options">
          <label>
            <input
              type="radio"
              value="fast"
              checked={shippingOption === "fast"}
              onChange={() => setShippingOption("fast")}
            />
            Fast Shipping (3 days, additional 100 NIS)
          </label>
          <label>
            <input
              type="radio"
              value="free"
              checked={shippingOption === "free"}
              onChange={() => setShippingOption("free")}
            />
            Free Shipping (14 days)
          </label>
        </div>
        <h3>Total Amount: {totalAmount} NIS</h3>
        <button
          type="submit"
          disabled={
            cart.length === 0 || cart.some((item) => item.quantity === 0)
          }
        >
          Submit Order
        </button>
        {cart.length === 0 || cart.some((item) => item.quantity === 0) ? (
          <p className="error">
            Your cart is empty or contains items with quantity 0. Please add
            items to the cart or update their quantities.
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default OrderPage;
