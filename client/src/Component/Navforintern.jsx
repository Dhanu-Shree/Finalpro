import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Admin.css";
import {  HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";


function InternNavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/admin" className="nav-logo">
            <span>Welcome Intern</span>
            {/* <i className="fas fa-code"></i> */}
           
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/usercreate"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
          Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/nextpage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
               Feedback
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/contact"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}

            {click ? (
              <span className="icon">
                <HamburgetMenuOpen />{" "}
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            )}
          </div>
        </div>
      </nav>
      
    </>
  );
}

export default InternNavBar;