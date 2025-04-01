import "./App.css";
import Home from "./components/Home";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import VerifyOtp from "./components/VerifyOtp";
import Dashboard from "./components/Dashboard";
import Addbook from "./components/Addbook";
import Mybooks from "./components/Mybooks";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Favorites from "./components/Favorites";
import Spinner from "./components/Spinner"

function App() {
  return (
    <div className="w-full h-screen">
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/verify-otp" element={<VerifyOtp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addbook" element={<Addbook />}></Route>
        <Route path="/mybooks" element={<Mybooks />}></Route>
        <Route path="/favorite" element={<Favorites />}></Route>
        <Route path="/forget-password" element={<ForgetPassword />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="/spinner" element={<Spinner />}></Route>
      </Routes>
    </div>
  );
}

export default App;
