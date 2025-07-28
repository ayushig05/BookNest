import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../loader";
import { useSelector } from "react-redux";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        alert("Failed to fetch book data");
      }
    };
    fetchBook();
  }, [id]);

  const handleFavourite = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/v1/add-book-to-favourite`, {}, { headers });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to favourites");
    }
  };

  const handleCart = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/v1/add-book-to-cart`, {}, { headers });
      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  const deleteBook = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/v1/delete-book`, { headers });
      alert(response.data.message);
      navigate("/books");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };

  const renderUserActions = () => (
    <div className="flex flex-row md:flex-col items-center mt-8 lg:mt-0">
      <button
        className="bg-white text-3xl p-3 text-red-500 rounded md:rounded-full flex items-center justify-center"
        onClick={handleFavourite}
      >
        <FaHeart />
        <span className="ms-1 text-sm block md:hidden">Favourites</span>
      </button>
      <button
        className="bg-blue-500 text-white text-3xl p-3 mt-0 md:mt-8 rounded md:rounded-full flex items-center justify-center"
        onClick={handleCart}
      >
        <FaShoppingCart />
        <span className="ms-1 text-sm block md:hidden">Add to Cart</span>
      </button>
    </div>
  );

  const renderAdminActions = () => (
    <div className="flex flex-row md:flex-col items-center mt-8 lg:mt-0">
      <Link
        to={`/update-book/${id}`}
        className="bg-white text-3xl p-3 rounded md:rounded-full flex items-center justify-center"
      >
        <FaEdit />
        <span className="ms-1 text-sm block md:hidden">Edit</span>
      </Link>
      <button
        className="bg-white text-red-500 text-3xl p-3 mt-0 md:mt-8 rounded md:rounded-full flex items-center justify-center"
        onClick={deleteBook}
      >
        <MdDelete />
        <span className="ms-1 text-sm block md:hidden">Delete</span>
      </button>
    </div>
  );

  if (!data) {
    return (
      <div className="h-screen bg-zinc-800 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 py-8 flex flex-col md:flex-row">
      <div className="w-full md:w-3/6">
        <div className="flex flex-col md:flex-row bg-zinc-800 p-6 rounded gap-6 justify-around">
          {data.url ? (
            <img
              src={data.url}
              alt={data.title}
              className="h-[40vh] md:h-[50vh] lg:h-[60vh] w-full md:w-[30vw] rounded"
            />
          ) : (
            <p className="text-white">No image available</p>
          )}
          {isLoggedIn && (role === "user" ? renderUserActions() : renderAdminActions())}
        </div>
      </div>

      <div className="p-4 w-full md:w-3/6">
        <h1 className="text-4xl text-yellow-800 font-semibold">{data.title}</h1>
        <p className="text-zinc-800 mt-1">{data.author}</p>
        <p className="text-zinc-800 mt-4 text-xl">{data.description}</p>
        <p className="flex items-center mt-4 text-zinc-800">
          <GrLanguage className="me-3" /> {data.language}
        </p>
        <p className="mt-4 text-yellow-800 text-3xl font-semibold">
          Price: ₹ {data.price}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
