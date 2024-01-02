import React, { useEffect, useState } from "react";
import { useProductContext } from "./ProductContext/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./Checkout.css"
import axios from "axios";
function Checkout() {
  const [isUserVerified, setIsUserVerified] = useState();
  const navigate = useNavigate()
  const { products } = useProductContext();

//   console.log(products.productsInCart.map((item) => item.total))
  const totalMRPArray = products.productsInCart.map((item) => item.total ? item.total : item.price) 
  const totalMRP = totalMRPArray.reduce((acc, curr) => (acc+curr), 0)
  const totalAmount = products.productsInCart.length && totalMRP +  45 //delivery fee
  const clearCartHandler = () => {
    axios.post(`https://musicart-hfqw.onrender.com/api/v1/users/deletecart`, {userId: JSON.parse(localStorage.getItem("userId"))})
    setResponse([])
  }
    const successHandler = () => {
        if(products.productsInCart.length){
            navigate("/success")
            clearCartHandler()
        }else{
            alert("please add items to cart to place an order")
            navigate("/")
        }
    }
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
         navigate("/")
       }
      } catch (error) {
        console.log(error)
      }
    })()
    }, [])
    
  return (
    <div className="checkoutpage">
      <div className="cartpagecontainer">
        <div className="nav">
          <div className="contactnumber">
            <span>&#9990;</span>
            <span>912121131313</span>
          </div>
          <div className="offerdisplay">
            Get 50% off on selected items | Shop Now
          </div>
          <div className="logout_btn">
            <Link
              to={"/"}
              onClick={() => {
                localStorage.clear();
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
                <span>
                  <Link to={"/checkout"}>Checkout</Link>
                </span>
              </div>
            </div>
            {isUserVerified && (
              <div className="cartbuton">
                <button onClick={() => navigate("/cart")}>
                  {" "}
                  <i className="fas fa-shopping-cart"></i>
                  <span>View Cart</span>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="back_to_products_btn">
          <button onClick={(e) => navigate("/")}>back to products</button>
        </div>
        <div className="leftarrow">
        <p onClick={() => navigate("/cart") } className="far fa-arrow-alt-circle-left"></p>
      </div>
        <div className="mycart">
        
          <h2>Checkout </h2>
        </div>
        <div className="middle_body_container">
          <div className="middle_body_left_cntainer">
            <div className="delivery_details">
              <div className="dellivery_address_title">
                <h3>1. Delivery address</h3>
              </div>
              <div className="delivery_address">
                <p>Akash Patel 104 kk hh nagar, Lucknow Uttar Pradesh 226025</p>
              </div>
            </div>
            <hr />
            <div className="payment_method_details">
              <div className="payment_method_title">
                <h3>2. Payment method</h3>
              </div>
              <div className="payment_method">
                <p>Pay on delivery ( Cash/Card)</p>
              </div>
            </div>
            <hr />
            <div className="review_items_delivery_details">
              <div className="review_items_delivery_title">
                <h3>3. Review items and delivery</h3>
              </div>
              <div className="review_items_delivery">
                {products.productsInCart.map((item, index) => (
                  <div className="review_items" key={index}>
                    <div className="review_img">
                      <img src={item.img} alt="" />
                      <h4>{item.model}</h4>
                      <p>colour: {item.colour}</p>
                      <p> {item.available}</p>
                      <h5>
                        Estimated delivery : Monday — FREE Standard Delivery
                      </h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="middle_body_right_container">
            <div className="place_your_order">
              <button onClick={successHandler}>Place your order</button>
              <p>
                By placing your order, you agree to Musicart privacy notice and
                conditions of use.
              </p>
            </div>
            <hr />
            <div className="ordersummery_details">
                <div className="ordersummery_title">
                    <h3>Order Summary</h3>
                </div>
                <div className="review_items">
                    <p>item :</p>
                    <p>₹{totalMRP}</p>
                </div>
                <div className="delivery_fee">
                    <p>Delivery : </p>
                    <p>₹{products.productsInCart.length && 45.00}</p>
                </div>
                <hr />
                <div className="orderTotal">
                    <h3>Order Total : </h3>
                    <h3>{totalAmount}</h3>
                </div>
            </div>
          </div>
        </div>
        <div className="bottom_orderamount_order_btn">
            <div className="place_order_btn">
                <button onClick={successHandler}>Place your order</button>
            </div>
            <div className="total_amount_terms">
                <div className="total_order_amount">
                    <h3>Order Total : {totalAmount}</h3>
                </div>
                <div className="notice_privacy">
                By placing your order, you agree to Musicart privacy notice and conditions of use.
                </div>
            </div>
        </div>

        
      </div>
      <div className="closure">
          <p>Musicart | All rights reserved</p>
        </div>
        <div className="home_cart_logout">
        
        <div  className= "displayoriginal" onClick={() => {navigate("/"); setHighlight_btn({...highlight_btn, home: true, cart: false})}}>
        <i class="fas fa-home"></i>
        <p>Home</p>
        </div>
        {isUserVerified && <div className="displayoriginal"  onClick={() => {navigate("/cart");setHighlight_btn({...highlight_btn, cart: true, home: false})}}>
        <i class='fas fa-cart-plus'></i>
        <p>Cart</p>
        </div>  }
        {isUserVerified ? <div className="logout_res" onClick={() => {localStorage.clear();setIsUserVerified("")}}>
        <i class="fa fa-sign-out"></i>
        <p>Logout</p>
        </div> : <div className="login_res" onClick={() => navigate("/login")}>
          <i className="far fa-user-circle"></i>
          <p>Login</p>
          </div> }
      </div>
    </div>
  );
}

export default Checkout;
