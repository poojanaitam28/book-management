import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ApiConfig from "../config/ApiConfig";
import toast from "react-hot-toast";
import Navbar from "./Navbar";

function Addbook() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { book, type } = location.state || {};

  const initialValues = {
    book_name: book?.bookName ? book?.bookName : "",
    author_name: book?.authorName ? book?.authorName : "",
    category: book?.category?._id ? book?.category?._id : "",
    sub_category: book?.category?._id ? book?.category?._id : "",
    image: book?.imageUrl ? book?.imageUrl : "",
  };

  const validationSchema = Yup.object({
    book_name: Yup.string().required("Book Name is required"),
    author_name: Yup.string().required("Author Name is required"),
    category: Yup.string().required("Category is required"),
    sub_category: Yup.string().required("Sub Category is required"),
    image: Yup.string().required("Image is required"),
  });

  const handleSubmit = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.addBook,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          bookName: values.book_name,
          authorName: values.author_name,
          category: values.category,
          subCategory: values.sub_category,
          imageUrl: values.image,
        },
      });
      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate("/mybooks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(ApiConfig.bookcategories);
      console.log(response);
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async (selectedCategory) => {
    try {
      const response = await axios.get(ApiConfig.booksubcategories, {
        params: {
          categoryId: selectedCategory,
        },
      });
      console.log(response);
      if (response.data.success) {
        setSubCategories(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async (file, setFieldValue) => {
    console.log("File selected for upload:", file);
    let formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios({
        method: "post",
        url: ApiConfig.uploadImage,
        data: formData,
      });
      console.log(response);
      if (response.data.success) {
        console.log("Uploaded img url", response.data.url);
        setFieldValue("image", response.data.url);
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const handleUpdateBook = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios({
        method: "put",
        url: `${ApiConfig.updateBook}/${book._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          bookName: values.book_name,
          authorName: values.author_name,
          category: values.category,
          subCategory: values.sub_category,
          imageUrl: values.image,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("/mybooks");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      fetchSubCategories(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="w-full h-auto bg-slate-400 ">
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className=" w-full pt-36 pb-20 ml-20">
        <div className="w-[60%] bg-blue h-auto mx-auto px-2 py-8 flex flex-col justify-center items-center">
          <h1 className="bg-red-00 text-orange text-shadow-md font-fraunces text-4xl tracking-wide font-extrabold mt-5">
            Add a Book
          </h1>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) =>
              type === "edit" ? handleUpdateBook(values) : handleSubmit(values)
            }
          >
            {({
              values,
              handleBlur,
              handleChange,
              errors,
              touched,
              setFieldValue,
            }) => (
              <Form className="w-[80%] bg-red-00">
                <div className="w-full bg-red-00 h-28 flex flex-col gap-2 px-14 py-2 mt-10">
                  <label htmlFor="email" className="text-white font-montserrat">
                    Book Name
                  </label>
                  <input
                    name="book_name"
                    value={values.book_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Book name"
                    className="px-3 py-2 rounded-lg w-[100%] bg-transparent border border-slate-200 text-white outline-none font-montserrat "
                  />{" "}
                  {errors.book_name && touched.book_name && (
                    <p className="text-orange mt-[-5px] px-1 text-sm">
                      {errors.book_name}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 h-28 flex flex-col gap-2 px-14 py-2 mt-1">
                  <label htmlFor="email" className="text-white font-montserrat">
                    Author Name
                  </label>
                  <input
                    name="author_name"
                    value={values.author_name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    placeholder="Author Name"
                    className="px-3 py-2 rounded-lg text-white w-[100%] bg-transparent border border-slate-200 outline-none font-montserrat "
                  />{" "}
                  {errors.author_name && touched.author_name && (
                    <p className="text-orange mt-[-5px] px-1 text-sm">
                      {errors.author_name}
                    </p>
                  )}
                </div>
                <div className="w-full bg-red-00 h-28 flex flex-col gap-2 px-14 py-2 mt-1">
                  <label
                    htmlFor="dropdown"
                    className=" text-white font-montserrat"
                  >
                    Select Category
                  </label>
                  <select
                    name="category"
                    value={values.category}
                    onChange={(e) => {
                      handleChange(e);
                      const value = e.target.value;
                      setSelectedCategory(value);
                    }}
                    onBlur={handleBlur}
                    id="dropdown"
                    className="w-[100%] px-4 py-2 text-gray-100 bg-transparent border border-slate-200 outline-none rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled></option>
                    {categories.map((option, _id) => (
                      <option key={option._id} value={option?._id}>
                        {option?.categoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full bg-red-00 h-28 flex flex-col gap-2 px-14 py-2 mt-1">
                  <label
                    htmlFor="dropdown"
                    className=" text-white font-montserrat"
                  >
                    Select Sub Category
                  </label>
                  <select
                    name="sub_category"
                    value={values.sub_category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="dropdown"
                    className="w-[100%] px-4 py-2 text-gray-100 bg-transparent border border-slate-200 outline-none rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled></option>
                    {subCategories.map((subCategory) => (
                      <option key={subCategory?._id} value={subCategory?._id}>
                        {subCategory?.subCategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full bg-red-00 h-auto flex flex-col gap-2 px-14 py-2 mt-1">
                  {values.image ? (
                    <div>
                      <img src={values.image} alt="" />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-[100%] border flex items-center gap-6 text-white border-slate-200 px-3 py-2 rounded-lg font-montserrat"
                    >
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            console.log("File selected:", file);
                            uploadImage(file, setFieldValue);
                          }
                        }}
                      />
                    </button>
                  )}
                </div>
                <div className="w-full flex justify-between items-center bg-red-00 h-28 gap-2 px-14 py-1 mt-3 bg-red-00">
                  <button
                    type="submit"
                    onClick={() => navigate("/dashboard")}
                    className="w-28 border flex items-center gap-4 text-white border-slate-200 px-3 py-2.5 rounded-lg font-montserrat hover:opacity-60 transition-all duration-300"
                  >
                    <IoArrowBack />
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-28 border flex items-center gap-2 text-white border-slate-200 px-3 py-2.5 rounded-lg font-montserrat hover:opacity-60 transition-all duration-300"
                  >
                    {type === "edit" ? "Update Book" : "Add Book"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Addbook;
