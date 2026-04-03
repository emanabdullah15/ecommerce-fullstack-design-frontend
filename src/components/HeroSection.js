// import React from "react";
import "../styles/HeroSection.css";

const HeroSection = () => {
  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category"
  ];

  return (
    <div className="hero-container container my-4">
      <div className="hero-grid">
        <div className="left-menu">
          <ul>
            {categories.map((cat, idx) => (
              <li key={idx} className={idx === 0 ? "active" : ""}>{cat}</li>
            ))}
          </ul>
        </div>

        <div className="banner">
          <div className="banner-text">
            <p>Latest trending</p>
            <h2>Electronic items</h2>
            <button className="btn btn-light learn-btn">Learn more</button>
          </div>
        </div>

        <div className="right-side">
          <div className="user-box">
            <p><strong>Hi, user</strong><br />let’s get started</p>
            <button className="btn btn-primary btn-sm w-100">Join now</button>
            <button className="btn btn-light btn-sm w-100 mt-2">Log in</button>
          </div>

          <div className="offer-box">
            <p>Get US $10 off<br />with a new supplier</p>
          </div>

          <div className="quote-box">
            <p>Send quotes with<br />supplier preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;