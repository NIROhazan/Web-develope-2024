// src/components/NavBar.js

import React from "react";
import "./NavBar.css";
import { FaShoppingCart } from "react-icons/fa";

const NavBar = ({ toggleCart, cartQuantity, totalPrice }) => {
  return (
    <nav className="nav-bar">
      <li>
        {/* Special Text Container */}
        <div className="logo">
          "Lech-lecha" Shoe Store - Our Quality Your Plesure{" "}
        </div>
      </li>
      <ul>
        {/* Navigation link to the Home Page */}
        <li>
          <a className="special-container" href="/">
            Home Page
          </a>
        </li>
        {/* Cart icon with quantity and total price */}
        <li className="cart-icon" onClick={toggleCart}>
          <FaShoppingCart />
          <span>
            {cartQuantity} ({totalPrice} NIS)
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
