import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import "../styles/Home&decore.css"

const HomeOutdoor = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data.filter(item => item.category === "home-outdoor"));
    };
    getProducts();
  }, []);

  return (
    <section className="home-section container my-4">
      <div className="main-box">
        <div className="left-banner">
          <div className="banner-content">
            <h5>Home and outdoor</h5>
            <button className="btn btn-light btn-sm">Source now</button>
          </div>
        </div>

        <div className="right-grid">
          {products.map((item, index) => (
            <div className="product-box" key={index}>
              <div>
                <p className="title">{item.name}</p>
                <span className="price">From {item.price}</span>
              </div>
              <img src={item.img} alt={item.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeOutdoor;