import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../utilities/axios";
import Button from "./CommonComponents/Button";
import { CheckCircleOutlined, HomeOutlined, RightOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { message } from "antd";
import { CartContext } from "../Context/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const { setcartCount } = useContext(CartContext);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartModal, setCartModal] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setshowModal] = useState(false);
  const navigate = useNavigate();

  const getItemDetails = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProductDetail(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItemDetails();
  }, [id]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const alreadyInCart = existingCart.some((item) => item.id === Number(id));
    setInCart(alreadyInCart);
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const alreadyInCart = existingCart.some((item) => item.id === productDetail.id);

    if (!alreadyInCart) {
      const updatedCart = [...existingCart, { ...productDetail, quantity: 1 }];
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      setcartCount(updatedCart?.length)
      setInCart(true);
      setModalMessage("Added to Cart 🛒");
      setCartModal(true);
    }
  };

  const handleRemoveFromCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = existingCart.filter((item) => item.id !== productDetail.id);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setcartCount(updatedCart?.length)
    setInCart(false);
    setCartModal(false);
    setshowModal(true);

    setTimeout(() => {
      setshowModal(false);
    }, 2000);
  };

  const handleViewCart = () => {
    setCartModal(false);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 md:px-8 md:py-22 py-10">
      <div className="w-full max-w-6xl flex flex-col md:gap-8 gap-4 max-md:pt-10 pt-8">

        <nav className="flex items-center text-sm text-gray-500 flex-wrap">
          <Link to="/" className="flex items-center hover:text-black">
            <HomeOutlined className="mr-1" /> Home
          </Link>
          <RightOutlined className="mx-2 text-gray-400 text-xs" />
          <Link state={{ triggerCallback: true }} to="/" className="hover:text-black">
            Products
          </Link>
          <RightOutlined className="mx-2 text-gray-400 text-xs" />
          <span className="text-gray-800 font-medium capitalize truncate max-w-[180px] sm:max-w-[240px] md:max-w-[300px]">
            {productDetail?.title.length > 30
              ? `${productDetail?.title.slice(0, 30)}...`
              : productDetail?.title}
          </span>
        </nav>

        <div className="w-full bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col md:flex-row">
          
          <div className="flex-1 flex justify-center items-center bg-gray-100 p-6 md:p-8">
            <img
              src={productDetail?.image}
              alt={productDetail?.title}
              loading="lazy"
              className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                {productDetail?.category}
              </span>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mt-2 leading-snug">
                {productDetail?.title}
              </h1>

              <div className="flex items-center gap-2 mt-3 text-gray-600 text-sm sm:text-base">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="font-medium">{productDetail?.rating?.rate}</span>
                <span className="text-gray-400 text-sm">
                  ({productDetail?.rating?.count} Reviews)
                </span>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mt-4">
                {productDetail?.description}
              </p>

              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">
                ${productDetail?.price.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col flex-wrap sm:flex-row gap-4 mt-8">
              {inCart ? (
                <>
                  <Button
                    text="View Cart"
                    onClick={handleViewCart}
                    className="flex"
                  />
                  <Button
                    text="Remove from Cart"
                    onClick={handleRemoveFromCart}
                    className="flex"
                  />
                </>
              ) : (
                <Button
                  text="Add to Cart"
                  onClick={handleAddToCart}
                  className="flex"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {cartModal && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t border-gray-200 rounded-t-2xl px-4 sm:px-6 py-5 z-50"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{modalMessage}</h3>
                <p className="text-gray-500 text-sm">
                  {productDetail?.title.length > 40
                    ? `${productDetail?.title.slice(0, 40)}...`
                    : productDetail?.title}
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setCartModal(false)}
                  className="flex-1 sm:flex-none bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full font-medium text-sm"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleViewCart}
                  className="flex-1 sm:flex-none bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-full font-medium text-sm"
                >
                  View Cart
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 z-50"
          >
            <CheckCircleOutlined className="text-green-400 text-lg" />
            <span className="text-sm font-medium whitespace-nowrap">Item removed successfully!</span>
        </motion.div>
        )}
      </AnimatePresence>
    </div>

  );
};

export default SingleProduct;