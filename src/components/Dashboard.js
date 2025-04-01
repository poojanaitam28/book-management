import React from "react";

import Navbar from "../components/Navbar";

function Dashboard() {
  return (
    <div className="w-full h-full bg-slate-300">
      <Navbar />

      <div className="group w-full h-[80%] mt-10 flex justify-center items-center space-x-6">
        <h1 className="text-8xl font-parkinsans text-blue font-extrabold tracking-wide">
          WelCome Buddy!
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;
