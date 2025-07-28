import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BookCard = ({ data, favourite, onRemoved }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveFavourite = async () => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/v1/remove-book-from-favourite`,
        {},
        { headers }
      );
      alert(response.data.message);
      if (onRemoved) onRemoved();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove from favourites");
    }
  };

  return (
    <div className="bg-yellow-700 rounded p-4 flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-900 flex items-center justify-center">
          <img className="h-[25vh]" src={data.url} alt="Book" />
        </div>
        <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
        <p className="mt-2 text-white font-semibold">by {data.author}</p>
        <p className="mt-2 text-xl text-white font-semibold">₹{data.price}</p>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-100 cursor-pointer mt-4 px-4 py-2 rounded border border-yellow-500 text-yellow-500"
          onClick={handleRemoveFavourite}
        >
          Remove from Favourite
        </button>
      )}
    </div>
  );
};

export default BookCard;
