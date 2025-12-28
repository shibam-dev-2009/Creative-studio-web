import React from "react";
import "./Footer.css";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";
import Contact from "../../Pages/Contact/Contact";
function Footer() {
  return (
    <div className="footer">
      <div className="firstColumn">
        <div className="logo">
          <img src={assets.compassdrafting} alt="LOGO" />
          <h1>Creative Studio</h1>
        </div>
        <p>Creative Studio Future trainer</p>

        <div className="social">
          <button>
            <img src={assets.facebook} alt="" />
          </button>
          <button>
            <img src={assets.search} alt="" />
          </button>
          <button>
            <img src={assets.youtube} alt="" />
          </button>
        </div>

        <div className="badge success">
          <span className="ball"></span>All Things Are Working Properly
        </div>
      </div>

      <div className="secondColumn">
        <h1>Legal</h1>
        <Link to="/legal/privacy-policy">Privacy Policy</Link>
        <Link to="/legal/terms-and-conditions">Terms & Conditions</Link>
        <Link to="/legal/cookie-policy">Cookie Policy</Link>
        <Link to="/legal/refund-return Policy">Refund Return Policy</Link>
      </div>
      <div className="secondColumn">
        <h1>Legal</h1>
        <Link to="/legal/privacy-policy">Privacy Policy</Link>
        <Link to="/legal/terms-and-conditions">Terms & Conditions</Link>
        <Link to="/legal/cookie-policy">Cookie Policy</Link>
        <Link to="/legal/refund-return Policy">Refund Return Policy</Link>
      </div>
      <div className="secondColumn">
        <h1>Legal</h1>
        <Link to="/legal/privacy-policy">Privacy Policy</Link>
        <Link to="/legal/terms-and-conditions">Terms & Conditions</Link>
        <Link to="/legal/cookie-policy">Cookie Policy</Link>
        <Link to="/legal/refund-return Policy">Refund Return Policy</Link>
      </div>
    </div>
  );
}

export default Footer;
