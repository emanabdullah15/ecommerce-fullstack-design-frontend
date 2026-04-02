import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { jwtDecode } from "jwt-decode";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("userToken", data.token);

      // Decode JWT to check if admin
      const decoded = jwtDecode(data.token);

      if (decoded.isAdmin) {
        navigate("/admin"); // Admin Panel route
      } else {
        navigate("/dashboard"); // Normal user dashboard
      }

      setMessage(`Welcome ${data.name}, registration successful!`);
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-success">Register</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default Register;