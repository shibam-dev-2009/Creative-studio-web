import React, { useState } from "react";
import "./Navbar.css";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="navbar">
      {/* Navbar */}
      <div className="nav">
        {/* Hamburger Icon (Local Image) */}
        <img
          src={assets.bars}
          alt="Menu"
          className="menu-icon"
          onClick={() => setOpen(true)}
        />
        <h4>Creative Studio</h4>

        {/* Desktop Menu */}
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/work">Work</Link>
          </li>
          <li>
            <span className="ball success" ></span><Link to="/learn">Learn</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/admin/login">Admin</Link>
          </li>
        </ul>

        <button className="button">Join Us Now</button>
      </div>

      {/* Popover */}
      {open && (
        <div className="overlay" onClick={() => setOpen(false)}>
          <div className="popover" onClick={(e) => e.stopPropagation()}>
            {/* Close Icon */}
            <img
              src={assets.x}
              alt="Close"
              className="close-icon"
              onClick={() => setOpen(false)}
            />

            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/work" onClick={() => setOpen(false)}>
              Work
            </Link>
            <Link to="/learn" onClick={() => setOpen(false)}>
              Learn
            </Link>
            <Link to="/about" onClick={() => setOpen(false)}>
              About
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}>
              Contact
            </Link>

            <p>This site is under devolopement for mobile screen</p>
            <div className="social-media">
              <a href="insta" onClick={() => setOpen(false)}>
                <img className="social" src={assets.search}></img> Instagram
              </a>
              <a href="#learn" onClick={() => setOpen(false)}>
                <img className="social" src={assets.facebook}></img> Facebook
              </a>
              <a href="#learn" onClick={() => setOpen(false)}>
                <img className="social" src={assets.youtube}></img> Youtube
              </a>
            </div>

            <button className="button">See plans</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
