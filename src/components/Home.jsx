import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaStar } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { add_item } from "../actions/index";
import { ImCancelCircle } from "react-icons/im";

export const Home = () => {
  const userDetails = useSelector((state) => state.userReducer);
  const cartDetail = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [product, setProducts] = useState([]);
  const [cpyProduct, setCpyProducts] = useState([]);
  const [search, setSearch] = useState();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const controller = new AbortController();
    const response = await fetch("https://dummyjson.com/products", {
      signal: controller.signal,
    });
    const data = await response.json();
    if (response.status === 200) {
      setProducts(data.products);
      setCpyProducts(data.products);
    }
    return () => {
      controller.abort();
    };
  }

  const types =
    cpyProduct.length !== 0
      ? [...new Set(["all", ...cpyProduct.map((px) => px.category)])]
      : null;

  //   const allTypes = [...new Set(types)];

  const checkType = (param) => {
    if (product !== undefined) {
      if (param === "all") {
        setProducts(cpyProduct);
      } else {
        const sort =
          cpyProduct.length !== 0
            ? cpyProduct.filter((px) => {
                return px.category === param;
              })
            : null;
        setProducts(sort);
      }
    }
  };

  const checkSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const addProduct = (param) => {
    dispatch(add_item(param));
  };

  useEffect(() => {
    if (search !== null && search !== undefined) {
      const searchedItem = cpyProduct.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(searchedItem);
    }
  }, [search, cpyProduct]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full flex items-center justify-between">
          <h1>Mini Shop</h1>
          <div className="flex flex-col items-center justify-center">
            <i className="mb-[-14px]">{cartDetail.length}</i>
            <CiShoppingCart
              className="text-2xl"
              onClick={() => setToggle(true)}
            />
          </div>
        </div>
        <input
          type="text"
          placeholder="Search Here....."
          onChange={checkSearch}
          value={search}
          className="outline-1 outline ring-black w-80 h-8 my-6 rounded p-1 leading-8 font-poppins"
        />
      </div>

      <section className="flex flex-wrap gap-3 items-center justify-center capitalize my-6 px-2">
        {types !== null
          ? types.map((type) => {
              return (
                <button
                  key={type}
                  className="border border-gray-900 border-solid rounded p-1 capitalize cursor-pointer focus:bg-gray-900  focus:text-white"
                  onClick={() => checkType(type)}
                >
                  {type}
                </button>
              );
            })
          : null}
      </section>
      <div className="flex flex-wrap justify-center align-center items-start gap-8">
        {product !== undefined && product !== null
          ? product.map((px, index) => {
              return (
                <section
                  key={index}
                  className="flex flex-col gap-1 font-poppins w-10/12 md:w-1/4 justify-evenly self-start shadow-xl hover:shadow-xl cursor-pointer rounded-3xl p-6 mt-auto"
                >
                  <img
                    src={px.thumbnail}
                    alt={px.title}
                    className="object-contain aspect-square"
                  />
                  <section className="my-2">
                    <p className="text-2xl font-black">{px.title}</p>
                    <div className="text-lg flex items-center justify-between my-1">
                      <p className="text-gray-700">
                        &#36;{px.price}(<i>-{px.discountPercentage}% off</i>){" "}
                      </p>{" "}
                      <p className="text-sm flex items-center justify-center">
                        <FaStar className="text-yellow-400 text-sm" />
                        {px.rating}
                      </p>
                    </div>
                    <div
                      className="text-center bg-slate-900 text-white capitalize p-2 rounded"
                      onClick={() => addProduct(px)}
                    >
                      Add to cart
                    </div>
                  </section>
                </section>
              );
            })
          : null}
        {product.length === 0 ? <h4>No item found</h4> : null}
      </div>
      <section
        className={`w-9/12 absolute outline-1 outline ring-black bg-white top-0 bottom-0 right-0 flex flex-col items-center ${
          toggle === true ? "openBar" : "sideBar"
        }`}
      >
        <div className="w-full my-2 p-2 flex justify-between items-center">
          <p>Your Shopping cart</p>
          <ImCancelCircle onClick={() => setToggle(false)} />
        </div>
        {cartDetail.length !== 0
          ? cartDetail.map((para) => {
              return (
                <div className="w-11/12 outline-1 outline ring-black flex items-center justify-center gap-1 p-2">
                  <img
                    src={para.thumbnail}
                    alt={para.title}
                    className="aspect-square w-1/2 object-contain"
                  />
                  <div className="w-1/2">
                    <p className="text-xl">{para.title}</p>
                    <p className="text-sm">${para.price}</p>
                  </div>
                </div>
              );
            })
          : null}
        <button className="my-4 rounded p-2 font-poppins bg-gray-900 text-white">
          Go to Checkout : $
          {cartDetail.reduce((total, item) => total + item.price, 0)}
        </button>
      </section>
    </div>
  );
};
