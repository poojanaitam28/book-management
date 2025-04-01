import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import { GoArrowRight } from "react-icons/go";
import ApiConfig from "../config/ApiConfig";
import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const navigate = useNavigate();
  console.log("API CONFIG", ApiConfig.register);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(2, "Must be at least 2 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(2, "Must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    gender: Yup.mixed()
      .oneOf(["Male", "Female", "Other"], "Gender is required")
      .required("Gender is required"),
    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.register,
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          mobileNumber: values.phone,
          gender: values.gender,
          password: values.password,
        },
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate(`/verify-otp?email=${values.email}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className='w-full bg-blue md:h-screen p-1 bg-cover bg-center bg-[url("https://img.freepik.com/free-photo/ancient-book-collection-old-cellar-shelves-generated-by-ai_188544-42329.jpg?ga=GA1.1.2100011829.1732618920&semt=ais_hybrid")]'>
      <div className="md:w-[60%] bg-blue h-auto md:mt-20 mt-10 mb-5 mx-auto border border-white rounded-2xl text-white px-5 py-2">
        <h1 className="text-orange font-bold mt-4 font-fraunces text-lg">
          Bookmarks.
        </h1>
        <h1 className="text-2xl font-poppins tracking-wide font-semibold mt-2">
          Register
        </h1>
        <p className="hidden md:flex text-sm text-slate-300">
          Enter your details below to create your account and get started.
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-3 bg-red-00">
                <div className="w-full bg-red-00 h-24 flex flex-col p-2">
                  <label
                    htmlFor="firstName"
                    className="text-white font-montserrat"
                  >
                    First Name
                  </label>
                  <input
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="First Name"
                    className="px-3 py-2 rounded-lg bg-transparent border border-slate-200 outline-none font-montserrat capitalize"
                  />

                  {errors.firstName && touched.firstName && (
                    <p className="text-orange text-sm mb-2 mt-1 px-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 h-24 flex flex-col p-2">
                  <label
                    htmlFor="lastName"
                    className="text-white font-montserrat"
                  >
                    Last Name
                  </label>
                  <input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Last Name"
                    className="px-3 py-2 rounded-lg bg-transparent border border-slate-200 outline-none font-montserrat capitalize "
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-orange text-sm mb-2 mt-1 px-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 bg-red-00 mt-1">
                <div className="flex w-full flex-col p-2 h-24">
                  <label htmlFor="email" className="text-white font-montserrat">
                    Email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Email"
                    className="px-3 py-2 rounded-lg bg-transparent border border-slate-200 outline-none font-montserrat "
                  />
                  {errors.email && touched.email && (
                    <p className="text-orange text-sm mb-2 mt-1 px-2">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="flex w-full bg-red-00 flex-col p-2 h-24">
                  <label htmlFor="phone" className="text-white font-montserrat">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your phone number"
                    className="px-3 py-2 rounded-lg  bg-transparent border border-slate-200 outline-none font-montserrat"
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                  />
                  {errors.phone && touched.phone && (
                    <p className="text-orange text-sm mb-2 mt-1 px-2">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 bg-red-00 mt-3 px-3">
                <label htmlFor="male">Male </label>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                {errors.gender && touched.gender && (
                  <p className="text-orange text-sm mb-2 mt-1 px-2 flex justify-center items-center">
                    {errors.gender}
                  </p>
                )}
                <label htmlFor="female">Female </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                {errors.gender && touched.gender && (
                  <p className="text-orange text-sm mb-2 mt-1 px-2 flex justify-center items-center">
                    {errors.gender}
                  </p>
                )}
                <label htmlFor="other">Other</label>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                />
                {errors.gender && touched.gender && (
                  <p className="text-orange text-sm mb-2 mt-1 px-2 flex justify-center items-center">
                    {errors.gender}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
                <div className="flex w-full bg-red-00 flex-col p-2 h-24">
                  <label
                    htmlFor="password"
                    className="text-white font-montserrat"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your password"
                    className="px-3 py-2 rounded-lg bg-transparent border border-slate-200 outline-none font-montserrat "
                  />
                  {errors.password && touched.password && (
                    <p className="text-orange text-sm mb-2 mt-1 px-2">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="flex w-full bg-red-00 flex-col p-2 h-24">
                  <label
                    htmlFor="confirmPassword"
                    className=" text-white font-montserrat"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your confirm password"
                    className="px-3 py-2 rounded-lg bg-transparent border border-slate-200 outline-none font-montserrat "
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p className="text-orange text-sm mb-2 mt-1 px-2">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="w-full bg-red-00 md:mt-3 mt-3 p-2">
                <button
                  type="submit"
                  className="w-full text-center md:w-48 border flex justify-center items-center gap-2 border-white px-3 py-2 rounded-lg font-montserrat hover:opacity-60 transition-all duration-300"
                >
                  Submit <GoArrowRight />
                </button>
                <p className="text-slate-200 mt-6 text-md tracking-wide mb-2">
                  Already have an account?{" "}
                  <a className="text-sky-500 underline" href="/login">
                    Login
                  </a>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
