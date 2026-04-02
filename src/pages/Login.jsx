import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");   // ✅ email state add kiya
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext); // ✅ AuthContext use kiya

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password); // ✅ AuthContext login call

      if (user.isAdmin) {
        navigate("/admin"); // Admin Panel route
      } else {
        navigate("/dashboard"); // Normal user dashboard
      }

      setMessage(`Welcome back ${user.name}`);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};

export default Login;