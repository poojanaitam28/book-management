import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import ApiConfig from "../config/ApiConfig";

function ForgetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.forgetPassword,
        data: {
          email: values.email,
        },
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/')
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

      <div className="w-[60%] h-full shadow-md flex flex-col justify-center items-center rounded-xl bg-[url('https://images.unsplash.com/photo-1500964757637-c85e8a162699?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2FsbHBhcGVyfGVufDB8MHwwfHx8Mg%3D%3D')] mx-auto mt-20 p-3 bg-cover bg-center">
        <h1 className=" text-blue font-fraunces text-4xl tracking-wide mt-5 text-center font-extrabold p-2">
          Forget Password
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, handleChange, handleBlur, errors, touched }) => (
            <Form>
              <div className="w-full bg-red-00 h-28 flex flex-col gap-2 p-2 mt-6">
                <label htmlFor="email" className="text-blue font-montserrat">
                  Email
                </label>
                <input
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  placeholder="Email"
                  className="px-3 py-2 rounded-xl w-96 bg-transparent border border-blue outline-none font-montserrat "
                />
                  {errors.email && touched.email && (
                  <p className="text-red-700 mt-[-5px] px-1 text-sm">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-full bg-red-00 mt-1 p-2 ">
                <button
                  type="submit"
                  className="w-28 h-1/2 border flex items-center gap-4 border-blue px-3 py-2 rounded-lg font-montserrat mb-10"
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ForgetPassword;
