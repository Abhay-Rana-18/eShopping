import React, { useState, useContext } from "react";
import ProductContext from "../context/product/productContext";
import Alert from "./Alert";

const Addproduct = () => {
  const { addProduct } = useContext(ProductContext);
  let [newProduct, setNewProduct] = useState({
    id: "",
    title: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    price: "",
    description: "",
    rating: "",
    discountPercentage: "",
    brand: "",
    category: "",
    stock: "",
    tag: "",
  });

  // const handleChange = (e) => {
  //   if (e.target.name === "Images[]") {
  //     // Handle Images input separately
  //     const Images = e.target.value.split(",");
  //     setNewProduct({ ...newProduct, Images });
  //   } else {
  //     setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  //   }
  // };

  // alert
  let [alert, setAlert] = useState(null);

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

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    showAlert("Item added succesfully!", "success");
    addProduct(
      newProduct.id,
      newProduct.title,
      newProduct.img1,
      newProduct.img2,
      newProduct.img3,
      newProduct.img4,
      newProduct.price,
      newProduct.description,
      newProduct.rating,
      newProduct.discountPercentage,
      newProduct.brand,
      newProduct.category,
      newProduct.stock,
      newProduct.tag,
    );
  };

  return (
    <div className="form-add bg-light mt-4 p-3">
      {/* alert */}
      {alert ? <Alert alert={alert} />: ""}
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Product Name:{" "}
        </label>
        <input
          type="text"
          className="form-control w-50"
          id="title"
          name="title"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="price" className="form-label">
          Price:{" "}
        </label>
        <input
          type="number"
          className="form-control w-50"
          name="price"
          id="price"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="stock" className="form-label">
          Stock:{" "}
        </label>
        <input
          type="number"
          className="form-control w-50"
          id="stock"
          name="stock"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="rating" className="form-label">
          Rating:{" "}
        </label>
        <input
          type="number"
          className="form-control w-50"
          id="rating"
          name="rating"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="description" className="form-label">
          Description:{" "}
        </label>
        <input
          type="text"
          className="form-control w-50"
          id="description"
          name="description"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="discountPercentage" className="form-label">
          Discount Percentage:{" "}
        </label>
        <input
          type="number"
          className="form-control w-50"
          id="discountPercentage"
          name="discountPercentage"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="brand" className="form-label">
          Brand:{" "}
        </label>
        <input
          type="text"
          className="form-control w-50"
          id="brand"
          name="brand"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="category" className="form-label">
          Category:{" "}
        </label>
        <input
          type="text"
          className="form-control w-50"
          id="category"
          name="category"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="tag" className="form-label">
          Tag:{" "}
        </label>
        <input
          type="text"
          className="form-control w-50"
          id="tag"
          name="tag"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="img1">Enter image 1:</label>
        <input type="text" name="img1" id="img1" onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label htmlFor="img2">Enter image 2 :</label>
        <input type="text" name="img2" id="img2" onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label htmlFor="img3">Enter image 3 :</label>
        <input type="text" name="img3" id="img3" onChange={handleChange} />
      </div>
      <div className="mb-2">
        <label htmlFor="img4">Enter image 4 :</label>
        <input type="text" name="img4" id="img4" onChange={handleChange} />
      </div>

      <button
        type="submit"
        className="btn btn-primary bg-primary my-2"
        onClick={handleClick}
      >
        Add new Product
      </button>
    </div>
  );
};

export default Addproduct;
