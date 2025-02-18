import React from "react";
import "./Navbar.css";
import avatar from "./avatar.png"; 

const Navbar = () => {
  return (
    <nav>
      <i className="bx bx-menu"></i>
      <a href="#" className="notification">
        <i className="bx bxs-bell"></i>
        <span className="num">8</span>
      </a>
      <a href="#" className="profile">
        <img src={avatar} alt="Avatar" />
      </a>
    </nav>
  );
};

export default Navbar;
