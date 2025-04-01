import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import toast from "react-hot-toast";
import axios from "axios";
import ApiConfig from "../config/ApiConfig";
import { useLocation, useNavigate } from "react-router-dom";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  console.log(email);

  const [otp, setOtp] = useState(""); // State to store OTP
  const [timeLeft, setTimeLeft] = useState(300);
  const [isExpired, setIsExpired] = useState(false);

  const resendOtp = () => {
    setOtp("");
    setTimeLeft(300);
    console.log("OTP resent");
  };

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleOtpChange = (otp) => {
    setOtp(otp);
    console.log("OTP entered:", otp);
  };

  const handleComplete = (otp) => {
    console.log("Otp Completed", otp);
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.verifyotp,
        data: {
          email: email,
          otp: Number(otp),
        },
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  return (
    <div className='w-full bg-cover bg-center bg-[url("https://images.unsplash.com/photo-1705356623578-98adb3cc186e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHdhbGxwYXBlciUyMDRrfGVufDB8MHwwfHx8Mg%3D%3D")] h-screen flex justify-center items-center'>
      <div className="w-1/2 h-1/2 shadow-lg flex flex-col justify-center items-center bg-red-300 bg-transparent bg-opacity-100 p-1">
        <h1 className="font-extrabold text-4xl tracking-wide text-blue font-parkinsans">
          Verify OTP
        </h1>
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          onComplete={handleComplete}
          type="numeric"
          numInputs={6}
          separator={<span>-</span>}
          isInputNum={true}
          inputStyle={{
            width: "3.5rem",
            height: "3.5rem",
            margin: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid gray",
            marginTop: "30px",
          }}
          renderInput={(props) => <input {...props} className="custom-input" />}
        />
        <div className="text-center mt-4">
          <p className="text-blue tracking-wide">
            Time remaining:{" "}
            <span className="font-semi text-red-500">
              {formatTime(timeLeft)}
            </span>
          </p>
          {timeLeft === 0 && (
            <button
              onClick={resendOtp}
              className="text-blue-500 underline mt-2"
            >
              Resend OTP
            </button>
          )}
        </div>
        <button
          onClick={handleVerifyOtp}
          disabled={isExpired}
          className="w-[35%] bg-blue font-parkinsans font-semibold tracking-wide text-white py-3 px-4 rounded-lg mt-6 hover:bg-blue-600 cursor-pointer"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;
