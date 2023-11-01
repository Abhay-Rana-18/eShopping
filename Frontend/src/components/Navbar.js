import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ProductContext from "../context/product/productContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Link, useLocation, useNavigate } from "react-router-dom";

import bag from "../images/shopping-bag.png";
import dark_bag from "../images/shopping-bag-dark.png";
import logo from "../images/logo.jpeg";
import LogOut_modal from "./LogOut_modal";
import Alert from "./Alert";
import DeleteModal from "./DeleteModal";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Trending", href: "/tag/trending", current: false },
  { name: "Bestseller", href: "/tag/bestseller", current: false },
  { name: "Popular", href: "/tag/popular", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    getAllatc,
    a,
    products,
    searchResults,
    setSearchResults,
    searching,
    dModal,
    outModal,
    setOutModal,
    del_id,
    searchTag,
  } = useContext(ProductContext);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const performSearch = () => {
    if (searchQuery.trim() === "") {
      navigate("/");
    } else {
      const filteredProducts = products.filter((product) =>
        product.title
          .toLowerCase()
          .trim()
          .includes(searchQuery.toLowerCase().trim())
      );
      localStorage.setItem("query", searchQuery);
      setSearchResults(filteredProducts);
      navigate(`/searchedProducts/${searchQuery}`);
    }
  };

  useEffect(() => {
    let q = localStorage.getItem("query");
    if (location.pathname == "/searchedProducts/") {
      setSearchQuery(q);
    }
    searching(q.trim());
  }, []);

  let location = useLocation();

  const navigate = useNavigate();
  const atcItems = () => {
    if (location.pathname == "/atcItems") {
      navigate("/");
    } else {
      navigate("/atcItems");
    }
  };
  const handleLogout = async () => {
    // localStorage.removeItem("token");
    setOutModal(true);
  };

  // atc
  useEffect(() => {
    getAllatc();
  }, []);

  return (
    // <div className="bar">
    <Disclosure as="nav" className="bg-purple-200 sticky top-0 z-10">
      {({ open }) => (
        <>
          {/* Alert */}
          {/* {alert ? <Alert alert={alert} /> : ""} */}

          {/* Logout Modal */}
          {outModal && <LogOut_modal />}

          {/* Delete Moda */}
          {dModal && <DeleteModal id={del_id} />}

          {/* top Navbar */}
          <div className="topNav py-2">
            <div className="flex flex-shrink-0 logoDiv">
              <img className="h-8 w-auto" src={logo} alt="Company" />
              {/* Search Bar */}
              <div className="searchButton" onClick={performSearch}>
                <FontAwesomeIcon icon={faSearch} style={{ width: "15px" }} />
              </div>

              <input
                type="search"
                id="inp"
                name="inp"
                value={searchQuery}
                placeholder="search products"
                onChange={handleSearchInput}
              ></input>

              {/* Atc bag */}
              {localStorage.getItem("token") && (
                <div className="add" onClick={atcItems}>
                  <p className="num">{a}</p>
                  <img src={bag} alt="#" id="atc" className="mx-2" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-shrink-0 logoDiv midNav">
            {/* Search Bar */}
            <div className="searchButton" onClick={performSearch}>
              <FontAwesomeIcon icon={faSearch} style={{ width: "15px" }} />
            </div>

            <input
              type="search"
              id="inp"
              name="inp"
              value={searchQuery}
              placeholder="search products"
              onChange={handleSearchInput}
            ></input>

            {/* Atc bag */}
            <div className="add" onClick={atcItems}>
              <p className="num">{a}</p>
              <img src={dark_bag} alt="#" id="atc" className="mx-2 darkBag" />
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-purple-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-white text-black"
                            : "navitem text-black hover:underline text-blue-900",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {!localStorage.getItem("token") ? (
                      <div className="registration">
                        <Link
                          to="/register"
                          role="button"
                          id="register"
                          className="btn btn-primary mx-2 btn-sm"
                        >
                          Register
                        </Link>
                        <Link
                          to="/login"
                          role="button"
                          id="login"
                          className="btn btn-outline-success btn-sm"
                        >
                          Login
                        </Link>
                      </div>
                    ) : (
                      <div className="registration">
                        {localStorage.getItem("isAdmin") && (
                          <>
                            <Link
                              to="/addProduct"
                              role="button"
                              id="add"
                              className="btn btn-sm btn-primary mx-2 mt-1"
                            >
                              Add Products
                            </Link>
                          </>
                        )}

                        <button
                          role="button"
                          id="login"
                          className="btn btn-sm btn-outline-primary mt-1"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  to={item.href}
                  as={Link}
                  className={classNames(
                    item.current ? "bg-purple-300 text-black" : "text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <button
                role="button"
                id="login"
                className="btn btn-sm btn-outline-primary mt-1 phoneBtn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    // </div>
  );
}
