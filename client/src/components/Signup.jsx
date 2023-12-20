import React from "react";
import logo from "../assets/logo.png";
import "./Signup.css";
import { Link } from "react-router-dom";
function Signup() {
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
      <div className="bodycontainer">
        <div className="body">
          <div className="bodyheader">
            <h2>Create Account</h2>
          </div>
          <div className="inputcontainer">
            <div className="nameinput">
              <label htmlFor="name">Your name</label>
              <input type="text" />
            </div>
            <div className="mobilenumber">
              <label htmlFor="mobile">Mobile number</label>
              <input type="number" />
            </div>
            <div className="email">
              <label htmlFor="email">Email Id</label>
              <input type="email" />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input type="password" />
            </div>
            <div className="agrement">
              <p>
                By enrolling your mobile phone number,you consent  to receive <br/>
                automated security notifications via text  message from Musicart.  <br/>
                Message and data rates  may apply.
              </p>
            </div>
            <div className="continue_button">
                <button>Continue</button>
            </div>
            <div className="termsand_condition">
                <p>By continuing, you agree to Musicart privacy notice and conditions  <br /> of use.</p>
            </div>

          </div>
        </div>
      </div>
      <div className="signinroute">
      <p>Already have an account? <Link to={"/login"}>Sign in</Link></p>
      </div>
      <div className="allrights_reserved">
        <p>Musicart | All rights reserved</p>
      </div>
    </div>
  );
}

export default Signup;
