import React from "react";
import "./ProductItem.css";

const ProductItem = ({ product, addToCart }) => {
  //Return product item component..
  return (
    <div className="product-item">
      <img width="200" height="150" src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>{product.price} NIS</p>
      <button onClick={() => addToCart(product)}>ADD TO CART</button>
    </div>
  );
};

export default ProductItem;
