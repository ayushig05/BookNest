import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        alert("Failed to fetch book details.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const change = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async () => {
    try {
      const { url, title, author, price, language, description } = data;
      if (!url || !title || !author || !price || !language || !description) {
        alert("All fields are required");
        return;
      }

      const response = await axios.put(
        `${backendUrl}/api/v1/update-book/${id}`,
        data,
        { headers }
      );

      alert(response.data.message);
      navigate(`/view-book-details/${id}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to update book");
    }
  };

  if (loading) {
    return (
      <div className="h-[100%] w-full flex items-center justify-center text-white">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl font-semibold text-blue-500 mb-7">Update Book</h1>
      <div className="p-4 bg-zinc-600 rounded">
        {["url", "title", "author", "language", "price", "description"].map((field, i) => {
          const label =
            field === "url"
              ? "Image"
              : field.charAt(0).toUpperCase() + field.slice(1).replace("description", "Description");
          return (
            <div key={i} className={field === "description" ? "mt-2" : "mt-2"}>
              <label className="text-zinc-400">{label}</label>
              {field === "description" ? (
                <textarea
                  className="w-full mt-2 bg-zinc-400 p-2 outline-none"
                  rows="4"
                  name="description"
                  placeholder="description of the book"
                  value={data.description}
                  onChange={change}
                />
              ) : (
                <input
                  type="text"
                  className="w-full mt-2 bg-zinc-400 p-2 outline-none"
                  name={field}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  value={data[field]}
                  onChange={change}
                />
              )}
            </div>
          );
        })}
        <button
          className="mt-4 px-3 bg-blue-400 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
