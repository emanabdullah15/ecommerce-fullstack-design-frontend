import React, { useState, useEffect } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authService";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "consumer-electronics",
    price: 0,
    discount: 0,
    description: "",
    img: null,
  });
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("userToken");

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => logoutUser(navigate);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "img") setFormData({ ...formData, img: files[0] });
    else setFormData({ ...formData, [name]: value });
  };

  // Submit add/edit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("description", formData.description);
      if (formData.img) data.append("img", formData.img);

      if (editingId) {
        await API.put(`/products/${editingId}`, data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/products", data, {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        });
      }

      // Reset form
      setFormData({
        name: "",
        category: "consumer-electronics",
        price: 0,
        discount: 0,
        description: "",
        img: null,
      });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  // Pre-fill form for editing
  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      discount: product.discount || 0,
      description: product.description,
      img: null, // Always upload a new image if needed
    });
    setEditingId(product._id);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await API.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Panel</h2>
      <p>Only admins can see this page.</p>
      <button className="btn btn-danger mb-3" onClick={handleLogout}>Logout</button>

      {/* Add/Edit Form */}
      <div className="card mb-4 p-3">
        <h4>{editingId ? "Edit Product" : "Add Product"}</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-control mb-2"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="form-control mb-2"
          >
            <option value="consumer-electronics">Consumer Electronics</option>
            <option value="home-outdoor">Home & Outdoor</option>
            <option value="recommended">Recommended / Clothing</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="form-control mb-2"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount (optional)"
            value={formData.discount}
            onChange={handleChange}
            className="form-control mb-2"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="form-control mb-2"
          />
          <input
            type="file"
            name="img"
            accept="image/*"
            onChange={handleChange}
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-primary">
            {editingId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* Product Table */}
      <h4>Products</h4>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>
                {p.img ? (
                  <img src={p.img} alt={p.name} style={{ width: "80px" }} />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.discount || 0}%</td>
              <td>{p.description}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2 mb-1" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-danger mb-1" onClick={() => handleDelete(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;