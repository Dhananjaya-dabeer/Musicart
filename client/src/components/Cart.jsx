import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Cart.css";
import axios from "axios";
import { useProductContext } from "./ProductContext/ProductContext";
function Cart() {
  const navigate = useNavigate();
  const [response, setResponse] = useState([]);
  const { products, setProducts } = useProductContext();
  const [highlight_btn,setHighlight_btn] = useState({
    home: false,
    cart: true,
  })
  const totalMRP = response.map((item) =>
    item.total ? item.total : item.price
  );
  const[isUserVerified,setIsUserVerified] = useState("")


  const clearCartHandler = () => {
    axios.post(`https://musicart-hfqw.onrender.com/api/v1/users/deletecart`, {userId: JSON.parse(localStorage.getItem("userId"))})
    setResponse([])
  }

  useEffect(() => {
    ;(async () => {
      const response = await axios.get(
        `https://musicart-hfqw.onrender.com/api/v1/users/cart`
      );
      try {
        const userId = JSON.parse(localStorage.getItem("userId"));
        const responseUserId = response.data.cartItems.filter(
          (item) => item.userId === userId
        );
        // console.log(responseUserId[0].product_id);

        const displayResponse = await axios.get(
          `https://musicart-hfqw.onrender.com/api/v1/users/data?productIds=${responseUserId[0].product_id}`
        );
        setResponse(displayResponse.data.cartItems);
        // if(products.cartAmount == 0 ){
        //   setProducts({...products, cartAmount: totalMRP.reduce((acc,curr) => (acc + curr),0) + 45})
        // }
      } catch (error) {
        console.log(error);
      }
    })();
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
  }, []);

  const handleQuantityChange = (index, event) => {
    const newResponse = [...response];
    newResponse[index].selectedQuantity = parseInt(event.target.value, 10);

    // Update the total based on the selected quantity
    newResponse[index].total =
      newResponse[index].price * newResponse[index].selectedQuantity;

    setResponse(newResponse);

    const newCartAmount =
      newResponse.reduce(
        (accumulator, currentItem) =>
          accumulator +
          (currentItem.total ? currentItem.total : currentItem.price),
        0
      ) + 45;
    console.log("newResponse:", newResponse);
    console.log("newCartAmount:", newCartAmount);
    setProducts({ ...products, cartAmount: newCartAmount });
  };

  const placeOrderHandler = () => {
    console.log(products);
    setProducts({ ...products, productsInCart: [...response] });
    if (products.productsInCart) {
      navigate("/checkout");
    }
    
    //  if(products.cartAmount == 0 ){
    //         setProducts({...products, cartAmount: totalMRP.reduce((acc,curr) => (acc + curr),0) + 45});
    //         navigate("/checkout")
    //       }
  };
  
  

  return (
    <div className="cartpage">
      <div className="cartpage_container">
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
                <Link to={"/"}>Home /</Link>
              </div>
              <div className="viewcart">
                <Link to={"/cart"}>View Cart</Link>
              </div>
            </div>
            <div className="clearcart">
              <button onClick={clearCartHandler}>Clear cart</button>
            </div>
          </div>
        </div>
        <div className="back_to_products_btn">
          <button onClick={(e) => navigate("/")}>back to products</button>
        </div>
        <div className="leftarrow">
          <div className="leftarrow">
        <p onClick={() => navigate("/") } className="far fa-arrow-alt-circle-left"></p>
      </div>
        </div>
        <div className="mycart">
          <h2>
            {" "}
            <i className="fas fa-shopping-bag"></i> My Cart{" "}
          </h2>
        </div>
        <div className="cartitemContainer">
          <div className="cartitems">
            {response.map((item, index) => (
              <div className="elements" key={index}>
                <div className="elements_container">
                  <div className="cartimgs">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="model_color">
                    <h3>{item.model}</h3>
                    <p>colour: {item.colour}</p>
                    <p>{item.available}</p>
                  </div>
                  <div className="itemprice">
                    <h3>Price</h3>
                    <p>{item.price}</p>
                  </div>
                  <div className="quantity">
                    <h3>Quantity</h3>
                    <select
                      name=""
                      id=""
                      onChange={(e) => handleQuantityChange(index, e)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                  </div>
                  <div className="total">
                    <h3>Total</h3>
                    <p>{item.total ? item.total : item.price}</p>
                  </div>
                </div>

                <div className="upperoutline"></div>
              </div>
            ))}
          </div>
          <div className="cartitems_rs">
          {response.map((item, index) => (
              <div className="elements" key={index}>
                <div className="elements_container">
                  <div className="cartimgs">
                    <img src={item.img} alt="" />
                  </div>
                  <div className="model_color">
                    <h3>{item.model}</h3>
                    <div className="itemprice">
                    <h3>₹{item.price}</h3>
                  </div>
                    <p>colour: {item.colour}</p>
                    <p>{item.available}</p>
                    <div className="quantity">
                    <h3>Quantity</h3>
                    <select
                      name=""
                      id=""
                      onChange={(e) => handleQuantityChange(index, e)}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    <div className="total">
                    <h2>Total: </h2>
                    <h2> ₹{item.total ? item.total : item.price}</h2>
                  </div>
                  </div>
                  </div>               
                </div>

                <div className="upperoutline"></div>
              </div>
            ))}
          </div>
          <div className="totalamountcontainer2">
                <h2>Total Amount</h2>
                <h2>₹{
                   response.length && totalMRP.reduce(
                      (accumulator, currentvalue) => accumulator + currentvalue,
                      0
                    ) +  45
                  }</h2>
              </div>
              <div className="convinece_fee_msg">
                <h3>(including convience-fee ₹45)</h3>
              </div>
              <div className="placerder2">
              <button onClick={placeOrderHandler}>PLACE ORDER</button>
            </div>
            <div className="home_cart_logout">
        
        <div  className={highlight_btn.home ? "home_res highlight" : "displayoriginal"} onClick={() => {navigate("/"); setHighlight_btn({...highlight_btn, home: true, cart: false})}}>
        <i class="fas fa-home"></i>
        <p>Home</p>
        </div>
        {isUserVerified && <div className={highlight_btn.home ? "displayoriginal" : "cart_res highlight"  }  onClick={() => {navigate("/cart");setHighlight_btn({...highlight_btn, cart: true, home: false})}}>
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
          <div className="right_side_cart_comp">
            <div className="productDetails">
              <div className="product_details_header">
                <h3>Product Details</h3>
              </div>
              <div className="totalMRP">
                <h3>Total MRP</h3>
                <p>
                  {totalMRP.reduce(
                    (accumulator, currentvalue) => accumulator + currentvalue,
                    0
                  )}
                </p>
              </div>
              <div className="discountMRP">
                <h3>Discout on MRP</h3>
                <p>0</p>
              </div>
              <div className="convience_fee">
                <h3>Convenience Fee</h3>
                <p>{response.length && 45}</p>
              </div>
            </div>
            <div className="totalamount">
              <div className="totalamountcontainer">
                <h2>Total Amount</h2>
                <p>{
                   response.length && totalMRP.reduce(
                      (accumulator, currentvalue) => accumulator + currentvalue,
                      0
                    ) +  45
                  }</p>
              </div>
            </div>
            <div className="placerder">
              <button onClick={placeOrderHandler}>PLACE ORDER</button>
            </div>
          </div>
        </div>
        <div className="closure">
          <p>Musicart | All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
