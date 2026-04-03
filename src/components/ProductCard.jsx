// import React from "react";
import { Link } from "react-router-dom"; // ✅ IMPORTANT
import "../styles/ProductCard.css";

const ProductCard = ({ product, view }) => {
  return (
    <div className={view === "grid" ? "card grid" : "card list"}>
      
      {/* IMAGE */}
      <img src={product.img} alt={product.title} />

      {/* CONTENT */}
      <div className="card-content">
        <h5>{product.title}</h5>

        <div className="price">
          ${product.price} <span>${product.oldPrice}</span>
        </div>

        <div className="rating">
          ⭐ 7.5 · 154 orders · <span>Free Shipping</span>
        </div>

        {/* ✅ DYNAMIC LINK */}
        <Link to={`/product/${product.id}`} className="view-btn">
          View Details
        </Link>
      </div>

      {/* WISHLIST */}
      <div className="wishlist">♡</div>
    </div>
  );
};

export default ProductCard;