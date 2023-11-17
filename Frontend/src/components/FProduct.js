import React, { useState, useContext, useEffect, useRef } from "react";
import ProductContext from "../context/product/productContext";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";
import Alert from "./Alert";
import DeleteModal from "./DeleteModal";

import InfiniteScroll from "react-infinite-scroll-component";

import mac from "../images/mac.jpg";
import Loading from "./Loading";

// Skelton Loading
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// animation on scroll
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

// Loding Bar
import LoadingBar from "react-top-loading-bar";

const Product = () => {
  // alert
  let [alert, setAlert] = useState(null);
  let [id, setId] = useState(null);
  let [loading, setLoading] = useState(false);

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

  const {
    products,
    editProduct,
    categoryproducts,
    setDel_id,
    fetchMoreProducts,
  } = useContext(ProductContext);
  const navigate = useNavigate();
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
    tag: "",
  });

  let ref = useRef(null);

  const handleClick = (e) => {
    showAlert("Item updated successfully", "success");
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
      product.stock,
      product.tag
    );
  };

  const fetchMoreData = () => {
    fetchMoreProducts();
  };

  // const handleChange = (e) => {
  //   if (e.target.name === "images[]") {
  //     const img = e.target.value.split(",");
  //     setProduct((prevProduct) => ({
  //       ...prevProduct,
  //       images: img,
  //     }));
  //   } else {
  //     setProduct({ ...product, [e.target.name]: e.target.value });
  //   }
  // };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

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
      tag: Product.tag,
    });
  };

  const deleteItem = (i) => {
    setDel_id(i);
  };

  // category click
  const categoryClick1 = async (req, res) => {
    localStorage.setItem("category", "smartphones");
    const cat = "smartphones";
    categoryproducts(cat);
    navigate(`/category/${cat}`);
  };

  const categoryClick2 = async (req, res) => {
    localStorage.setItem("category", "laptops");
    const cat = "laptops";
    categoryproducts(cat);
    navigate(`/category/${cat}`);
  };
  const categoryClick3 = async (req, res) => {
    localStorage.setItem("category", "fragrances");
    const cat = "fragrances";
    categoryproducts(cat);
    navigate(`/category/${cat}`);
  };
  const categoryClick4 = async (req, res) => {
    localStorage.setItem("category", "skincare");
    const cat = "skincare";
    categoryproducts(cat);
    navigate(`/category/${cat}`);
  };
  const categoryClick5 = async (req, res) => {
    localStorage.setItem("category", "groceries");
    const cat = "groceries";
    categoryproducts(cat);
    navigate(`/category/${cat}`);
  };
  const categoryClick6 = async (req, res) => {
    localStorage.setItem("category", "home-decoration");
    const cat = "home-decoration";
    categoryproducts(cat);
    navigate(`/category/${cat}`);
  };

  return (
    <>
      {/* <LoadingBar color="#f11946" progress={60} /> */}

      {/* Alert */}
      {alert ? <Alert alert={alert} /> : ""}

      {/* <Skeleton /> */}

      {/* Carousel */}

      <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://m.media-amazon.com/images/G/31/img21/shoes/2023/AfterPD/Hero/Cat_Main_Banner-PC-3000x1000-3._SX3000_QL85_.jpg"
              // src={mobile}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              // src="https://m.media-amazon.com/images/G/31/img21/shoes/2023/SS23/Herotater_pc/1._SX3000_QL85_.jpg"
              src={mac}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://m.media-amazon.com/images/G/31/img21/shoes/2023/SS23/Herotater_pc/3._SX3000_QL85_.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Category */}

      <div className="category" data-aos="fade-down">
        <div className="c c1" onClick={categoryClick1}>
          <img
            src="https://th.bing.com/th/id/OIG.e4KZlCf25AA8j_7ymmXj?pid=ImgGn"
            alt="#"
          />
          <h5>Smart Phone</h5>
        </div>
        <div className="c c2" onClick={categoryClick2}>
          <img
            src="https://cdn.dribbble.com/userupload/4447028/file/original-3ba216d6a61fd78458b20d67bb3c2d22.jpg?resize=400x0"
            alt="#"
          />
          <h5>Laptops</h5>
        </div>
        <div className="c c3" onClick={categoryClick3}>
          <img
            src="https://th.bing.com/th/id/OIG.otaW.UBXuNsKZVAN1rdO?pid=ImgGn"
            alt="#"
          />
          <h5>Fragnances</h5>
        </div>

        <div className="c c4" onClick={categoryClick4}>
          <img
            src="https://th.bing.com/th/id/OIG.yP6PlF76SnY2yUJhWwmU?pid=ImgGn"
            alt="#"
          />
          <h5>Skin Care</h5>
        </div>

        <div className="c c5" onClick={categoryClick5}>
          <img
            src="https://th.bing.com/th/id/OIG.Wc1ISGkhZOefteAOqUUf?pid=ImgGn"
            alt="#"
          />
          <h5>Groceries</h5>
        </div>
        <div className="c c6" onClick={categoryClick6}>
          <img
            src="https://th.bing.com/th/id/OIG.hgjRT1g5IT_wfnNrQ01d?pid=ImgGn"
            alt="#"
          />
          <h5>Home Decoration</h5>
        </div>
      </div>

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
              <label htmlFor="tag" className="form-label">
                Tag:{" "}
              </label>
              <input
                type="text"
                className="form-control w-50"
                id="tag"
                name="tag"
                value={product.tag}
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

      {/* {loading && <Loaading />} */}
      {/* <Skeleton /> */}

      <InfiniteScroll
        dataLength={products.length}
        // next={fetchMoreData}
        // hasMore={products.length < 12}
        // loader={<Loading />}
      >
        <div className="products">
          {products.map((product) => {
            return (
              <div className="c" key={product._id}>
                <ProductItem
                  product={product}
                  updateProduct={updateProduct}
                  deleteItem={deleteItem}
                />
              </div>
            );
          })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Product;
