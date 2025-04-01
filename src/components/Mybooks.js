import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ApiConfig from "../config/ApiConfig";
import toast from "react-hot-toast";
import Navbar from "./Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Spinner from "./Spinner";

function Mybooks() {
  const navigate = useNavigate();
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState();

  const getAllBooks = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: ApiConfig.myBooks,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setMyBooks(response.data.books);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  const handleDeleteBook = async (book_id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `${ApiConfig.deleteBook}/${book_id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getAllBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditBook = async (book) => {
    navigate("/addbook", {
      state: {
        book: book,
        type: "edit",
      },
    });
  };

  const handleFav = async (book) => {
    console.log(book._id);
    try {
      const response = await axios({
        method: "patch",
        url: ApiConfig.addFavourite,
        data: {
          bookId: book._id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        getAllBooks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <div className="w-full h-screen bg-[url('https://images.unsplash.com/photo-1523249322636-7defc1f0c35a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8MHwwfHx8Mg%3D%3D')] bg-cover bg-center overflow-auto ">
      <div className="fixed top-0 w-full z-20">
        <Navbar />
      </div>

      <div className="w-full h-screen bg-red-00 pt-20 mb-10">
        <h1 className="bg-red-00 text-shadow-md text-blue font-fraunces text-[50px] tracking-wide mt-5 text-center font-extrabold p-2">
          My Books
        </h1>
        {loading ? (
          <Spinner />
        ) : (
          <div className="w-full bg-red-00 h-full flex flex-wrap justify-center items-center space-x-5 ">
            {myBooks.map((book, _id) => {
              return (
                <div
                  key={book._id}
                  className="w-96 h-auto bg-slate-200 opacity-90 p-2 mt-5 shadow-xl mb-10 rounded-md"
                >
                  <img
                    className="w-full h-64 bg-cover bg-center"
                    src={book.imageUrl}
                    alt=""
                  />
                  <h1 className="font-bold mt-3 text-xl tracking-wide text-blue font-poppins capitalize">
                    {book.bookName}
                  </h1>
                  <h1 className="text-md font-poppins text-slate-400 capitalize">
                    {book.authorName}
                  </h1>
                  <h1 className="text-sm font-poppins text-slate-400 mt-3">
                    {book?.category?.categoryName}
                  </h1>
                  <h1 className="text-sm font-poppins text-slate-400">
                    {book.subCategory.subCategoryName}
                  </h1>
                  <p className="mt-4 text-md font-poppins text-slate-400">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dolor labore sint autem quos, praesentium dolorem!
                  </p>
                  <div className="flex justify-center items-center w-full mt-5 space-x-5">
                    <IconButton aria-label="edit" size="large">
                      <FavoriteIcon
                        onClick={() => handleFav(book)}
                        className={`${
                          book.isFavourite ? "text-red-500" : "text-blue"
                        } transition-colors duration-300`}
                        fontSize="inherit"
                      />
                    </IconButton>
                    <IconButton aria-label="edit" size="large">
                      <EditIcon
                        onClick={() => handleEditBook(book)}
                        className="text-blue"
                        fontSize="inherit"
                      />
                    </IconButton>
                    <IconButton aria-label="delete" size="large">
                      <DeleteIcon
                        onClick={() => handleDeleteBook(book._id)}
                        className="text-blue"
                        fontSize="inherit"
                      />
                    </IconButton>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Mybooks;
