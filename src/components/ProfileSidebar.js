import { useContext } from "react";
// import React, { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/ProfileSidebar.css";

function ProfileSidebar({ open, setOpen }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <div className={`profile-sidebar ${open ? "open" : ""}`}>
        <div className="profile-header">
          <div>
            <div className="avatar">{user ? user.name[0].toUpperCase() : "👤"}</div>

            {user ? (
              <>
                <h6>{user.name}</h6>
                <button className="btn btn-sm btn-danger" onClick={() => { logout(); setOpen(false); }}>
                  Logout
                </button>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Sign in
                </Link>{" "}
                |{" "}
                <Link to="/register" onClick={() => setOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>

          <FaTimes onClick={() => setOpen(false)} className="close-btn" />
        </div>

        <ul className="profile-menu">
          <li>Home</li>
          <li>Categories</li>
          <li>Favorites</li>
          <li>My orders</li>
          <li>English | USD</li>
          <li>Contact us</li>
          <li>About</li>
        </ul>

        <div className="profile-footer">
          <p>User agreement</p>
          <p>Partnership</p>
          <p>Privacy policy</p>
        </div>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
}

export default ProfileSidebar;