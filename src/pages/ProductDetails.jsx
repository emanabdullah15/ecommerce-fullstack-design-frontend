import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [mayLike, setMayLike] = useState([]);
  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(data);

        // Related products: same category excluding current
        const { data: related } = await axios.get(
          `${API_BASE}/api/products?category=${data.category}`
        );
        setRelatedProducts(related.filter((p) => p._id !== data._id).slice(0, 6));

        // "You may like": any 3 different products
        const { data: allProducts } = await axios.get(`${API_BASE}/api/products`);
        setMayLike(allProducts.filter((p) => p._id !== data._id).slice(0, 3));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    try {
      await axios.post(`${API_BASE}/api/cart`, {
        productId: product._id,
        name: product.name,
        price: product.price,
        img: product.img,
        qty: 1,
      });
      alert("✅ Added to Cart");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add to cart");
    }
  };

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <Container className="mt-4">
      <Row className="g-4">
        {/* IMAGE */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <Card.Img
              src={product.img}
              style={{ height: "300px", objectFit: "cover" }}
            />
            <div className="d-flex gap-2 mt-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={product.img}
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                  }}
                  alt=""
                />
              ))}
            </div>
          </Card>
        </Col>

        {/* INFO */}
        <Col md={5}>
          <p className="text-success fw-bold">✔ In stock</p>
          <h4 className="fw-bold">{product.name}</h4>
          <p className="text-warning">
            ⭐⭐⭐⭐⭐ <span className="text-dark">4.5</span> | Reviews
          </p>

          <div className="bg-light p-3 rounded d-flex justify-content-between text-center">
            <div>
              <h5 className="text-danger">${product.price}</h5>
              <small>Retail</small>
            </div>
            <div>
              <h5>${product.price - 10}</h5>
              <small>Wholesale</small>
            </div>
            <div>
              <h5>${product.price - 20}</h5>
              <small>Bulk</small>
            </div>
          </div>

          <ListGroup className="mt-3 shadow-sm">
            <ListGroup.Item><b>Brand:</b> {product.brand || "N/A"}</ListGroup.Item>
            <ListGroup.Item><b>Category:</b> {product.category}</ListGroup.Item>
            <ListGroup.Item><b>Condition:</b> {product.condition || "New"}</ListGroup.Item>
          </ListGroup>

          {/* ADD TO CART */}
          <Button variant="warning" className="mt-3 w-100 fw-bold" onClick={addToCart}>
            🛒 Add to Cart
          </Button>
        </Col>
        {/* RIGHT SELLER */}
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">Supplier</h6>
              <h5>Guanjoi Trading LLC</h5>
              <p className="mb-1">📍 Germany, Berlin</p>
              <p className="mb-1 text-success">✔ Verified Seller</p>
              <p>🌍 Worldwide shipping</p>
              <Button className="w-100 mb-2">Send inquiry</Button>
              <Button variant="outline-secondary" className="w-100"> Seller profile </Button>
              <p className="text-center mt-3 text-primary" style={{ cursor: "pointer" }} > ❤️ Save for later </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* DESCRIPTION */}
      <Row className="mt-4">
        <Col md={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <h5>Description</h5>
              <p>{product.description || "High quality product with premium material."}</p>
              <ul>
                {product.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>

        {/* RIGHT SIDE - "You may like" */}
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <h6 className="text-muted">You may like</h6>
              {mayLike.map((p) => (
                <div key={p._id} className="d-flex mb-3">
                  <img
                    src={p.img}
                    style={{ width: "60px", height: "60px" }}
                    className="me-2"
                    alt=""
                  />
                  <div>
                    <small>{p.name}</small>
                    <p className="m-0">${p.price}</p>
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* RELATED PRODUCTS */}
      <Row className="mt-4">
        <h5>Related products</h5>
        {relatedProducts.map((p) => (
          <Col md={2} key={p._id}>
            <Card className="shadow-sm">
              <Card.Img src={p.img} />
              <Card.Body>
                <small>{p.name}</small>
                <p>${p.price}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container >
  );
};

export default ProductDetails;