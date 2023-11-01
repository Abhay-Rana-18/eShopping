import React, {useContext} from "react";
import ProductContext from "../context/product/productContext";
import { useNavigate } from "react-router-dom";

const LogOut_modal = () => {
  const { setOutModal } = useContext(ProductContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="blurr">
        <div className="dbox">
          <img
            src="https://cdn.pixabay.com/photo/2012/04/16/13/51/sign-36070_1280.png"
            alt="#"
          />
          <h3>Are you sure to logout from this id?</h3>

          <div className="Confirm">
            <div
              className="btn btn-danger btn-sm yes"
              onClick={() => {
                localStorage.removeItem("token");
                setOutModal(false);
                navigate("/login");
              }}
            >
              Yes
            </div>
            <div
              className="btn btn-success btn-sm no"
              onClick={() => {
                setOutModal(false);
              }}
            >
              No
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogOut_modal;
