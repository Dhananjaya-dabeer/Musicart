import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Homepage_common.css";
import logo from "../assets/logo.png";


import gridviewIcon from "../assets/material-symbols_grid-view-rounded.png";
import listviewIcon from "../assets/material-symbols_view-list-rounded.png";
import axios from "axios";
import {  useProductContext } from "./ProductContext/ProductContext";
// import { useIsUserVerifiedContext } from "./ProductContext/Userverifiedcontext"
import AdvertiseBanner from "./AdvertiseBanner";

function Homepage_common() {
  const {setProducts} = useProductContext()
  const [search, setSearch] = useState("");
  const navigate = useNavigate()
  const [viewType, setViewType] = useState({
    gridView: true,
    listView: false,
  });
  const [response, setResponse] = useState([]);
  const [queryResponse, setQueryResponse] = useState([]);
  const [colourQuery, setColourQuery] = useState([]);
  const [priceQuery,setPriceQuery] = useState([]);
  const [headphoeType, setHeadphoneTpe] = useState("")
  const [sort, setSort] = useState("")
  // const {isUserVerified, setIsUserVerified} = useIsUserVerifiedContext();
  const [isUserVerified,setIsUserVerified] = useState("")

  useEffect(() => {
    (async () => {
      const result = await axios.get(
        `http://localhost:3000/api/v1/users/data?search=${search}&colour=${colourQuery}&price=${priceQuery}&hedphoneType=${headphoeType}&sort=${sort}`
      );
      // console.log(result.data)
      try {
        
        setResponse(result.data.data);
        setQueryResponse(result.data.filteredResults);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [search, colourQuery,priceQuery,headphoeType,sort]);

  useEffect(() => {
  ;(async() => {
    const result = await axios.get("http://localhost:3000/api/v1/users/tokenverify",{
      headers:{
        Authorization: JSON.parse(localStorage.getItem("token"))
      }
    })
    try {
      if(result.data.status == "User verified" ) {
     
       setIsUserVerified(JSON.parse(localStorage.getItem("name")))
      }
     else{
        return navigate("/")
     }
    } catch (error) {
      console.log(error)
    }
  })()
  }, [])
  const uniqueCompanyName = Array.from(
    new Set(response.map((item) => item.brand))
  );
  const uniqueHeadphoneType = Array.from(
    new Set(response.map((item) => item.type))
  );
  const uniqueColour = Array.from(new Set(response.map((item) => item.colour)));

  const handleViewDetailsEvent = (item) => {
      setProducts(
        {
          detailsMode : item,
          cart : []
        }
      )
  }


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
        <div className={isUserVerified ? "displaynone" :"login_signup" }>
          <Link to={"/login"}>Login</Link>
          <span> | </span>
          <Link to={"/signup"}>Signup</Link>
        </div>
        <div className={isUserVerified ? "logout_btn" : "displaynone"}>
          <Link to={"/"} onClick={() => {localStorage.clear();setIsUserVerified("")}}>Logout</Link>
        </div>
      </div>
      <div className="header1">
        <div className="company_header">
         <div className="lefthomeheader">
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
         {isUserVerified && <div className="cartbuton">
          <button onClick={() => navigate("/cart")}> <i class='fas fa-shopping-cart'></i><span>View Cart</span></button>
          </div>}
        </div>
        <AdvertiseBanner />
        
      </div>
      <div className="searchbox">
        <input
          type="search"
          placeholder="Search Product"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="listing_factors">
        <div className="listing_factor_inner_container">
          <div className="viewicons">
            <div
              className={
                viewType.gridView ? "card_view background" : "card_view"
              }
            >
              <img
                src={gridviewIcon}
                onClick={() =>
                  setViewType({ ...viewType, gridView: true, listView: false })
                }
                alt=""
              />
            </div>
            <div
              className={
                viewType.listView ? "layout_view background" : "layout_view"
              }
            >
              <img
                src={listviewIcon}
                alt=""
                onClick={() =>
                  setViewType({ ...viewType, listView: true, gridView: false })
                }
              />
            </div>
          </div>
          <div className="filter_factors">
            <div className="company">
              <select name="headphonetype" id="" onChange={(e) => setHeadphoneTpe(e.target.value)}>
                <option value="">Headphone Type</option>
                {uniqueHeadphoneType.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="company">
              <select
                name="company"
                id=""
                onChange={(e) => setSearch(e.target.value)}
              >
                <option value="">Company</option>
                {uniqueCompanyName.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                {/* <option value="">Company</option>
              <option value="JBL">JBL</option>
              <option value="Sony">Sony</option>
              <option value="Boat">Boat</option>
              <option value="Zebronics">Zebronics</option> */}
              </select>
            </div>
            <div className="colour">
              <select
                name="colour"
                id=""
                onChange={(e) => setColourQuery(e.target.value)}
              >
                <option value="">Colour</option>
                {uniqueColour.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                {/* <option value="Blue">Blue</option>
              <option value="Black">Black</option>
              <option value="White">White</option>
              <option value="Brown">Brown</option> */}
              </select>
            </div>
            <div className="price">
              <select name="price" id="" onChange={(e) => setPriceQuery(e.target.value.split(","))}>
                <option value="">Price</option>
                <option value="0,1000">₹0 - ₹1,000</option>
                <option value="1000,10000">₹1,000 - ₹10,000</option>
                <option value="10000,20000">₹10,000 - ₹20,000</option>
                <option value="20000,100000">₹20,000 and more</option>
              </select>
            </div>
          </div>
          <div className="sortby">
            <select name="sortby" id="" onChange={(e) => setSort(e.target.value)}>
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
        {viewType.gridView ? (
          <div className="gridview">
            <div className="cardcontainer">
              <div className="card">
                {queryResponse.map((item, index) => (
                  <div className="image_basicInfo" key={index} onClick={() =>{ handleViewDetailsEvent(item); navigate("/productdetails")}}>
                    <div className="product_image">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="product_details">
                      <p>{item.model}</p>
                      <p>Price - ₹{item.price}</p>
                      <p>
                        Colour - {item.colour} |{" "}
                        <span title={item.type}>{item.type}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="listview">
            <div className="listcontainer">
              <div className="listitem">
                {queryResponse.map((item, index) => (
                  <div className="image_basic_info_list" key={index}>
                    <div className="product_image_list">
                      <img src={item.img} alt="" />
                    </div>
                    <div className="product_details_list">
                      <p>{item.model}</p>
                      <p>Price - ₹{item.price}</p>
                      <p>
                        Colour - {item.colour} |{" "}
                        <span title={item.type}>{item.type}</span>
                      </p>
                      <p>{item.title}</p>
                      <button onClick={() =>{ handleViewDetailsEvent(item); navigate("/productdetails")}} className='list-view-details-btn'>Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
     
      <div className="closure">
        <p>Musicart | All rights reserved</p>
      </div>
      
    </div>
  );
}

export default Homepage_common;
