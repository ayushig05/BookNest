import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/loader";
import BookCard from "../components/book/bookCard";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Books = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/get-all-books`);
        setData(response.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="px-4 md:px-12 py-8 h-auto min-h-screen text-zinc-100">
      <h4 className="text-3xl font-semibold text-yellow-700">
        All Books
      </h4>

      {loading ? (
        <div className="w-full h-[60vh] flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="w-full text-center text-2xl mt-16 text-zinc-500">
          No books found.
        </div>
      ) : (
        <div className="my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((book, index) => (
            <BookCard key={book._id || index} data={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
