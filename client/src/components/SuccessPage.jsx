import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import "./Success.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function SuccessPage() {
  const [isUserVerified, setIsUserVerified] = useState("")
    const navigate = useNavigate()
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
    <div className="successpage">
       <div className="header1">
          <div className="company_header">
            <div className="lefthomeheader">
              <div className="company_logo">
                <img src={logo} alt="" />
              </div>
              <div className="companyname">
                <h2>Musicart</h2>
              </div>              
            </div>
            
          </div>
        </div>
        <div className="success_div_container">
        <div className="suuccess_div">
            <div className="success_img_container">
                <img src="https://lordicon.com/icons/wired/flat/1103-confetti.gif" alt="" />
            </div>
            <div className="order_placed_text">
                <h2>Order is placed successfully!</h2>
                <p>You  will be receiving a confirmation email with order details</p>
            </div>
            <div className="go_back_to_home_btn">
                <button onClick={() => navigate("/")}>Go back to Home page</button>
            </div>
        </div>
        
        </div>
        <div className="closure">
        <p>Musicart | All rights reserved</p>
      </div>
      <div className="home_cart_logout">
        
        <div  className="displayoriginal" onClick={() => {navigate("/"); setHighlight_btn({...highlight_btn, home: true, cart: false})}}>
        <i class="fas fa-home"></i>
        <p>Home</p>
        </div>
        {isUserVerified && <div className= "displayoriginal"  onClick={() => {navigate("/cart");setHighlight_btn({...highlight_btn, cart: true, home: false})}}>
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
  )
}

export default SuccessPage
