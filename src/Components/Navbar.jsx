import React, { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { LiaOpencart } from "react-icons/lia";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const { cartCount, setcartCount } = useContext(CartContext);
  
  useEffect(() => {
    console.log('cartCount',cartCount)  
  }, [cartCount])

  const links = [
    { name: "Brands", title: "Brands" },
    { name: "Shop", title: "Shop" },
    { name: "Blog", title: "Blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
        setIsOpen(false)
      
      } else {
        setShowNavbar(true);
        setIsOpen(false)
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -90 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed z-[99999999999] shadow-lg md:max-w-[90%] md:mx-auto left-0 right-0 rounded-b-xl px-4 md:px-8 py-4 md:py-6 flex justify-between items-center text-md font-Neue bg-[#f2f2f2]"
    >
      <Link
        to="/"
        className="space-x-3 inline-flex items-center text-lg"
        title="Sembark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-6 w-6 md:h-8 md:w-8"
        >
          <path d="M8 16a8 8 0 10-4.465-1.361c.41.276 0-.846.715-2.639.534-1.34 1.81-4.466 1.825-5.205.01-.534-.193-.994-.4-1.466-.046-.101-.09-.204-.134-.307-.391.768-1.764 1.929-2.69 1.743-1.285-.256-.419-1.777.116-2.359l.18-.201c.498-.563 1.191-1.347 1.836-1.076.312.13 1.09.701 1.707 1.19 0 0-.018-.047-.028-.079-.282-.87-.67-1.896 1.14-2.047.46-.04 2.776-.023 2.275.854-.202.352-1.139.45-1.863.526-.305.032-.573.06-.732.101.076.42.121.93.128 1.396 1.074.123 1.755.032 2.557-.075.399-.053.827-.11 1.348-.147C12.035 4.81 12.75 4.75 13 5c.165.165.204.575.145.934-.247 1.491-1.68 2.794-2.812 3.823-.191.174-.374.34-.54.498-1.642 1.55-2.523 3.144-2.434 5.127.01.189-.011.607.225.607.138.007.276.011.416.011z" />
        </svg>
        <span className="font-semibold uppercase tracking-widest">Sembark</span>
      </Link>

      <div className="hidden md:flex justify-between">
        <div className="links flex gap-8 font-normal mt-1">
          {links.map((link) => (
            <motion.a
              href={link.href}
              key={link.name}
              title={link.title}
              className="relative overflow-hidden h-6 inline-block"
              whileHover="hover"
              initial="initial"
            >
              <motion.span
                className="block"
                variants={{
                  initial: { y: 0 },
                  hover: { y: "-100%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {link.name}
              </motion.span>
              <motion.span
                className="block absolute top-0 left-0"
                variants={{
                  initial: { y: "100%" },
                  hover: { y: "0%" },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {link.name}
              </motion.span>
              <motion.span
                className="absolute left-0 bottom-0 h-[1px] bg-black"
                variants={{
                  initial: { scaleX: 0 },
                  hover: { scaleX: 1 },
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ transformOrigin: "left center", width: "100%" }}
              />
            </motion.a>
          ))}
        </div>

        <motion.a
          href="/"
          key="Contact Us"
          className="relative overflow-hidden h-6 inline-block"
          whileHover="hover"
          initial="initial"
        >
          <motion.span
            className="block absolute top-0 left-0"
            variants={{
              initial: { y: "100%" },
              hover: { y: "0%" },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            Contact Us
          </motion.span>
          <motion.span
            className="absolute left-0 bottom-0 h-[2px] bg-black"
            variants={{
              initial: { scaleX: 0 },
              hover: { scaleX: 1 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ transformOrigin: "left center", width: "100%" }}
          />
        </motion.a>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-6 flex flex-col justify-center items-center"
        >
          <span
            className={`absolute h-[2px] w-8 bg-black rounded transition-transform duration-300 ${
              isOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-[2px] w-8 bg-black rounded transition-transform duration-300 ${
              isOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute top-[60px] left-0 w-full bg-[white]/95 backdrop-blur-md flex flex-col items-center gap-6 py-6 md:hidden shadow-lg"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                title={link.title}
                className="text-lg hover:underline"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Link
              to="/cart"
              title="Cart"
              className="text-lg hover:underline flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden md:flex items-center gap-4 text-lg cursor-pointer">
        <div
          title="Search"
          className="h-9 w-9 rounded-full flex items-center justify-center bg-[#e5e7eba0]"
        >
          <RiSearchLine fontSize={18} />
        </div>

        <div
          onClick={() => navigate("/cart")}
          title="Cart"
          className="relative h-9 w-9 rounded-full flex items-center justify-center bg-[#e5e7eba0] cursor-pointer"
        >
          <LiaOpencart fontSize={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>

        <img
          title="Profile"
          className="h-9 w-9 rounded-full object-cover object-top"
          src="https://plus.unsplash.com/premium_photo-1664015982598-283bcdc9cae8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765"
          alt=""
        />
      </div>
    </motion.div>

  );
};

export default Navbar;