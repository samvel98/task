import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";

export const Navbar = ({ items }: { items: any }) => {
  const pathName = window.location.pathname;

  return (
    <nav className="nav-bar">
      <ul className="navbar-nav">
        <li className="nav-item logo">
          <Link className="nav-link" to="/">
            <span className="link-text">Task</span>
          </Link>
        </li>
        {items.map((item: any, index: number) => (
          <li className="nav-item" key={index}>
            <Link
              className="nav-link"
              style={{
                background: pathName.includes(item.name)
                  ? "#3a3a56"
                  : "#23232e",
              }}
              to={item.name}
            >
              <span className="link-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
