import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    mobile: "",
    email: "",
    password: ""
  })
  
  const navigate = useNavigate()

  const signUpHandler = async(e) => {
    e.preventDefault()
   
      if(!userDetails.name || !userDetails.mobile || !userDetails.email || !userDetails.password){
       return alert("all fields are required")
    }
    const response = await axios.post(`https://musicart-hfqw.onrender.com/api/v1/users/register`,userDetails)
    console.log(response.data)
   
    if(response.data.status == "Success"){
      localStorage.setItem("name",JSON.stringify(response.data.userName))
      localStorage.setItem("token",JSON.stringify(response.data.token))
      navigate("/")
    }
    else {
      alert(response.data.message)
    }
   
    
    
      
    
  }

  return (
    <div className="signuppage">
      <div className="headercntainer">
        <div className="header">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="websitename">
            <h2>Musicart</h2>
          </div>
        </div>
      </div>
        <div className="welcome_text">
          <p>Welcome</p>
        </div>
      <div className="bodycontainer">
        <div className="body">
          <div className="bodyheader">
            <h2>Create Account <span>Don’t have an account?</span></h2> 
          </div>
          <div className="inputcontainer">
            <form onSubmit={signUpHandler}>
            <div className="nameinput">
              <label htmlFor="name">Your name</label>
              <input type="text" value={userDetails.name} onChange={(e) =>setUserDetails({...userDetails,name:e.target.value})} />
            </div>
            <div className="mobilenumber">
              <label htmlFor="mobile">Mobile number</label>
              <input type="number" value={userDetails.mobile} onChange={(e) => setUserDetails({...userDetails, mobile:e.target.value})}/>
            </div>
            <div className="email">
              <label htmlFor="email">Email Id</label>
              <input type="email" value={userDetails.email} onChange={(e) => setUserDetails({...userDetails, email:e.target.value})}/>
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" value={userDetails.password} onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}/>
            </div>
            
            <div className="agrement">
              <p>
                By enrolling your mobile phone number,you consent  to receive
                automated security notifications via text  message from Musicart. 
                Message and data rates  may apply.
              </p>
            </div>
            <div className="continue_button">
                <button type="submit">Continue</button>
            </div>
            </form>
            <div className="termsand_condition">
                <p>By continuing, you agree to Musicart privacy notice and conditions of use.</p>
            </div>

          </div>
        </div>
      </div>
      <div className="signinroute">
      <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
      </div>
      <div className="closure">
        <p>Musicart | All rights reserved</p>
      </div>
    </div>
  );
}

export default Signup;
