import React, { useContext, useRef, useState } from "react";
import ProductContext from "../context/product/productContext";
import ProductItem from "./ProductItem";

const SerachItems = () => {
  const { searchResults, editProduct } = useContext(ProductContext);
  let [product, setProduct] = useState({
    _id: "",
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
  });

  const handleClick = (e) => {
    e.preventDefault();
    editProduct(
      product._id,
      product.id,
      product.title,
      product.img1,
      product.img2,
      product.img3,
      product.img4,
      product.price,
      product.description,
      product.rating,
      product.discountPercentage,
      product.brand,
      product.category,
      product.stock
    );
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  let ref = useRef(null);

  const updateProduct = (Product) => {
    ref.current.click();
    setProduct({
      _id: Product._id,
      id: Product.id,
      title: Product.title,
      img1: Product.images[0],
      img2: Product.images[1],
      img3: Product.images[2],
      img4: Product.images[3],
      price: Product.price,
      description: Product.description,
      rating: Product.rating,
      discountPercentage: Product.discountPercentage,
      brand: Product.brand,
      category: Product.category,
      stock: Product.stock,
    });
  };

  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        ref={ref}
        className="btn btn-primary my-3 d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch modal
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <label htmlFor="product_name" className="form-label t1">
                Product Name:
              </label>

              <input
                type="text"
                name="title"
                className="form-control"
                id="product_name"
                value={product.title}
                onChange={handleChange}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="price" className="form-label">
                Price:
              </label>
              <input
                className="form-control"
                id="price"
                name="price"
                value={product.price}
                type="number"
                onChange={handleChange}
              ></input>
            </div>
            <div className="modal-body">
              <label htmlFor="quantity" className="form-label">
                Stock:
              </label>

              <input
                type="number"
                name="stock"
                className="form-control"
                id="quantity"
                value={product.stock}
                onChange={handleChange}
              />
            </div>

            <div className="modal-body">
              <label htmlFor="rating" className="form-label">
                Rating:{" "}
              </label>
              <input
                type="number"
                className="form-control w-50"
                id="rating"
                value={product.rating}
                name="rating"
                onChange={handleChange}
              />
            </div>

            <div className="modal-body">
              <label htmlFor="description" className="form-label">
                Description:{" "}
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="description"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <div className="modal-body">
              <label htmlFor="discountPercentage" className="form-label">
                Discount Percentage:{" "}
              </label>
              <input
                type="number"
                className="form-control w-50"
                id="discountPercentage"
                name="discountPercentage"
                value={product.discountPercentage}
                onChange={handleChange}
              />
            </div>

            <div className="modal-body">
              <label htmlFor="brand" className="form-label">
                Brand:{" "}
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="brand"
                name="brand"
                value={product.brand}
                onChange={handleChange}
              />
            </div>

            <div className="modal-body">
              <label htmlFor="category" className="form-label">
                Category:{" "}
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
              />
            </div>

            <div className="modal-body">
              <label htmlFor="img1">Image 1: </label>
              <input
                type="text"
                name="img1"
                id="img1"
                value={product.img1}
                onChange={handleChange}
              />
            </div>
            <div className="modal-body">
              <label htmlFor="img2">Image 2: </label>
              <input
                type="text"
                name="img2"
                id="img2"
                value={product.img2}
                onChange={handleChange}
              />
            </div>
            <div className="modal-body">
              <label htmlFor="img3">Image 3: </label>
              <input
                type="text"
                name="img3"
                id="img3"
                value={product.img3}
                onChange={handleChange}
              />
            </div>
            <div className="modal-body">
              <label htmlFor="img3">Image 4: </label>
              <input
                type="text"
                name="img4"
                id="img4"
                value={product.img4}
                onChange={handleChange}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary bg-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary bg-primary"
                onClick={handleClick}
                data-bs-dismiss="modal"
              >
                Update product
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="products">
        {searchResults.length == 0 ? (
          <p>No search results found.</p>
        ) : (
          <>
            {searchResults.map((product) => (
              <div className="c" key={product._id}>
                <ProductItem product={product} updateProduct={updateProduct} />
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default SerachItems;
