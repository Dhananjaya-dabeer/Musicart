import React from "react";
import { Link } from "react-router-dom";
import "./Homepage_common.css"
import logo from "../assets/logo.png"
import banner from "../assets/add_card.png"
import model from "../assets/add_model.png"
import gridviewIcon from "../assets/material-symbols_grid-view-rounded.png"
import listviewIcon from "../assets/material-symbols_view-list-rounded.png"
function Homepage_common() {
  return (
    <div className="Homepage_Common">
      <div className="nav">
        <div className="contactnumber">
          <span>&#9990;</span>
          <span>912121131313</span>
        </div>
        <div className="offerdisplay">
          Get 50% off on selected items | Shop Now
        </div>
        <div className="login_signup">
          <Link to={"/login"}>Login</Link>
          <span> | </span>
          <Link to={"/signup"}>Signup</Link>
        </div>
      </div>
      <div className="header">
        <div className="company_header">
          <div className="company_logo">
            <img src={logo} alt="" />
          </div>
          <div className="companyname">
            <h2>Musicart</h2>
          </div>
          <div className="Homebutton">
            <Link to={"/"}>Home</Link>
          </div>
        </div>
        <div className="advertismentbanner">
            <div className="banner">
            <img src={banner} alt="" />
            </div>
            <div className="offertext">
              <h1>Grab upto 50% off on <br/>Selected headphones</h1>
              <div className="buynow">
              <button>Buy Now</button>
            </div>
            </div>
            
            <div className="model">
            <img src={model} alt="" />
            </div>
            
        </div>
      </div>
      <div className="searchbox">
        <input type="search" placeholder="Search Product"/>
      </div>
      <div className="listing_factors">
        <div className="listing_factor_inner_container">
        <div className="viewicons">
          <div className="card_view">
            <img src={gridviewIcon} alt="" />
          </div>
          <div className="layout_view">
            <img src={listviewIcon} alt="" />
          </div>
        </div>
        <div className="filter_factors">
          <div className="company">
            <select name="headphonetype" id="">
              <option value="">Headphone Type</option>
              <option value="In-ear headphone">In-ear headphone</option>
              <option value="On-ear headphone">On-ear headphone</option>
              <option value="Over-ear headphone">Over-ear headphone</option>
            </select>
          </div>
          <div className="company">
            <select name="company" id="">
              <option value="">Company</option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="Boat">Boat</option>
              <option value="Zebronics">Zebronics</option>
            </select>
          </div>
          <div className="colour">
            <select name="colour" id="">
              <option value="">Colour</option>
              <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option>
            </select>
          </div>
          <div className="price">
            <select name="price" id="">
              <option value="">Price</option>
              <option value="1000">₹0 - ₹1,000</option>
              <option value="10000">₹1,000 - ₹10,000</option>
              <option value="20000">₹10,000 - ₹20,000</option>
            </select>
          </div>
        </div>
        <div className="sortby">
          <select name="sortby" id="">
            <option value="">Sort by : Featured</option>
            <option value="Lowest">Price : Lowest</option>
            <option value="Highest">Price : Highest</option>
            <option value="A-Z">Name : (A-Z)</option>
            <option value="Z-A">Name : (Z-A)</option>
          </select>
        </div>
        </div>
      </div>

      <div className="middle_body"></div>
      <div className="footer"></div>
    </div>
  );
}

export default Homepage_common;
