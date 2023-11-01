import React, { useState, useEffect } from "react";
import ProductPage_Mobile from "./ProductPage_Mobile";
import ProductPage from "./ProductPage";

const ResponsiveProductPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update screenWidth state on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <>{screenWidth <= 890 ? <ProductPage_Mobile /> : <ProductPage />}</>;
};

export default ResponsiveProductPage;
