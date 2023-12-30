import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ProductContext, { useProductContext } from "./components/ProductContext/ProductContext";

import Homepage_common from "./components/Homepage_common";
import Productdetails from "./components/Productdetails";
import Cart from "./components/Cart";

function App() {
  const initialState = useProductContext()
  const [products, setProducts] = useState(initialState)
  
  return (
    <ProductContext.Provider value={{products, setProducts}}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage_common />} />
            <Route path="/productdetails" element = {<Productdetails/>} />
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ProductContext.Provider>
  );
}

export default App;
