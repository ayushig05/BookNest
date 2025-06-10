import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../book/bookCard";
import Loader from "../loader";
import Star from "../../assets/favourite.webp";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Favourites = () => {
  const [favouriteBooks, setFavouriteBooks] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/get-favourite-book`,
        { headers }
      );
      setFavouriteBooks(response.data.data);
    };
    fetch();
  }, [favouriteBooks]);

  return (
    <>
      {!favouriteBooks ? (
        <div className="w-full h-[100%] flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : favouriteBooks.length === 0 ? (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex flex-col items-center justify-center w-full">
          No Favourite Books
          <img src={Star} alt="star" className="h-[20vh] my-8" />
        </div>
      ) : (
        <div>
          <h1 className="text-2xl md:text-5xl font-semibold text-yellow-700 mb-8">
            Favourites
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {favouriteBooks &&
              favouriteBooks.map((items, index) => (
                <div key={index}>
                  <BookCard data={items} favourite={true} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Favourites;
