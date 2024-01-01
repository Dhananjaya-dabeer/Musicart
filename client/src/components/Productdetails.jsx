import React, { useEffect, useState } from "react";
import { useProductContext } from "./ProductContext/ProductContext";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import "./Productdetails.css";
import axios from "axios";

const Productdetails = () => {
  const { products, setProducts } = useProductContext();
  const [isUserVerified, setIsUserVerified] = useState();
  const [clickToReplaceImg,setClickToReplceImg] = useState(products.detailsMode.img)
  
 
  const navigate = useNavigate();

  useEffect(() => {
    ;(async() => {
      const result = await axios.get("https://musicart-hfqw.onrender.com/api/v1/users/tokenverify",{
        headers:{
          Authorization: JSON.parse(localStorage.getItem("token"))
        }
      })
      try {
        if(result.data.status == "User verified" ) {
       
         setIsUserVerified(JSON.parse(localStorage.getItem("name")))
        }
       else{
         
       }
      } catch (error) {
        console.log(error)
      }
    })()
    }, [])
 
  const handleCart = async (products) => {
    // ?product_id=${products.detailsMode._id}&userId=${JSON.parse(localStorage.getItem("userId"))}
   const response =  await  axios.post(`https://musicart-hfqw.onrender.com/api/v1/users/cart`, {
    product_id:products.detailsMode._id,
    userId:JSON.parse(localStorage.getItem("userId"))
   })
   try {
    
      if(response.data.status == "Success"){
        navigate("/cart")
      }else{
        alert(response.data.message)
        navigate("/cart")
      }
   } catch (error) {
    console.log(error)
   }
  }

  
  
 
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
         <div className="lefthomeheader">
         <div className="company_logo">
            <img src={logo} alt="" />
          </div>
          <div className="companyname">
            <h2>Musicart</h2>
          </div>
          <div className="Homebutton">
            <Link to={"/"}>Home / </Link>
            <span><Link>{products.detailsMode.model}</Link></span>
          </div>
         </div>
         {isUserVerified && <div className="cartbuton">
          <button onClick={() => navigate("/cart")}> <i class='fas fa-shopping-cart'></i><span>View Cart</span></button>
          </div>}
        </div>
        
        
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
        <div className={isUserVerified ? "cart_buy_btns" : "displaynone"}>
            <div className= "addtocart" >
              <button onClick={() => handleCart(products) }>Add to cart</button>
            </div>
           
            <div className="buynow">
              <button onClick={() => handleCart(products)}>Buy Now</button>
            </div>
        </div>
        <div className={isUserVerified ? "displaynone" : "loginorsignup"}>
          <button onClick={(e) => navigate("/login")}>Login/Signup</button>
        </div>
        </div>
        
      </div>
      <div className="closure">
        <p>Musicart | All rights reserved</p>
      </div>
    </div>
  );
};

export default Productdetails;
