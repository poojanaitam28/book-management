import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import ApiConfig from "../config/ApiConfig";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const resetToken = queryParams.get("reset-token");
  console.log("Reset Token", resetToken);

  const navigate = useNavigate();
  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmNewPassword: Yup.string()
      .required("Confirm Password is required")
      .min(6, "Confirm Password must be at least 6 characters")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.resetPassword,
        data: {
          resetToken: resetToken,
          newPassword: values.newPassword,
        },
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }



  };

  return (
    <div className="w-full">
      <div className="heading w-full bg-slate-100 space-x-2 opacity-80 h-24 flex justify-center items-center px-20 rounded-[45px]">
        <div className="w-[100%] flex justify-center p-2 ">
          <h1 className="text-4xl font-extrabold font-poppins text-orange">
            <a href="/">
              Book<span className="text-blue">mark.</span>{" "}
            </a>
          </h1>
        </div>
      </div>
      <div className="w-[60%] flex flex-col justify-center items-center bg-orange rounded-lg shadow-lg bg-opacity-70 mx-auto mt-20 p-10">
        <h1 className="text-4xl font-fraunces font-extrabold text-blue">
          Reset Password
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleBlur, handleChange, touched, errors }) => (
            <Form>
              <div>
                <div className="w-full bg-red-00 h-28 flex flex-col gap-2 p-2 mt-6">
                  <label htmlFor="email" className="text-blue font-montserrat">
                    New Password
                  </label>
                  <input
                    name="newPassword"
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Password"
                    className="px-3 py-2 rounded-lg w-96 bg-transparent border border-blue outline-none font-montserrat "
                  />
                  {errors.newPassword && touched.newPassword && (
                    <p className="text-red-700 mt-[-5px] px-1 text-sm">
                      {errors.newPassword}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 h-28 flex flex-col gap-2 p-2 mt-1">
                  <label htmlFor="email" className="text-blue font-montserrat">
                    Confirm New Password
                  </label>
                  <input
                    name="confirmNewPassword"
                    value={values.confirmNewPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                    placeholder="Confirm New Password"
                    className="px-3 py-2 rounded-lg border-blue w-96 bg-transparent border outline-none font-montserrat "
                  />
                  {errors.confirmNewPassword && touched.confirmNewPassword && (
                    <p className="text-red-700 mt-[-5px] px-1 text-sm">
                      {errors.confirmNewPassword}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 mt-1 p-2 flex justify-between ">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="w-28 h-1/2 border flex items-center gap-4 border-blue text-blue px-3 py-2 rounded-lg font-montserrat hover:bg-blue hover:text-white transition-all ease-in-out duration-300 hover:opacity-90"
                  >
                    Back{" "}
                    <IoIosArrowRoundBack className="text-xl font-bold text-blue hover:text-white" />
                  </button>
                  <button
                    type="submit"
                    className="w-28 h-1/2 border flex items-center gap-4 border-blue text-blue px-3 py-2 rounded-lg font-montserrat hover:bg-blue hover:text-white transition-all ease-in-out duration-300 hover:opacity-90"
                  >
                    Send{" "}
                    <IoIosArrowRoundForward className="text-xl font-bold text-blue hover:text-white" />
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ResetPassword;
