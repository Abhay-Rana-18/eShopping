import React, { useEffect, useContext, useState } from "react";
import FProduct from "./FProduct";
import ProductContext from "../context/product/productContext";
import Loading from "./Loading";

const Home = () => {
  let [loading, setLoading] = useState(true);

  let context = useContext(ProductContext);
  let { products, setProducts } = context;
  const getProduct = async () => {
    const host = "http://localhost:5000";
    // API call
    setLoading(true);
    let response = await fetch(`${host}/eShopping/products/fetchallproducts`, {
      method: "GET",
    });

    var json = await response.json();

    setProducts(json);
    setLoading(false);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && <FProduct />}
    </>
  );
};

export default Home;
