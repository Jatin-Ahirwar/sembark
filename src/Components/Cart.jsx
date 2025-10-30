import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Button from "./CommonComponents/Button";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const { cartCount, setcartCount } = useContext(CartContext);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedItems);
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    setcartCount(updatedCart?.length)
  };

  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price, 0)
    .toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 px-4 md:py-24 py-20 flex justify-center md:items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex justify-between items-center mb-6">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black transition-all"
          >
            <ArrowLeftOutlined className="text-base sm:text-lg" />
            <span className="text-sm sm:text-base">Continue Shopping</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Your Cart
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col gap-5">
            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4"
              >
                <div className="flex items-start gap-3 sm:gap-4 w-full sm:w-3/4">
                  <span className="text-gray-500 font-semibold text-sm min-w-[20px] text-center">
                    {index + 1}.
                  </span>

                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain bg-gray-50 rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-medium text-gray-800 leading-tight">
                      {item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 capitalize mt-1">
                      {item.category}
                    </p>
                    <p className="text-gray-900 font-semibold mt-1 sm:mt-2 text-sm sm:text-base">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end w-full sm:w-auto mt-3 sm:mt-0">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 transition-all px-3 py-1.5 rounded-full text-sm sm:text-base"
                  >
                    <DeleteOutlined className="text-sm" />
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 pt-4 border-t">
              <div className="text-lg sm:text-xl font-semibold text-gray-800">
                Total: ${totalPrice}
              </div>
              <Button
                text="Proceed to Checkout"
                className="mt-4 sm:mt-0 w-full sm:w-auto py-2 sm:py-3"
                // onClick={() => alert("Proceeding to checkout...")}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="Empty Cart"
              loading="lazy"
              className="w-24 h-24 opacity-70 mb-4"
            />
            <h2 className="text-sm sm:text-lg text-gray-500">Your cart is empty</h2>
            <Button
              text="Shop Now"
              className="mt-6 w-full sm:w-auto"
              onClick={() => navigate("/")}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
