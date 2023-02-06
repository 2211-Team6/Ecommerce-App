import React, { useState, useEffect } from "react";
import { getAllProducts, getProductById, getReviewsByProductId } from "../api/auth";
import "../style/Products.css"


const Products = ({ setSelectedProduct, setReviews, cartItems, setCartItems, addToCart, products, setProducts }) => {
  const [searchInput, setSearchInput] = useState("");
  
  // console.log("This is cart items in products", cartItems)


  // useEffect(() => {
  //   const productsArr = async () => {
  //     const data = await getAllProducts();
  //     setProducts(data);
  //   };
  //   productsArr();
  // }, []);

  const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchInput.toLowerCase()));


  

  const handleClick = async (productId) => {
    const singleProduct = await getProductById(productId)
    const singleReview = await getReviewsByProductId(productId)
    setSelectedProduct(singleProduct[0])
    setReviews(singleReview)
  }

  return (
    <div className="products-container">
    {products.map((product) => (
      <div key={product.id} className="product-item">
        <img src={product.url} alt={product.title} className="product-img"/>
        <p className="product-title">{product.title}</p>
        <p className="product-description">{product.description}</p>
        <div className="buttons-container">
          <button onClick={() => handleClick(product.id)} className="view-button">View</button>
          <button onClick={() => addToCart(product)} className="add-to-cart-button">Add to Cart</button>
        </div>
      </div>
    ))}
  </div>
    
  );
};

export default Products;
