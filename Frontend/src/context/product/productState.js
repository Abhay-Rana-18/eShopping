import { useState } from "react";
import ProductContext from "./productContext";
import axios from "axios";

const ProductState = (props) => {
  // our host
  // const host = "http://localhost:5000";
  const host = "https://eshopping-backend.onrender.com"; 
  // Adding Products
  let [products, setProducts] = useState([]);
  let [atcproducts, setAtcproducts] = useState([]);
  let [dModal, setDModal] = useState(false);
  let [outModal, setOutModal] = useState(false);
  let [del_id, setDel_id] = useState(null);
  let [tagProducts, setTagProducts] = useState([]);

  const [searchResults, setSearchResults] = useState([]);

  // Function to fetch products in searchResults
  const searching = async (query) => {
    let response = await fetch(
      `${host}/eShopping/products/searchedProducts/${query}`,
      {
        method: "GET",
      }
    );
    const json = await response.json();
    setSearchResults(json);
  };

  // search by tagName
  const searchTag = async (tag) => {
    let response = await fetch(`${host}/eShopping/products/tag/${tag}`, {
      method: "GET",
    });
    const json = await response.json();
    setTagProducts(json);
  };

  //add to cart things
  let [a, setA] = useState(0);
  const [open, setOpen] = useState({});

  const getitem = async (id) => {
    const res = await fetch(`${host}/eShopping/products/a/${id}`, {
      method: "GET",
    });
    setOpen(await res.json());
    // console.log(await res.json());
  };

  const checkAtc = async (id) => {
    for (let i = 0; i < atcproducts.length; i++) {
      if (id == atcproducts[i].product_id) {
        return true;
      }
    }
    return false;
  };

  //RESTful api call
  const getAtc = async (id) => {
    const res = await fetch(`${host}/eShopping/atc/${id}`, {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    let json = await res.json();

    getAllatc();
  };

  const getAllatc = async () => {
    const res = await fetch(`${host}/eShopping/atc/`, {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    let json = await res.json();
    setAtcproducts(json);
    setA(json.length);
  };

  // Deleting items from add to cart
  const delAtc = async (id) => {
    const res = await fetch(`${host}/eShopping/atc/deleteItem/${id}`, {
      method: "DELETE",
    });
    let json = await res.json();
    getAllatc();
  };

  const plusAtc = async (id) => {
    const res = await fetch(`${host}/eShopping/atc/plus/${id}`, {
      method: "PUT",
    });
    getAllatc();
  };

  const minusAtc = async (id) => {
    const res = await fetch(`${host}/eShopping/atc/minus/${id}`, {
      method: "PUT",
    });
    getAllatc();
  };

  // External api call for all products
  const getProducts = async () => {
    const res = await axios.get("https://api.pujakaitem.com/api/products");
    const response = await fetch("https://fakestoreapi.com/products");
    let data = await response.json();

    let resp = await fetch(`${host}/eShopping/products/fetchallproducts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    var json = await resp.json();
    var arr = res.data.concat(data).concat(json);
    setProducts(arr);
  };

  let [cat, setCat] = useState([]);
  const categoryproducts = async (cat) => {
    // API call
    let response = await fetch(`${host}/eShopping/products/category=${cat}`, {
      method: "GET",
    });
    const json = await response.json();
    // console.log(json);
    setCat(json);
  };

  const arr = [];
  let i = 0;
  const getProduct = async () => {
    // API call
    let response = await fetch(`${host}/eShopping/products/fetchallproducts`, {
      method: "GET",
    });

    var json = await response.json();

    for (i = 0; i < 12; i++) {
      arr.push(json[i]);
    }

    setProducts(json);

    // try {
    //   addApi();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const fetchMoreProducts = async () => {
    // API call
    let response = await fetch(`${host}/eShopping/products/fetchallproducts`, {
      method: "GET",
    });

    var json = await response.json();

    if (i+12 <= json.length){
      for (let j = i; j < i+12; j++) {
        arr.push(json[j]);
      }
    } 
    else {
      for (let j = i; j < json.length; j++) {
        arr.push(json[j]);
      }
    }

    setProducts(json);

  };

  // Adding Products
  const addProduct = async (
    id,
    title,
    img1,
    img2,
    img3,
    img4,
    price,
    description,
    rating,
    discountPercentage,
    brand,
    category,
    stock,
    tag
  ) => {
    // const images = [img1, img2, img3, img4];
    // API call
    var response = await fetch(`${host}/eShopping/products/addproduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        title,
        images: [img1, img2, img3, img4],
        price,
        description,
        rating,
        discountPercentage,
        brand,
        category,
        stock,
        tag,
      }),
    });
    const json = await response.json();

    console.log("Adding new Product successfully");
    setProducts(products.concat(json));
  };

  // FUNCTION TO ADD PRODUCTS IN DB FROM AN API.
  // const addApi = async () => {
  //   const out = await axios.get("https://dummyjson.com/products");
  //   const dt = out.data.products;
  //   console.log(dt);

  //   for (var i = 0; i < dt.length; i++) {
  //     addProduct(
  //       dt[i].id,
  //       dt[i].title,
  //       dt[i].images,
  //       dt[i].price,
  //       dt[i].description,
  //       dt[i].rating,
  //       dt[i].discountPercentage,
  //       dt[i].brand,
  //       dt[i].category,
  //       dt[i].stock
  //     );
  //   }
  // };

  // Delete a Product
  const deleteProduct = async (id) => {
    // API call
    var response = await fetch(
      `${host}/eShopping/products/deleteproduct/${id}`,
      {
        method: "DELETE",
      }
    );

    let newProduct = products.filter((product) => {
      return product._id !== id;
    });

    setProducts(newProduct);
  };

  // Updating a Product
  const editProduct = async (
    _id,
    id,
    title,
    img1,
    img2,
    img3,
    img4,
    price,
    description,
    rating,
    discountPercentage,
    brand,
    category,
    stock,
    tag
  ) => {
    // API call
    var response = await fetch(
      `${host}/eShopping/products/updateproduct/${_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          title: title,
          images: [img1, img2, img3, img4],
          price: price,
          description: description,
          rating: rating,
          discountPercentage: discountPercentage,
          brand: brand,
          category: category,
          stock: stock,
          tag: tag,
        }),
      }
    );

    let json = await response.json();
    console.log(json);
    let newProducts = JSON.parse(JSON.stringify(products));
    let newCat = JSON.parse(JSON.stringify(cat));
    let newSearchResults = JSON.parse(JSON.stringify(searchResults));

    newProducts.forEach((product, i) => {
      if (product._id === _id) {
        newProducts[i] = {
          id: json.id,
          title: json.title,
          images: json.images,
          price: json.price,
          description: json.description,
          rating: json.rating,
          discountPercentage: json.discountPercentage,
          brand: json.brand,
          category: json.category,
          stock: json.stock,
          tag: json.tag,
        };
      }
    });

    newCat.forEach((category, i) => {
      if (category._id === _id) {
        newCat[i] = {
          id: json.id,
          title: json.title,
          images: json.images,
          price: json.price,
          description: json.description,
          rating: json.rating,
          discountPercentage: json.discountPercentage,
          brand: json.brand,
          category: json.category,
          stock: json.stock,
          tag: json.tag,
        };
      }
    });

    newSearchResults.forEach((product, i) => {
      if (product._id === _id) {
        newSearchResults[i] = {
          id: json.id,
          title: json.title,
          images: json.images,
          price: json.price,
          description: json.description,
          rating: json.rating,
          discountPercentage: json.discountPercentage,
          brand: json.brand,
          category: json.category,
          stock: json.stock,
          tag: json.tag,
        };
      }
    });

    setProducts(newProducts);
    setCat(newCat);
    setSearchResults(newSearchResults);
  };

  const productClick = async (id) => {
    const response = await fetch(
      `${host}/eShopping/products/productPage/${id}`,
      {
        method: "GET",
      }
    );
    let json = await response.json();
    setOpen(json);
    console.log(json);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        getitem,
        checkAtc,
        getProducts,
        getProduct,
        addProduct,
        editProduct,
        deleteProduct,
        categoryproducts,
        cat,
        a,
        open,
        getAtc,
        setOpen,
        delAtc,
        plusAtc,
        minusAtc,
        getAllatc,
        atcproducts,
        productClick,
        dModal,
        setDModal,
        searchResults,
        del_id,
        setDel_id,
        outModal,
        setOutModal,
        searching,
        setAtcproducts,
        setSearchResults,
        fetchMoreProducts,
        tagProducts,
        searchTag,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;
