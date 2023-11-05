import React from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-center">
        {/* adding links on the image using the react-route-dom */}
        {/* means when we click on the logo we should go back to the main hero page  */}
        <Link to="/">
          <img src={logo} alt="cocktail db logo" className="logo" />
        </Link>
        <ul className="nav-links">
          <li>
            {/* by clicking on home we should go to home page */}
            <Link to="/">home</Link>
          </li>
          <li>
            {/* by clicking on about we should go to about page */}
            <Link to="/about">about</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
