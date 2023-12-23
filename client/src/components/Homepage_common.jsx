import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Homepage_common.css"
import logo from "../assets/logo.png"
import banner from "../assets/add_card.png"
import model from "../assets/add_model.png"
import gridviewIcon from "../assets/material-symbols_grid-view-rounded.png"
import listviewIcon from "../assets/material-symbols_view-list-rounded.png"
import axios from "axios"

function Homepage_common() {
  const[viewType, setViewType] = useState({
    gridView: true,
    listView: false
  })
 const [response, setResponse] = useState([])
  useEffect(() => {
  (async() => {
    const result = await axios.get("http://localhost:3000/api/v1/users/data")
    try {
      setResponse(result.data.data)
    } catch (error) {
      console.error(error)
    }
  })()
  },[])
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
      <div className="header1">
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
          <div className={viewType.gridView?"card_view background":"card_view"}>
            <img src={gridviewIcon} alt="" />
          </div>
          <div className={viewType.listView?"layout_view background" : "layout_view"}>
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

      <div className="middle_body">
        {viewType.gridView ? <div className="gridview">
           <div className="cardcontainer">
            <div className="card">
              {response.map((item,index) => <div className="image_basicInfo" key={index}>
                <div className="product_image">
                  <img src={item.img} alt="" />

                </div>
                <div className="product_details">
                  <p >{item.model}</p>
                  <p>Price - ₹{item.price}</p>
                  <p>Colour - {item.colour} | <span title={item.type}>{item.type}</span></p>
                  </div>
                  </div>)}
            </div>
           </div>
        </div> : <div className="listview">

        </div> }
      </div>
      <div className="footer"></div>
    </div>
  );
}

export default Homepage_common;
