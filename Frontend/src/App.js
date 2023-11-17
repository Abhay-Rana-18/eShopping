import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes, useLoaderData } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Phone_num from "./components/Phone_num";

// context api
import ProductState from "./context/product/productState";
import Addproduct from "./components/Addproduct";
import ActItems from "./components/ActItems";
import ProductPage from "./components/ProductPage";
import CategoryProduct from "./components/CategoryProduct";
import SerachItems from "./components/SerachItems";
import PlaceOrder from "./components/order";

import { Cloudinary } from "@cloudinary/url-gen";
import TagWiseProducts from "./components/TagWiseProducts";
import ResponsiveProductPage from "./components/ResponsiveProductPage";

// Loding Bar
import LoadingBar from "react-top-loading-bar";

function App() {
  let [progress, setProgress] = useState(0);

  return (
    <>
      <ProductState>
        <BrowserRouter>
          
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="/login" element={<Login />}></Route>
            <Route exact path="/register" element={<Signup />}></Route>
            <Route exact path="/addProduct" element={<Addproduct />}></Route>
            <Route exact path="/atcItems" element={<ActItems />}></Route>
            <Route
              exact
              path="/productPage/:id"
              element={<ResponsiveProductPage />}
            ></Route>
            <Route exact path="/buy" element={<Phone_num />}></Route>
            <Route
              exact
              path="/category/:cat"
              element={<CategoryProduct />}
            ></Route>
            <Route exact path="/tag/:tag" element={<TagWiseProducts />}></Route>
            <Route
              exact
              path="/searchedProducts/:query"
              element={<SerachItems />}
            ></Route>
            <Route
              exact
              path="/order"
              element={<PlaceOrder />}
            ></Route>
          </Routes>
        </BrowserRouter>
      </ProductState>
    </>
  );
}

export default App;
