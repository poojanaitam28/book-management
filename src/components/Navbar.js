import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/logo.png";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openLogOutDial, setOpenLogOutDial] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedItem, setSelectedItem] = useState("Dashboard");

  // Update selected item based on route
  React.useEffect(() => {
    const activeLink = navLinks.find((item) => item.path === location.pathname);
    setSelectedItem(activeLink ? activeLink.title : "Dashboard");
  }, [location]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 h-screen p-5 pt-8 ${
          isSidebarOpen ? "w-60" : "w-20"
        } transition-all duration-300 text-white`}
      >
        <div className="flex items-center justify-between">
          <h1
            className={`text-xl  md:text-2xl font-poppins  text-white font-bold ${
              !isSidebarOpen && "hidden"
            }`}
          >
            Book<span className="text-orange">mark.</span>
          </h1>
          <FaBars
            className="text-2xl cursor-pointer"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        <ul className="mt-10 space-y-4">
          {navLinks.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-4 p-2 hover:bg-gray-700 rounded-md cursor-pointer"
            >
              <span className="text-xl">{item.icon}</span>
              {isSidebarOpen && <Link to={item.path}>{item.title}</Link>}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Navbar */}
        <div className="bg-white shadow-md flex items-center justify-between px-16 py-4">
          {/* Left - Title */}
          <h1 className="text-2xl font-bold font-poppins text-gray-800">
            {selectedItem}
          </h1>

          {/* Right - User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <h1 className="font-semibold text-gray-800">Pooja Naitam</h1>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
            <img
              src={logo}
              alt="User"
              className="w-9 h-9 rounded-full border"
            />
            <IoIosArrowDown className="text-xl text-gray-700 cursor-pointer" />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Navbar;
