
import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { Navigate, Route, Routes } from "react-router-dom";
import SingleProduct from "./Components/SingleProduct";
import Cart from "./Components/Cart";

const Navbar = lazy(() => import("./Components/Navbar"));
const Homepage = lazy(() => import("./Components/Homepage"));

const App = () => {
  const locomotiveScroll = new LocomotiveScroll();

  return (
    <>
      <div 
        className="h-full overflow-y-auto overflow-x-hidden w-full"
        data-scroll-container
      >
        <Suspense fallback={null}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/single-product/:id" element={<SingleProduct />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};  

export default App; 