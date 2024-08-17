import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return <>
  
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav m-auto">
        <li className="nav-item">
          <Link to={'/'} className="nav-link  text-white active" aria-current="page" href="#">All Products</Link>
        </li>
        <li className="nav-item">
          <Link to={'/createproduct'} className="nav-link text-white" href="#">Create Product</Link>
        </li>
        <li className="nav-item">
          <Link to={'/allorders'} className="nav-link text-white" href="#">All Orders</Link>
        </li>
        <li className="nav-item">
          <Link to={'/createorder'} className="nav-link text-white" href="#">Create Order</Link>
        </li>
      
      </ul>

    </div>
  </div>
</nav>
  
  </>
}
