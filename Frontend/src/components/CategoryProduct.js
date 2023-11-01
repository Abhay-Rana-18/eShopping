import React, { useState, useContext, useRef, useEffect } from "react";
import ProductContext from "../context/product/productContext";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
const CategoryProduct = () => {
  const { editProduct, cat, categoryproducts, setDel_id } =
    useContext(ProductContext);
  const navigate = useNavigate();
  let [id, setId] = useState(null);
  let [product, setProduct] = useState({
    id: "",
    title: "",
    images: [],
    price: "",
    description: "",
    rating: "",
    discountPercentage: "",
    brand: "",
    category: "",
    stock: "",
  });
  let ref = useRef(null);

  const deleteItem = (i) => {
    setDel_id(i);
  };

  const handleClick = (e) => {
    e.preventDefault();
    editProduct(
      product._id,
      product.id,
      product.title,
      product.images,
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

  const updateProduct = (Product) => {
    ref.current.click();
    setProduct(Product);
  };

  useEffect(() => {
    const cat = localStorage.getItem("category");
    categoryproducts(cat);
  }, [categoryproducts]);

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
            <div className="modal-header">
              <label htmlFor="product_name" className="form-label">
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
            <div className="modal-header">
              <label htmlFor="quantity" className="form-label">
                Qunatity:
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

            <div className="modal-header">
              <label htmlFor="imgUrl" className="form-label">
                Image Url:
              </label>

              <input
                type="text"
                name="images"
                className="form-control"
                id="imgUrl"
                value={product.images}
                onChange={handleChange}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                data-bs-dismiss="modal"
              >
                Update product
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="m-3">all products of category {localStorage.getItem("category")}...</p>
      <div className="products">
        {cat.map((product) => {
          return (
            <>
              <div className="c" key={product._id}>
                <ProductItem
                  product={product}
                  updateProduct={updateProduct}
                  deleteItem={deleteItem}
                />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CategoryProduct;
