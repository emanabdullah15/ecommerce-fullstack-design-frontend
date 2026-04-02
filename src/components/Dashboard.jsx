import React from "react";
import { logoutUser } from "../services/authService";

const Dashboard = () => {
  return (
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      <p>Welcome, normal user!</p>
      <button className="btn btn-danger" onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default Dashboard;