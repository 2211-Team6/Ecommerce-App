import React, { useEffect, useState} from "react";
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom";
import Products from "./Products";
import SingleProduct from "./SingleProduct";
import { checkUserLoggedIn } from "./Login";
import { fetchMe } from "../api/auth";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart";
import ReviewForm from "./ReviewForm";
import AllReviews from "./Reviews";
import Checkout from "./Checkout";
import "../style/Navbar.css";


const Navbar = ({ checkUserLoggedIn, setToken, user }) => {
    
  return (
    <div class="navbar">
  <Link to="/" className="logo">
  </Link>
  {checkUserLoggedIn() ? (
    <div className="navbar">
      <div class="button">
        <div class="button__ornament button__ornament--vertical">
          <div class="button__ornament-top-bottom"></div>
          <div class="button__ornament-left-right"></div>
        </div>
        <div class="button__ornament button__ornament--horizontal">
          <div class="button__ornament-top-bottom"></div>
          <div class="button__ornament-left-right"></div>
        </div>
        <span class="button__label">
          <NavLink to="/" class="home">Home</NavLink>
        </span>
      </div>
      <div class="button">
        <div class="button__ornament button__ornament--vertical">
          <div class="button__ornament-top-bottom"></div>
          <div class="button__ornament-left-right"></div>
        </div>
        <div class="button__ornament button__ornament--horizontal">
          <div class="button__ornament-top-bottom"></div>
          <div class="button__ornament-left-right"></div>
        </div>
        <span class="button__label">
          <NavLink to="/reviews" class="a">Product Reviews</NavLink>
        </span>
      </div>
      <div class="button">
        <div class="button__ornament button__ornament--vertical">
          <div class="button__ornament-top-bottom"></div>
          <div class="button__ornament-left-right"></div>
        </div>
        <div class="button__ornament button__ornament--horizontal">
          <div class="button__ornament-top-bottom"></div>
          <div class="button__ornament-left-right"></div>
        </div>
        <span class="button__label">
          <NavLink to="/cart" class="a">Checkout</NavLink>
        </span>
      </div>
      <button
        type="button"
        className="header-button logout"
        onClick={() => {
          localStorage.removeItem("token");
          setToken(null);
        }}
        >
        <div class="button">
          <div class="button__ornament button__ornament--vertical">
            <div class="button__ornament-top-bottom"></div>
            <div class="button__ornament-left-right"></div>
          </div>
          <div class="button__ornament button__ornament--horizontal">
            <div class="button__ornament-top-bottom"></div>
            <div class="button__ornament-left-right"></div>
          </div>
          <span class="button__label">
            Logout
          </span>
        </div>
      </button>
    </div>
  ) : (
    <div className="navbar">
          
          <NavLink to="/" class="home">
<div class="button__ornament button__ornament--vertical">
<div class="button__ornament-top-bottom"></div>
<div class="button__ornament-left-right"></div>
</div>
<span class="button__label">Home</span>
</NavLink>
<NavLink to="/login" class="a">
    <div class="button__ornament button__ornament--vertical">
      <div class="button__ornament-top-bottom"></div>
      <div class="button__ornament-left-right"></div>
    </div>
    <span class="button__label">Login</span>
  </NavLink>

  <NavLink to="/register" class="a">
    <div class="button__ornament button__ornament--vertical">
      <div class="button__ornament-top-bottom"></div>
      <div class="button__ornament-left-right"></div>
    </div>
    <span class="button__label">Register</span>
  </NavLink>

  <NavLink to="/reviews" class="a">
    <div class="button__ornament button__ornament--vertical">
      <div class="button__ornament-top-bottom"></div>
      <div class="button__ornament-left-right"></div>
    </div>
    <span class="button__label">Product Reviews</span>
  </NavLink>

  <NavLink to="/cart" class="a">
    <div class="button__ornament button__ornament--vertical">
      <div class="button__ornament-top-bottom"></div>
      <div class="button__ornament-left-right"></div>
    </div>
    <span class="button__label">Checkout</span>
  </NavLink>
</div>

        
        )}
   
        </div>
  );
};

export default Navbar;