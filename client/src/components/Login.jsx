import React from "react";
import logo from "../assets/logo.png";
import "./Login.css";
import { Link } from "react-router-dom";
function Login() {
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
                  <input type="text" id="email_mobile" />
                </div>
                <div className="loginpassword">
                  <label htmlFor="password">Password</label>
                  <input type="text" id="password" />
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

        <div className="closure"><p>Musicart | All rights reserved</p></div>
      
    </div>
  );
}

export default Login;
