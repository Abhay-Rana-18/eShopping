import React, { useContext } from "react";
import ProductContext from "../context/product/productContext";

const DeleteModal = (props) => {
  const { deleteProduct, setDModal } = useContext(ProductContext);
  return (
    <div className="blurr">
      <div className="dbox">
        <img
          src="https://cdn.pixabay.com/photo/2012/04/16/13/51/sign-36070_1280.png"
          alt="#"
        />
        <h3>Are you sure?</h3>
        <p>Once you delted the product this never be undo.</p>

        <div className="Confirm">
          <div
            className="btn btn-danger btn-sm yes"
            onClick={() => {
              deleteProduct(props.id);
              setDModal(false);
            }}
          >
            Yes
          </div>
          <div
            className="btn btn-success btn-sm no"
            onClick={() => {
              setDModal(false);
            }}
          >
            No
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
