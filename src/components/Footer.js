import { useState } from "react";
// import React, { useState } from "react";
import { FlagIcon } from "react-flag-kit";
import "../styles/Footer.css";

const Footer = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState({ country: "US", label: "English, USD" });
  const languages = [
    { country: "US", label: "English, USD" },
    { country: "PK", label: "Urdu, PKR" },
    { country: "GB", label: "English, GBP" },
    { country: "CN", label: "Chinese, CNY" },
    { country: "AE", label: "Arabic, AED" },
  ];

  return (
    <>
      <section className="newsletter-section">
        <div className="container text-center">
          <h5>Subscribe on our newsletter</h5>
          <p>Get daily news on upcoming offers from many suppliers all over the world</p>
          <div className="newsletter-box">
            <input type="email" placeholder="Email" className="form-control" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>

      <footer className="footer-section">
        <div className="container footer-top">
          <div className="row">
            {/* Logo + Desc */}
            <div className="col-md-3">
              <img src={process.env.PUBLIC_URL + "/icons/logo-colored.svg"} alt="logo" className="logo-img" />
              <p className="desc">Best information about the company goes here but now lorem ipsum is</p>
            </div>
            {/* About */}
            <div className="col-md-2"><h6>About</h6><ul><li>About Us</li><li>Find store</li><li>Categories</li><li>Blogs</li></ul></div>
            <div className="col-md-2"><h6>Partnership</h6><ul><li>About Us</li><li>Find store</li><li>Categories</li><li>Blogs</li></ul></div>
            <div className="col-md-2"><h6>Information</h6><ul><li>Help Center</li><li>Money Refund</li><li>Shipping</li><li>Contact us</li></ul></div>
            <div className="col-md-1"><h6>For users</h6><ul><li>Login</li><li>Register</li><li>Settings</li><li>My Orders</li></ul></div>
            <div className="col-md-2"><h6>Get app</h6>
              <img src={process.env.PUBLIC_URL + "/icons/market-button.png"} alt="" className="app-img" />
              <img src={process.env.PUBLIC_URL + "/icons/market-button1.png"} alt="" className="app-img mt-2" />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container d-flex justify-content-between align-items-center">
            <p>© 2023 Ecommerce</p>
            <div className="lang-dropdown">
              <div className="selected-lang" onClick={() => setOpen(!open)}>
                <FlagIcon code={selected.country} size={18} />
                <span>{selected.label}</span>
              </div>
              {open && (
                <div className="dropdown-menu-custom">
                  {languages.map((lang, idx) => (
                    <div key={idx} onClick={() => { setSelected(lang); setOpen(false); }}>
                      <FlagIcon code={lang.country} size={18} />
                      <span>{lang.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;