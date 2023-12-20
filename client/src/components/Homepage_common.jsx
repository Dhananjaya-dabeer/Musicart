import React from "react";
import { Link } from "react-router-dom";
import "./Homepage_common.css"
import logo from "../assets/logo.png"
import banner from "../assets/add_card.png"
import model from "../assets/add_model.png"
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
            <div className="model">
            <img src={model} alt="" />
            </div>
           
        </div>
      </div>
      <div className="searchbox"></div>
      <div className="listing_factors">
        <div className="viewicons">
          <div className="card_view"></div>
          <div className="layout_view"></div>
        </div>
        <div className="filter_factors">
          <div className="company"></div>
          <div className="headphone_type"></div>
          <div className="colour"></div>
          <div className="price"></div>
        </div>
        <div className="sortby"></div>
      </div>

      <div className="middle_body"></div>
      <div className="footer"></div>
    </div>
  );
}

export default Homepage_common;
