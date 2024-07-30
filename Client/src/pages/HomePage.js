import React, { useEffect, useState } from "react";
import "./HomePage.css";
import shoplogo from "./images/storelogo.png";
import ProductItem from "../components/ProductItem";

const HomePage = ({ addToCart }) => {
  // State to manage the list of products
  const [products, setProducts] = useState([]);

  // Fetch products from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:3000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // Check if the response is not ok, then throw an error
        if (!res.ok) {
          throw new Error("Error getting products");
        }
        return res.json();
      })
      .then((data) => {
        // Filter out Orders from items (that have a `totalAmount` property)
        const filteredData = data.filter(
          (item) => !item.hasOwnProperty("totalAmount")
        );
        setProducts(filteredData);
      })
      .catch((err) => {
        // Log any errors to the console
        console.log("Error fetching products:", err);
      });
  }, []);

  return (
    <div>
      {/* Header image with store logo */}
      <div className="header-image">
        <img src={shoplogo} alt="shoplogo" />
      </div>
      {/* Slogan for the store */}
      <div className="slogan">
        <h2>Welcome to our shoe store!!!</h2>
        <p>Best online shoe store. Special offers and free shipping.</p>
      </div>
      {/* Product grid to display the list of products */}
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              addToCart={addToCart}
            />
          ))
        ) : (
          // Show loading message while products are being fetched
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
