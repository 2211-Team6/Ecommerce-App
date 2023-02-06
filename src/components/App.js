import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Home";
import { addCartProduct, fetchMe, updateCartProduct } from "../api/auth";
import "../style/App.css";
import Register from "./Register.js";
import Login from "./Login.js";
import Cart from "./Cart";
import ReviewForm from "./ReviewForm";
import AllReviews from "./Reviews";
import Checkout from "./Checkout";
import Products from "./Products";
import Admin from "./Admin";
import AllUsers from "./Admin_Functions/AllUsers";
import { getAllProducts } from "../api/auth";
import Navbar from "./Navbar";
import "../style/Navbar.css"



const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [reviews, setReviews] = useState([])
  const [user, setUser] = useState({})
  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  const addToCart = async (singleProduct) => {
    const exists = cartItems.find((product) => product.id === singleProduct.id)
    if(singleProduct.quantity > 0){
      console.log("Here's the quantity", singleProduct.quantity)
      if (exists){
        setCartItems(
          cartItems.map((product) =>  
          product.id === singleProduct.id ? { ...exists, quantity: exists.quantity + 1 } : product
          )
          );
          const id = user.id
          const productId = singleProduct.id
          const quantity = exists.quantity + 1
          console.log("This is update fields line 35", id, productId, quantity)
          const updatedProduct = await updateCartProduct(id, productId, quantity)
          console.log("This is the added product", updatedProduct)
        singleProduct.quantity -=1;
      } else {
        setCartItems([...cartItems, { ...singleProduct, quantity: 1}]);
        singleProduct.quantity -=1;
        const id = user.id
          const productId = singleProduct.id
          const quantity = 1
          const addedProduct = await addCartProduct(id, productId, quantity)
          console.log("Here's the added Product", addedProduct)
      }
    } else{
      alert("Out of stock")
    }
    };


    const checkUserLoggedIn = () => {
      const token = localStorage.getItem("token");
      if (token) {
        return true;
      }
      return false;
    };
    

    useEffect(() => {
      const getMe = async () => {
        const token = localStorage.getItem("token");
        const data = await fetchMe(token);
        setUser(data);
      };
      if (token) {
        getMe();
      }
    }, [token]);

    useEffect(() => {
      const productsArr = async () => {
        const data = await getAllProducts();
        setProducts(data);
      };
      productsArr();
    }, []);



  return (
    <div className="app-container">
      <link href="https://fonts.googleapis.com/css?family=Material+Icons|IM+Fell+Great+Primer+SC|Dosis|Open+Sans+Condensed:300&display=swap" rel="stylesheet"></link>      <Navbar checkUserLoggedIn={checkUserLoggedIn} setToken={setToken} className="navbar" />
      <Routes>
        <Route path="/" element={<Home user={user} setUser={setUser} token={token} setToken={setToken} reviews={reviews} setReviews={setReviews} cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} products={products} setProducts={setProducts}/>} />
        <Route path="/register" element={<Register setUser={setUser} setToken={setToken}/>} />
        <Route path="/login" element={<Login setToken={setToken}/>} />
        <Route path="/review-form" element={<ReviewForm user={user}/>} />
        <Route path="/reviews" element={<AllReviews reviews={reviews} setReviews={setReviews}/>} />
        <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} addToCart={addToCart} user={user}/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/products" element={<Products products={products} setProducts={setProducts}/>} />
        <Route path="/admin" element={<Admin token={token} setToken={setToken} products={products} setProducts={setProducts} user={user} setUser={setUser}/>} />
        <Route path="/allUsers" element={<AllUsers user={user}/>} />
      </Routes>
    </div>
  );
};
export default App;
