import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import "../styles/Home&decore.css"

const Consumer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      // Filter for consumer electronics category
      setProducts(data.filter(item => item.category === "consumer-electronics"));
    };
    getProducts();
  }, []);

  return (
    <section className="home-section container my-4">
      <div className="main-box">

        {/* LEFT BANNER */}
        <div className="left-ban">
          <div className="banner-content">
            <h5>Consumer Electronics</h5>
            <button className="btn btn-light btn-sm">Source now</button>
          </div>
        </div>

        {/* RIGHT GRID */}
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

export default Consumer;