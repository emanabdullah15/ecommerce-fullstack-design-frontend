import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaEnvelope, FaHeart, FaChevronDown } from "react-icons/fa";
import { FlagIcon } from "react-flag-kit";

import brandLogo from "../assets/icons/logo-colored.svg";
import "../styles/Navbar.css";
import ProfileSidebar from "./ProfileSidebar";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const { user } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  const [selectedLang, setSelectedLang] = useState({
    country: "US",
    label: "English, USD",
  });

  const languages = [
    { country: "US", label: "English, USD" },
    { country: "PK", label: "Urdu, PKR" },
    { country: "GB", label: "English, GBP" },
  ];

  const handleProfileClick = () => setProfileOpen(true);
  const handleCartClick = () => navigate("/cart");
  const handleMessagesClick = () => navigate("/messages");
  const handleOrdersClick = () => navigate("/orders");

  return (
    <>
      {/* MOBILE NAV */}
      <div className="mobile-navbar">
        <div className="mobile-top">
          <span className="menu-icon" onClick={() => setMenuOpen(true)}>☰</span>
          <Link to="/" className="mobile-logo">
            <img src={brandLogo} alt="brand" />
          </Link>
          <div className="mobile-icons">
            <div style={{ position: "relative", cursor: "pointer" }} onClick={handleCartClick}>
              <FaShoppingCart />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              <span>Cart</span>
            </div>
            <div onClick={handleProfileClick} style={{ cursor: "pointer" }}>
              <FaUser />
              <span>{user ? user.name : "Profile"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div className="desktop-navbar">
        <div className="top-navbar">
          <div className="container nav-flex">
            <Link to="/" className="logo">
              <img src={brandLogo} alt="brand" />
            </Link>
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
              <select className="search-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothes</option>
              </select>
              <button className="search-btn">Search</button>
            </div>
            <div className="nav-icons">
              <div onClick={handleProfileClick} style={{ cursor: "pointer" }}>
                <FaUser />
                <span>{user ? user.name : "Profile"}</span>
              </div>
              <div onClick={handleMessagesClick}>
                <FaEnvelope />
                <span>Message</span>
              </div>
              <div onClick={handleOrdersClick}>
                <FaHeart />
                <span>Orders</span>
              </div>
              <div style={{ position: "relative", cursor: "pointer" }} onClick={handleCartClick}>
                <FaShoppingCart />
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                <span>Cart</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-navbar">
          <div className="container nav-flex">
            <div className="menu-left">
              <Link to="/menu" className="all-category">☰ All category</Link>
              <Link to="/offers">Hot offers</Link>
              <Link to="/gift">Gift boxes</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/ProductList">Menu item</Link>
            </div>
            <div className="menu-right">
              <div className="nav-dropdown">
                <div onClick={() => setHelpOpen(!helpOpen)}>Help <FaChevronDown /></div>
                {helpOpen && (
                  <div className="dropdown-menu-custom">
                    <div>Help Center</div>
                    <div>Contact Us</div>
                    <div>Support</div>
                  </div>
                )}
              </div>
              <div className="nav-dropdown">
                <div onClick={() => setLangOpen(!langOpen)}>
                  <FlagIcon code={selectedLang.country} size={18} />
                  <span>{selectedLang.label}</span>
                  <FaChevronDown />
                </div>
                {langOpen && (
                  <div className="dropdown-menu-custom">
                    {languages.map((lang, i) => (
                      <div key={i} onClick={() => { setSelectedLang(lang); setLangOpen(false); }}>
                        <FlagIcon code={lang.country} size={18} />
                        <span>{lang.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="ship-to">
                <img src="https://flagcdn.com/w40/de.png" alt="flag" />
                <span>Ship to</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProfileSidebar open={profileOpen} setOpen={setProfileOpen} />
    </>
  );
}

export default Navbar;