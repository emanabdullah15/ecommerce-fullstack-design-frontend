import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, handleCheckout } = useContext(CartContext);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    paymentMethod: "cod"
  });

  // Totals calculation
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal > 500 ? 60 : 0;
  const tax = subtotal * 0.01;
  const total = subtotal - discount + tax;

  const handleChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const submitOrder = async (e) => {
    e.preventDefault();
    await handleCheckout(customer); // Place order via context
    navigate("/"); // Redirect home after order
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto" }}>
      <h4>Checkout</h4>

      {/* Cart summary */}
      <div className="mb-3 p-3 border rounded">
        <p>Subtotal: ${subtotal.toFixed(2)}</p>
        <p>Discount: -${discount.toFixed(2)}</p>
        <p>Tax: +${tax.toFixed(2)}</p>
        <hr />
        <h5>Total: ${total.toFixed(2)}</h5>
      </div>

      {/* Customer form */}
      <form onSubmit={submitOrder}>
        <input name="name" placeholder="Name" onChange={handleChange} required className="form-control mb-2"/>
        <input name="email" placeholder="Email" onChange={handleChange} required className="form-control mb-2"/>
        <input name="address" placeholder="Address" onChange={handleChange} required className="form-control mb-2"/>
        <input name="city" placeholder="City" onChange={handleChange} required className="form-control mb-2"/>
        <input name="state" placeholder="State" onChange={handleChange} required className="form-control mb-2"/>
        <input name="zip" placeholder="ZIP" onChange={handleChange} required className="form-control mb-2"/>
        <select name="paymentMethod" onChange={handleChange} className="form-control mb-3">
          <option value="cod">Cash on Delivery</option>
        </select>
        <button type="submit" className="btn btn-success w-100">Place Order</button>
      </form>
    </div>
  );
};

export default Checkout;