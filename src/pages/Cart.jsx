import React, { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import "../styles/cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, fetchCart, removeItem, removeAll, updateQty } = useContext(CartContext);
  const [savedItems, setSavedItems] = useState([]);
  const navigate = useNavigate();

  // Fetch cart on component mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Save item for later
  const saveForLater = (item) => {
    setSavedItems([...savedItems, item]);
    removeItem(item._id);
  };

  // Move saved item back to cart
  const moveToCart = (item) => {
    setSavedItems(savedItems.filter((i) => i._id !== item._id));
    fetchCart(); // Refresh cart
  };

  // Calculate totals
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = subtotal > 500 ? 60 : 0;
  const tax = subtotal * 0.01;
  const total = subtotal - discount + tax;

  // Checkout button click
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    // Navigate to checkout page with cart data
    navigate("/checkout", { state: { cartItems, subtotal, discount, tax, total } });
  };

  return (
    <Container className="mt-4">
      <h5 className="fw-bold mb-4">My cart ({cartItems.length})</h5>
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <Card key={item._id} className="cart-item mb-3 p-3">
              <Row className="align-items-center">
                <Col md={2}>
                  <img src={item.img} className="img-fluid rounded" alt={item.name} />
                </Col>
                <Col md={5}>
                  <h6>{item.name}</h6>
                  <small className="text-muted d-block">
                    Size: medium, Color: blue, Material: Plastic
                  </small>
                  <small className="text-muted d-block">
                    Seller: {item.seller || "Artel Market"}
                  </small>
                  <div className="mt-2">
                    <Button
                      variant="light"
                      size="sm"
                      className="text-danger border me-2"
                      onClick={() => removeItem(item._id)}
                    >
                      Remove
                    </Button>
                    <Button
                      variant="light"
                      size="sm"
                      className="border text-primary"
                      onClick={() => saveForLater(item)}
                    >
                      Save for later
                    </Button>
                  </div>
                </Col>
                <Col md={2}>
                  <h6>${item.price.toFixed(2)}</h6>
                </Col>
                <Col md={3}>
                  <Form.Select
                    value={item.qty}
                    onChange={(e) => updateQty(item._id, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Qty: {i + 1}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>
            </Card>
          ))}

          {cartItems.length > 0 && (
            <div className="d-flex justify-content-between mt-3">
              <Button variant="primary" onClick={() => navigate("/ProductList")}>
                ← Back to shop
              </Button>
              <Button variant="light" className="border" onClick={removeAll}>
                Remove all
              </Button>
            </div>
          )}
        </Col>

        {/* Summary / Checkout */}
        <Col md={4}>
          <Card className="summary-card p-3">
            <p>
              Subtotal <span className="float-end">${subtotal.toFixed(2)}</span>
            </p>
            <p className="text-danger">
              Discount <span className="float-end">- ${discount.toFixed(2)}</span>
            </p>
            <p className="text-success">
              Tax <span className="float-end">+ ${tax.toFixed(2)}</span>
            </p>
            <hr />
            <h5 className="fw-bold">
              Total <span className="float-end">${total.toFixed(2)}</span>
            </h5>
            <Button
              className="btn btn-success w-100 mt-2"
              onClick={handleCheckout}
            >
              Checkout
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Saved for later */}
      {savedItems.length > 0 && (
        <div className="mt-5">
          <h6 className="fw-bold mb-3">Saved for later</h6>
          <Row>
            {savedItems.map((item) => (
              <Col md={3} key={item._id}>
                <Card className="p-3 text-center saved-card">
                  <img src={item.img} className="img-fluid mb-2" alt="" />
                  <h6>${item.price.toFixed(2)}</h6>
                  <small className="text-muted">{item.name}</small>
                  <Button
                    variant="light"
                    className="border mt-2"
                    onClick={() => moveToCart(item)}
                  >
                    Move to cart
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  );
};

export default Cart;