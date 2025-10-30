import React, { useEffect, useRef, useState } from "react";
import { Menu, Badge, Pagination } from "antd";
import {
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  ManOutlined,
  WomanOutlined,
  LaptopOutlined,
  GoldOutlined,
} from "@ant-design/icons";


import axios from "../../utilities/axios";
import { useNavigate } from "react-router-dom";

const iconMap = {
  "men's clothing": <ManOutlined />,
  "women's clothing": <WomanOutlined />,
  electronics: <LaptopOutlined />,
  jewelery: <GoldOutlined />,
};

const Products = () => {
  const [selectedKey, setSelectedKey] = useState("all");
  const [products, setProducts] = useState([]);
  const [types, setTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const pageSize = 6;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const fetchAllProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);

      const uniqueCategories = ["all", ...new Set(data.map((p) => p.category))];
      setTypes(uniqueCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleSelect = ({ key }) => {
    setSelectedKey(key);
    setCurrentPage(1);
  };

  const navigateItemDetails = (id) => {
    navigate(`/single-product/${id}`)
  };

  const filteredProducts =
    selectedKey === "all"
      ? products
      : products.filter((item) => item.category === selectedKey);

  const currentItems = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const menuItems = types.map((type) => ({
    key: type,
    label: (
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2 capitalize">
          {iconMap[type] || <ShoppingOutlined />}
          {type === "all" ? "All Products" : type}
        </div>
        <Badge
          count={type === "all" ? products.length : products.filter((p) => p.category === type).length}
          style={{
            background: "linear-gradient(90deg, #2B2B2B, #000000)",
            color: "#fff",
            fontSize: "12px",
          }}
        />
      </div>
    ),
  }));
  
  if(!products){
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }
  return (
    <>
    <div
      ref={scrollRef}
      className="min-h-screen w-full bg-white flex flex-col lg:flex-row justify-center lg:gap-6 px-4 md:px-8 py-6"
    >
      <div className="w-full lg:w-64 mb-6 lg:mb-0">
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-4">Category</h2>

          <Menu
            mode="inline"
            className="border-none mt-1 rounded-lg"
            style={{ background: "transparent" }}
            items={menuItems.map((item) => ({
              ...item,
              className: `rounded-lg px-2 py-1 ${
                selectedKey === item.key ? "!bg-gray-100" : ""
              } hover:!bg-gray-200`,
            }))}
            selectedKeys={[selectedKey]}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-4 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-end">
                <span className="text-xs font-medium bg-gray-100 px-3 py-1 rounded-full capitalize">
                  {item.category}
                </span>
              </div>

              <div className="flex justify-center items-center my-4">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-36 h-36 md:w-40 md:h-40 object-contain"
                />
              </div>

              <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-snug">
                {item.title.length > 35 ? item.title.slice(0, 35) + "..." : item.title}
              </h3>

              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span className="text-yellow-500 text-base mr-1">★</span>
                {item.rating.rate}
                <span className="ml-1">({item.rating.count} Reviews)</span>
              </div>

              <div className="text-lg md:text-xl font-semibold text-gray-900 mt-2">
                ${item.price.toFixed(2)}
              </div>

              <div className="flex gap-2 mt-auto pt-4">
                <button
                  onClick={() => navigateItemDetails(item.id)}
                  className="flex-1 bg-black hover:bg-gray-800 text-white py-2 rounded-full font-medium text-sm transition-all"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Pagination
            current={currentPage}
            total={filteredProducts.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Products;