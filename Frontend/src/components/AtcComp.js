import React from "react";
import Product from "./FProduct";
import { Link } from "react-router-dom";

const AtcComp = (props) => {
  let { product, delAtc, plusAtc, minusAtc } = props;

  const handlePlus = () => {
    plusAtc(product._id);
  };

  const handleMinus = () => {
    minusAtc(product._id);
  };

  return (
    <>
      <div className="item">
        <div className="atcImg">
          <img src={product.imgUrl} alt="#" />
        </div>
        <div className="atcBody">
          <h3>{product.title}</h3>

          <div className="rate atcStars">
            <Link to="#!" className={product.rating >= 1 ? "active" : "null"}>
              ★
            </Link>
            <Link to="#!" className={product.rating >= 2 ? "active" : "null"}>
              ★
            </Link>
            <Link to="#!" className={product.rating >= 3 ? "active" : "null"}>
              ★
            </Link>
            <Link to="#!" className={product.rating >= 4 ? "active" : "null"}>
              ★
            </Link>
            <Link to="#!" className={product.rating >= 5 ? "active" : "null"}>
              ★
            </Link>
          </div>

          <h5>
            {"\u20B9"}
            {product.price * 80} &nbsp;
          </h5>
          <h5 className="cut">
            {"\u20B9"}
            {parseInt(
              product.price * 80 +
                (product.discountPercentage * product.price) / 100
            )}
          </h5>
          <div className="atcBtn mt-4">
            <button
              className="btn btn-light bg-blue-100 pt-0 pb-0"
              id="b1"
              onClick={handleMinus}
            >
              -
            </button>
            <div className="btn quant">Qty {product.amount}</div>
            <button
              className="btn btn-light bg-blue-100 pt-0 pb-0"
              id="b2"
              onClick={handlePlus}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-sm remove"
            onClick={() => {
              delAtc(product._id);
            }}
          >
            Remove
          </button>
          {/* <i
            className="far fa-trash-alt"
            id="delAtc"
            onClick={() => {
              delAtc(product._id);
            }}
          ></i> */}
        </div>
      </div>
    </>
  );
};

export default AtcComp;
