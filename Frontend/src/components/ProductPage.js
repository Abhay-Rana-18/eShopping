import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../context/product/productContext";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";

import buyImg from "../images/buy.png";
import atcImg from "../images/atc.png";

const ProductPage = () => {
  const { open, setOpen, getAtc, checkAtc, getitem } =
    useContext(ProductContext);
  const navigate = useNavigate();
  let [atcText, setAtcText] = useState("Add to Cart");

  // alert
  let [alert, setAlert] = useState(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isbuyHovered, setIsbuyHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlebuyMouseEnter = () => {
    setIsbuyHovered(true);
  };

  const handlebuyMouseLeave = () => {
    setIsbuyHovered(false);
  };

  // alert function
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleClick = async () => {
    check();
    showAlert("Item added to cart successfully", "success");
    getAtc(open._id);
    let result = await checkAtc(open._id);
    if (result === true) {
      navigate("/atcItems");
    }
  };

  const check = async () => {
    let result = await checkAtc(open._id);
    if (result === true) {
      setAtcText("Go to cart");
    } else {
      setAtcText("Add to cart");
    }
  };

  const handleBuy = async () => {
    // navigate("/buy");
  };

  useEffect(() => {
    getitem(localStorage.getItem("id"));
    check();
  }, [handleClick]);

  return (
    <div className="w-100vw">
      {/* Alert */}
      {alert ? <Alert alert={alert} /> : ""}

      <div className="Container">
        <div className="align">
          <div className="multipleImages">
            {open && open.images && (
              <img src={open.images[0]} alt="" className="product-logo" />
            )}
            {open && open.images && (
              <div className="miSection">
                <img src={open.images[1]} alt="" id="mi1" className="mi" />
                <img src={open.images[2]} alt="" id="mi2" className="mi" />
                <img src={open.images[3]} alt="" id="mi3" className="mi" />
              </div>
            )}
          </div>

          <header className="header">
            <div className="head">
              <h1 className="title">{open.title}</h1>
              <p className="colorCat" id="brand">
                {open.brand}
              </p>
              <div className="price">
                <span className="current">
                  {"\u20B9"}
                  {open.price * 80}
                </span>
                <span className="before">
                  {"\u20B9"}
                  {parseInt(
                    (open.price +
                      open.price * (open.discountPercentage / 100)) *
                      80
                  )}
                </span>
              </div>
            </div>
            <span className="dis">{open.discountPercentage}% off</span>

            <div className="rate" id="rate">
              <Link to="#!" className={open.rating >= 1 ? "active" : "null"}>
                ★
              </Link>
              <Link to="#!" className={open.rating >= 2 ? "active" : "null"}>
                ★
              </Link>
              <Link to="#!" className={open.rating >= 3 ? "active" : "null"}>
                ★
              </Link>
              <Link to="#!" className={open.rating >= 4 ? "active" : "null"}>
                ★
              </Link>
              <Link to="#!" className={open.rating >= 5 ? "active" : "null"}>
                ★
              </Link>
            </div>

            {buyImg && "http://co0kie.github.io/codepen/nike-product-page/cart.png" && <div className="footer">
              <button
                type="button"
                id="addToCart"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
              >
                {isHovered ? (
                  <div className="i1">
                    <img
                      src={atcImg}
                      alt=""
                    />
                  </div>
                ) : (
                  <span>{atcText}</span>
                )}
              </button>

              <button
                type="button"
                id="buy"
                onClick={handleBuy}
                onMouseEnter={handlebuyMouseEnter}
                onMouseLeave={handlebuyMouseLeave}
              >
                {isbuyHovered ? (
                  <div className="i2">
                    <img
                      src={buyImg}
                      alt=""
                    />
                  </div>
                ) : (
                  <span>Buy Now</span>
                )}
              </button>
              {/* <Link to="#!">
                <img
                  src="http://co0kie.github.io/codepen/nike-product-page/share.png"
                  alt=""
                />
              </Link >*/}
            </div>}
          </header>
        </div>

        <div className="product-details">
          <article>
            <h5>Description</h5>
            <p>{open.description}</p>
          </article>
          <div className="controls">
            <div className="qty">
              <h5>QTY</h5>
              <Link to="#!" className="option">
                ({open.stock})
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

{
  /* <div className="product-image">
  {open && open.images && (
    <img src={open.images[1]} alt="" className="product-logo" />
    )
  }

  <div className="dots">
    <Link to="#!" className="active">
      <i>1</i>
    </Link >
    <Link to="#!">
      <i>2</i>
    </Link >
    <Link to="#!">
      <i>3</i>
    </Link >
    <Link to="#!">
      <i>4</i>
    </Link >
  </div>
</div> */
}
