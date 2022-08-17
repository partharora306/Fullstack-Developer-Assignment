import React from "react";
import { FaRocket } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { NavbarData } from "./Data";
import "../App.css";

export default function Navbar() {
  return (
    <>
      <IconContext.Provider value={{ color: "#FFF" }}>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars background">
                <FaRocket />
              </Link>
            </li>

            {NavbarData.map((item, index) => {
              return (
                <li key={index} className="nav-text">
                  <Link to={item.path} className="menu-bars">
                    {item.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
