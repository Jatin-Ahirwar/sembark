import React, { useEffect, useRef } from 'react'
import Button from './CommonComponents/Button'
import Products from './Products'
import { useLocation } from 'react-router-dom'
import GetInTouch from './GetInTouch'
import Footer from './Footer'

const Homepage = () => {
  const scrollRef = useRef()
  const location = useLocation();

  const handleScrolltoProducts = ()=>{
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  
  useEffect(() => {
    if (location.state?.triggerCallback) {
      handleScrolltoProducts()    
    }
  }, [location.state]);

  return (
    <>
    
    <div className="relative w-full min-h-[80vh] flex max-md:items-center md:h-screen overflow-hidden bg-black text-white">
      <img
        src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
        alt="Winter Fashion"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90"></div>

      <div className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-8 md:px-16 lg:px-32 md:py-0">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            New Season <br /> Winter Collection
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300">
            Stay cozy and stylish with our latest arrivals. Discover premium winter wear that redefines comfort and fashion.
          </p>

          <Button
            text="Shop Now"
            onClick={handleScrolltoProducts}
            className="mt-6 sm:mt-8"
          />
        </div>
      </div>

      <p className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-[10px] sm:text-xs md:text-sm text-gray-400 uppercase tracking-widest">
        Explore • Fashion • Comfort
      </p>
    </div>
  

    <div ref={scrollRef}>
      <Products/>
    </div>

    <GetInTouch/>
    <Footer/>
    </>
  )
}

export default Homepage