import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import "../styles/Recommended.css"

const Recommended = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      // Filter for recommended items category
      setProducts(data.filter(item => item.category === "recommended"));
    };
    getProducts();
  }, []);

  return (
    <section className="recommended-section container my-5">
      <h5 className="mb-4">Recommended items</h5>

      <div className="recommended-grid">
        {products.map((item, index) => (
          <div className="card-box" key={index}>
            <img src={item.img} alt={item.name} />
            <h6>{item.name}</h6>
            <p className="price">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommended;