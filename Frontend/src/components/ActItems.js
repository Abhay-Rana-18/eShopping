import React, { useContext, useEffect } from "react";
import ProductContext from "../context/product/productContext";
import AtcComp from "./AtcComp";
import check from "../images/checked.png";
import { Navigate, useNavigate } from "react-router-dom";

const ActItems = () => {
  const navigate = useNavigate();
  let bill = 0;
  let discount = 0;
  let { atcproducts, plusAtc, minusAtc, getAllatc, delAtc, orderPlaced } =
    useContext(ProductContext);
  useEffect(() => {
    getAllatc();
    // orderPlaced();
  }, []);
  const relocate = () => {
    orderPlaced();
    navigate("/order");
  }
  return (
    <div className="w-100vw">
      {atcproducts.map((product) => {
        bill += product.price * product.amount * 80;
        discount += parseInt(
          ((product.discountPercentage * product.price) / 100) * 80
        );
        return (
          <>
            <div className="atcItems" key={product._id}>
              <AtcComp
                product={product}
                delAtc={delAtc}
                plusAtc={plusAtc}
                minusAtc={minusAtc}
              />
            </div>
          </>
        );
      })}
      <div className="bill">
        <h3 className="head">Price Details</h3>
        <div className="details flex">
          <div className="left">
            <p>Price ({atcproducts.length} items)</p>
            <p>Discount</p>
            <p>Delivery Charges</p>
          </div>
          <div className="right">
            <p>
              {"\u20B9"} {bill + discount}
            </p>
            <p className="text-red-700">
              - {"\u20B9"}
              {discount}
            </p>
            <span className="cut">
              {"\u20B9"} {atcproducts.length * 50}
            </span>
            <span className="ml-3 text-green-600">Free</span>
          </div>
        </div>
        <div className="flex total">
          <h2 className="ml-5">Total Amount</h2>
          <h3 className="ml-20 text-black">
            {"\u20B9"} {bill}
          </h3>
        </div>
        <div className="savings">
          <p className="text-green-700">
            You will save {"\u20B9"}
            {discount} on this order.
          </p>
        </div>
        <button className="btn btn-success mt-3 w-100 placeOrder" onClick={relocate} >
          <img className="check w-7 mr-1" src={check} alt="" /> Place Order
        </button>
      </div>
    </div>
  );
};

export default ActItems;
