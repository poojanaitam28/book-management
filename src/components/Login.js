import axios from "axios";
import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { GoArrowRight } from "react-icons/go";
import * as Yup from "yup";
import ApiConfig from "../config/ApiConfig";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

function Login() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.login,
        data: {
          email: values.email,
          password: values.password,
        },
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        auth.userLogin(true, response.data.token);
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='w-full h-full flex justify-center items-center bg-cover bg-center bg-[url("https://plus.unsplash.com/premium_photo-1676944426431-70186656d1f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2FsbHBhcGVyJTIwc3BhY2V8ZW58MHwwfDB8fHww")] p-2'>
      <div className="md:w-[60%] grid grid-cols-1 md:grid-cols-2 h-auto bg-orange p-1">
        <div className=" bg-blue p-6 ">
          <div className="w-full bg-red-00">
            <h1 className="text-orange font-semibold font-parkinsans mt-2">
              Bookmark.
            </h1>
            <h1 className="text-2xl font-fraunces font-semibold tracking-wide mt-4">
              Welcome Back.
            </h1>
            <p className="font-poppins text-slate-400 text-xs">
              Please Enter your Account details
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => (
              <Form>
                <div className="w-full bg-red-00 h-24 flex flex-col gap-1 mt-4">
                  <label htmlFor="email" className="text-white font-montserrat">
                    Email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    placeholder="Email"
                    className="px-3 py-2 rounded-lg bg-transparent text-white border border-slate-200 outline-none font-montserrat "
                  />{" "}
                  {errors.email && touched.email && (
                    <p className=" text-orange mt-[-5px] px-1 text-sm">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 h-24 flex flex-col gap-1 ">
                  <label
                    htmlFor="password"
                    className="text-white font-montserrat"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="password"
                    className="px-3 py-2 rounded-lg text-white bg-transparent border border-slate-200 outline-none font-montserrat capitalize"
                  />{" "}
                  {errors.password && touched.password && (
                    <p className=" text-orange mt-[-5px] px-1 text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 p-2">
                  <p className="text-slate-300 mb-2 tracking-wide flex justify-end items-center">
                    {" "}
                    <a className="" href="/forget-password">
                      Forget Password?
                    </a>
                  </p>
                  <button
                    type="submit"
                    className="w-full border mt-2.5 flex justify-center items-center gap-2 border-white px-3 py-2 rounded-lg font-montserrat text-center text-white hover:text-slate-400 hover:border-slate-400"
                  >
                    Submit <GoArrowRight />
                  </button>
                  <p className="text-slate-300 mt-4 tracking-wide">
                    Don't have a account?{" "}
                    <a className="text-sky-500" href="/signup">
                      Register for Free
                    </a>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="h-full bg-gray-400 overflow-hidden bg-[url('https://img.freepik.com/free-vector/hand-drawn-book-spine-illustration_23-2149329859.jpg?ga=GA1.1.2100011829.1732618920&semt=ais_hybrid')] bg-cover bg-center"></div>
      </div>
    </div>
  );
}

export default Login;
