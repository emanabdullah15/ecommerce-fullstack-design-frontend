import { createContext, useState, useEffect } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("userToken");
    if (savedToken) {
      setToken(savedToken);
      try {
        const decoded = jwtDecode(savedToken);
        setUser({ name: decoded.name || "User", email: decoded.email, isAdmin: decoded.isAdmin });
      } catch (err) {
        console.error("Invalid token in localStorage");
        localStorage.removeItem("userToken");
      }
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      const token = res.data.token;
      const user = res.data; // res.data should contain name/email/isAdmin

      // Save in state
      setToken(token);
      setUser({ name: user.name, email: user.email, isAdmin: user.isAdmin });

      // Save in localStorage
      localStorage.setItem("userToken", token);
      localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email, isAdmin: user.isAdmin }));

      return user;
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};