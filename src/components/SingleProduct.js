import React from 'react';
import { Link } from 'react-router-dom';

const SingleProduct = ({singleProduct, setSelectedProduct, reviews, }) => {
    return (
      <div>
        <div class="single-product-container">
          <div>
            <img src={singleProduct.url}/>
          </div>
          <div>
            <h3>{singleProduct.title}</h3>
            <p>Description: {singleProduct.description}</p>
            <p>Price: ${singleProduct.price/100}</p>
            <p>Quantity: {singleProduct.quantity}</p>
            <button onClick={() => setSelectedProduct({})}>View all products</button>
            <Link to="/review-form">Leave A Review</Link>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class="single-review">
          {reviews ? (
            <div>
          <h2 className="title">Reviews</h2>
        <p>Description: {reviews.description}</p>
        <h3>Creator: {reviews.username}</h3>
        <b>Rating: {reviews.rating}</b>
        </div>) : <p>"There are no Reviews"</p>}
        </div>
        </div>
      );
};

export default SingleProduct;