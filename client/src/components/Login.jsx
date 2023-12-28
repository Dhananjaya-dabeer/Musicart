import React, { useState } from "react";
import logo from "../assets/logo.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [usrDetails, setUserDetails] = useState({
    email_mobile: "",
    password: ""
  })
  const navigate = useNavigate()

  const siginHandler = async (e) => {
    e.preventDefault()
   const response = await axios.post("http://localhost:3000/api/v1/users/signin",usrDetails)
   try {
    if(response){
      localStorage.setItem("name", JSON.stringify(response.data.userName))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      alert(response.data.message)
      
      if(response.data.status == "success") {
        navigate("/")
      }
    }
     
   } catch (error) {
    
   }
  }
  return (
    <div className="loginpage">
     
        <div className="loginheadercontainer">
          <div className="loginheader">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="header">
              <h2>Musicart</h2>
            </div>
          </div>
        </div>
        <form  onSubmit={siginHandler}>
        <div className="loginbodycontainer">
          <div className="logininputcontainer">
            <div className="logininputinnercontainer">
              <div className="loginbodyheader">
                <h2>Sign in </h2>
              </div>
              <div className="logininputs">
                <div className="emailormobile">
                  <label htmlFor="email_mobile">
                    Enter your email or mobile number
                  </label>
                  <input type="text" id="email_mobile" onChange={(e) => setUserDetails({...usrDetails,email_mobile:e.target.value})} />
                </div>
                <div className="loginpassword">
                  <label htmlFor="password">Password</label>
                  <input type="text" id="password" onChange={(e) => setUserDetails({...usrDetails, password: e.target.value})} />
                </div>
              </div>
              <div className="logincontinue_btn">
                <button>Continue</button>
              </div>
              <div className="logintermsandcondition">
                <p>
                  By continuing, you agree to Musicart privacy notice and
                  conditions of use.
                </p>
              </div>
            </div>
          </div>

          <div className="newuser">
            <span></span>
            <p>New to Musicart?</p>
            <span></span>
          </div>
          <div className="signuppagerouter">
            <Link to={"/signup"}>
              <button>Create your Musicart account</button>
            </Link>
          </div>
        </div>
        </form>
        <div className="closure"><p>Musicart | All rights reserved</p></div>
      
    </div>
  );
}

export default Login;
