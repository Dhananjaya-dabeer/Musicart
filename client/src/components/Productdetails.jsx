import React, { useEffect, useState } from "react";
import { useProductContext } from "./ProductContext/ProductContext";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Productdetails.css";

const Productdetails = () => {
  const { products, setProducts } = useProductContext();
  const [isUserVerified, setIsUserVerified] = useState();
  const [clickToReplaceImg,setClickToReplceImg] = useState(products.detailsMode.img)
  const navigate = useNavigate();

  useEffect(() => {
    setIsUserVerified(JSON.parse(localStorage.getItem("name")));
  }, []);
  return (
    <div className="product_details_page">
      <div className="nav">
        <div className="contactnumber">
          <span>&#9990;</span>
          <span>912121131313</span>
        </div>
        <div className="offerdisplay">
          Get 50% off on selected items | Shop Now
        </div>
        <div className={isUserVerified ? "displaynone" : "login_signup"}>
          <Link to={"/login"}>Login</Link>
          <span> | </span>
          <Link to={"/signup"}>Signup</Link>
        </div>
        <div className={isUserVerified ? "logout_btn" : "displaynone"}>
          <Link
            to={"/"}
            onClick={() => {
              localStorage.clear();
              setIsUserVerified("");
            }}
          >
            Logout
          </Link>
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
            <Link to={"/"}>Home / </Link>{" "}
            <span>
              <Link>{products.detailsMode.model}</Link>
            </span>
          </div>
        </div>
        <div className="cartimg"></div>
      </div>
      <div className="back_to_products_btn">
        <button onClick={(e) => navigate("/")}>back to products</button>
      </div>
      <div className="product_details_container">
        <div className="prduct_title">
          <h3>{products.detailsMode.title}</h3>
        </div>
        <div className="product_middleComponent">
          <div className="product_img">
            <img src={clickToReplaceImg} onClick={() => setClickToReplceImg(products.detailsMode.img)} alt="" />
          </div>
         <div className="product_detail_right_comp">
          <div className="product_model">
            <h2>{products.detailsMode.model}</h2>
          </div>
          <div className="customer_reviews">
            <p> <span>&#9733;&#9733;&#9733;&#9733;&#9733;</span> {products.detailsMode.reviews} (Customer reviews)</p>
          </div>
          <div className="price">
            <h3>Price - ₹{products.detailsMode.price}</h3>
          </div>
          <div className="color_typeofearphone">
            <p>{products.detailsMode.colour} | {products.detailsMode.type}</p>
          </div>
          <div className="aboutitem">
          <p>About this item</p>
          </div>
         <div className="about_product">
         
            <ul>
              {products.detailsMode.about.map((item,index) => (<li key={index}>{item}</li>))}

            </ul>
          </div>
          <div className="stock">
            <p><span>Available -</span> {products.detailsMode.available}</p>
          </div>
          <div className="product_brand">
            <p><span>Brand -</span> {products.detailsMode.brand}</p>
          </div>
         </div>
        </div>
        <div className="lower_middle">
        <div className="extra_images">
          <div className="img123">
            <img src={products.detailsMode.img1} onClick={() => setClickToReplceImg(products.detailsMode.img1)} alt="" />
          </div>
          <div className="img123">
            <img src={products.detailsMode.img2} onClick={() => setClickToReplceImg(products.detailsMode.img2)} alt="" />
          </div>
          <div className="img123">
            <img src={products.detailsMode.img3} onClick={() => setClickToReplceImg(products.detailsMode.img3)} alt="" />
          </div>
        </div>
        <div className="cart_buy_btns">
            <div className="addtocart">
              <button>Add to cart</button>
            </div>
            <div className="buynow">
              <button>Buy Now</button>
            </div>
        </div>
        </div>
        
      </div>
      <div className="foter">
      <div className="allrights_reserved">
        <p>Musicart | All rights reserved</p>
      </div>
      </div>
    </div>
  );
};

export default Productdetails;
