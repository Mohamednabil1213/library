import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link text-white active" aria-current="page">
                All Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createproduct" className="nav-link text-white">
                Create Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/allorders" className="nav-link text-white">
                All Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/createorder" className="nav-link text-white">
                Create Order
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
