import React from "react";
import style from "../Global CSS/style.css";

const TopNavBar = () => {
  return (
    <div className="top-nav-bar">
      <nav>
        <div className="nav-company-info">IT Company</div>
        <div className="nav-contents">
          <div>About</div>
          <div>Help & Support</div>
          <div>Contact Us</div>
        </div>
      </nav>
    </div>
  );
};

export default TopNavBar;
