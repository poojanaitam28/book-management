import React from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full bg-[url('https://img.freepik.com/free-photo/3d-rendering-classic-interior_23-2150943454.jpg?ga=GA1.1.2100011829.1732618920&semt=ais_hybrid')] bg-cover">
      <div className="w-full h-24 flex justify-between items-center px-2 md:px-32">
        <div className="flex gap-2">
          <img className="w-6 h-6 md:w-8 md:h-8" src={logo} alt="logo" />
          <h1 className=" text-xl md:text-3xl font-extrabold font-poppins text-orange">
            Book<span className="text-blue">mark.</span>
          </h1>
        </div>

        <div className=" flex gap-2 md:gap-5 justify-center">
          <button
            onClick={() => navigate("/signup")}
            className="border rounded-3xl text-xs md:text-base border-blue text-blue px-3 py-1  md:px-5 md:py-2 hover:opacity-70"
          >
            Sign up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="border flex items-center text-xs md:text-base gap-1 md:gap-2 rounded-3xl md:px-5 md:py-2 border-blue bg-blue text-white px-5 py-2 hover:bg-opacity-70"
          >
            Sign in{" "}
            <GoArrowUpRight className="text-sm hover:translate-x-2 transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
