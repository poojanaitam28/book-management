import React from "react";

import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="w-full h-screen bg-slate-400 flex flex-col justify-center items-center">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="absolute flex justify-center items-cente">
        <h1 className="text-8xl text-blue font-extrabold ml-32">
          WelCome,<span className=""> Buddy! </span>
        </h1>
     
      </div>
    </div>
  );
}

export default Dashboard;
