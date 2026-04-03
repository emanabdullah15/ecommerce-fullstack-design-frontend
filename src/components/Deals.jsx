import { useEffect, useState } from "react";
// import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/productService";
import "../styles/Deals.css";

const Deals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();

      // ✅ Sirf wo products jin me discount ho
      const discountedProducts = data.filter(
        (item) => item.discount && item.discount !== ""
      );

      setProducts(discountedProducts);
    };

    getProducts();
  }, []);

  return (
    <div className="deals-wrapper container my-4">
      <div className="deals-box">
        <div className="deals-grid">

          <div className="deals-left">
            <h5>Deals and offers</h5>
            <p className="sub-text">Hygiene equipments</p>
            <div className="timer">
              <div><span>04</span><small>Days</small></div>
              <div><span>13</span><small>Hour</small></div>
              <div><span>34</span><small>Min</small></div>
              <div><span>56</span><small>Sec</small></div>
            </div>
          </div>

          <div className="deals-products">
            {products.map((item, index) => (
              <div className="product-card" key={index}>
                <img src={process.env.PUBLIC_URL + item.img} alt={item.name} />
                <p>{item.name}</p>
                <span className="discount">{item.discount}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Deals;