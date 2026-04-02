import API from "../api";

export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", userData);
  localStorage.setItem("userToken", res.data.token); // save JWT
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/auth/login", userData);
  localStorage.setItem("userToken", res.data.token); // save JWT
  return res.data;
};

// Logout
export const logoutUser = (navigate) => {
  localStorage.removeItem("userToken");
  navigate("/login"); // Redirect to login page
};