import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "./bookCard";
import Loader from "../loader";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RecentlyAddedBook = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/get-recent-books`);
        setData(response.data.data || []);
      } catch (error) {
        console.error("Failed to fetch recent books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-700 font-semibold">Recently Added Books</h4>

      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : data.length === 0 ? (
        <p className="my-8 text-zinc-700">No recently added books found.</p>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <BookCard key={item._id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentlyAddedBook;
