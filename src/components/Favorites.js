import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import ApiConfig from "../config/ApiConfig";
import Spinner from "./Spinner";


function Favorites() {
  const [loading, setLoading] = useState(false);
  const [myFav, setMyFav] = useState([]);
  

  const handleGetAllFaviourite = async () => {
    setLoading(true)
    try {
      const response = await axios({
        method: "get",
        url: ApiConfig.allFavourite,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response);
      if (response.status === 200) {
        setMyFav(response.data.books);
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    handleGetAllFaviourite();
  }, []);

  return (
    <div className="w-full h-[100%] bg-[url('https://images.unsplash.com/photo-1523249322636-7defc1f0c35a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGJvb2tzfGVufDB8MHwwfHx8Mg%3D%3D')] bg-cover bg-center">
      <Navbar />

      <div className="w-full bg-red-00 mb-10 mt-5">
        <h1 className="bg-red-00 text-blue text-shadow-md font-fraunces text-[50px] tracking-wide mt-5 text-center font-extrabold p-2">
          My Favoutie Books
        </h1>
        {
          loading ? (<Spinner />) : (
            <div className="w-full bg-red-00 flex flex-wrap justify-center items-center space-x-5 bg-red-00">
            {myFav.map((book, _id) => {
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
                  <p className="mt-4 text-md font-poppins text-slate-400 mb-8">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dolor labore sint autem quos, praesentium dolorem!
                  </p>
                </div>
              );
            })}
          </div>
          )
        }
      
      </div>
    </div>
  );
}

export default Favorites;
