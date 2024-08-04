import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../context/product/productContext";
import { Link, useNavigate } from "react-router-dom";
import Alert from "./Alert";

const ProductItem = (props) => {
  // alert

  let [alert, setAlert] = useState(null);

  // alert function


  const { product, updateProduct, deleteItem } = props;
  const { productClick, setDModal, setDel_id } =
    useContext(ProductContext);

  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("id", product._id);
    productClick(product._id);
    navigate(`/productPage/${product._id}`);
  };

  return (
    <>
      {/* Alert */}

      <Alert alert={alert} />

      <div className={product.discountPercentage>15 ? "product" : "card"}>
        <div className="cardd p-2" style={{ width: "15rem" }}>
          <div className="card-img-top" onClick={handleClick}>
            {product.images[0] && product.images[1] && (
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img
                    src={product.images[0]}
                    className="img"
                    id="myImage"
                    alt="..."
                  />
                </div>
                <div className="flip-card-back">
                  <img
                    src={product.images[1]}
                    className="img"
                    id="myImage"
                    alt="..."
                  />
                </div>
              </div>
            )}
          </div>

          <div className="card-body">
            <div className="h" onClick={handleClick}>
              <div className="flex">
                <h5 className="card-title">{product.title}</h5>
                {/* <h4 className="discount">{product.discountPercentage}%</h4> */}
              </div>

              <div className="rate stars">
                <Link
                  to="#!"
                  className={product.rating >= 1 ? "active" : "null"}
                >
                  ★
                </Link>
                <Link
                  to="#!"
                  className={product.rating >= 2 ? "active" : "null"}
                >
                  ★
                </Link>
                <Link
                  to="#!"
                  className={product.rating >= 3 ? "active" : "null"}
                >
                  ★
                </Link>
                <Link
                  to="#!"
                  className={product.rating >= 4 ? "active" : "null"}
                >
                  ★
                </Link>
                <Link
                  to="#!"
                  className={product.rating >= 5 ? "active" : "null"}
                >
                  ★
                </Link>
              </div>

              <div className="flexbox">
                
                <p className={product.discountPercentage < 10 ? 'card-text mrp m-l-lg noDis' : "card-text mrp m-l-sm"} >
                  {"\u20B9"}
                  {product.price * 80}
                </p>

                { product.discountPercentage < 10 ? "" :
                <p className="card-text Dis">
                  {parseInt(product.discountPercentage)}% off
                </p>
                }
              </div>

              <p className="card-text brand">
                <strong>Brand:</strong> {product.brand}
                {/* {product.stock} pieces{" "}
                <span className="text-danger">left</span>{" "} */}
                {/* {product.category} */}
              </p>
            </div>

            {localStorage.getItem("isAdmin") && (
              <div>
                <i
                  className="far fa-trash-alt"
                  id="delete"
                  onClick={() => {
                    deleteItem(product._id);
                    setDModal(true);
                  }}
                ></i>
                <i
                  className="far fa-edit position-absolute end-1"
                  id="update"
                  onClick={() => {
                    setDel_id(product._id);
                    updateProduct(product);
                  }}
                ></i>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
