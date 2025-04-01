import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Dialog } from "@mui/material";
import { IoIosLogOut } from "react-icons/io";
import logo from "../assets/logo.png";
import { navLinks } from "../constants";

function Navbar() {
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
    <div>
      <div className="shadow-md w-full bg-slate-200 h-auto flex p-4">
        <div className="w-[13%] bg-red-300 flex gap-2 items-center">
          <h1 className=" text-xl md:text-2xl font-bold font-poppins text-orange">
            Book<span className="text-blue">mark.</span>
          </h1>
        </div>

        {/* Display Selected Menu Item */}
        <div className="w-[56%] bg-red-200 flex items-center">
          <h1 className="text-xl font-semibold font-poppins">{selectedItem}</h1>
        </div>

        <div className="w-[30%] bg-red-300 flex items-center gap-3">
          <div className="p-2">
            <h1>Pooja Naitam</h1>
            <h1>poojanaitam3@gmail.com</h1>
          </div>
          <img className="w-10 h-10 rounded-full" src={logo} alt="" />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="shadow-md w-44 h-screen bg-slate-200">
        <ul>
          {navLinks.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer hover:underline ${
                selectedItem === item.title ? "font-bold" : ""
              }`}
            >
              <Link to={item.path} onClick={() => setSelectedItem(item.title)}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
