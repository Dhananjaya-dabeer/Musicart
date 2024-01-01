import React, { useEffect } from 'react'
import logo from "../assets/logo.png"
import "./Success.css"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function SuccessPage() {
    const navigate = useNavigate()
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
    </div>
  )
}

export default SuccessPage