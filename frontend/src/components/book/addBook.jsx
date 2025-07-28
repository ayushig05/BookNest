import React, { useState } from "react";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AddBook = () => {
  const [data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    description: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value.trimStart() });
  };

  const submit = async () => {
    const { url, title, author, price, description, language } = data;
    if (!url || !title || !author || !price || !description || !language) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/add-book`,
        data,
        { headers }
      );

      alert(response.data.message || "Book added successfully");
      setData({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: "",
      });
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong.";
      alert(msg);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl font-semibold text-yellow-700 mb-7">Add Book</h1>
      <div className="p-4 border-2 border-zinc-600 rounded">
        <div className="mt-2">
          <label className="text-zinc-900">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="url of the image"
            name="url"
            value={data.url}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label className="text-zinc-900">Title of the Book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="title of the book"
            name="title"
            value={data.title}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label className="text-zinc-900">Author of the Book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="author of the book"
            name="author"
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mt-2 flex gap-4">
          <div className="w-1/2">
            <label className="text-zinc-900">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-400 p-2 outline-none"
              placeholder="language of the book"
              name="language"
              value={data.language}
              onChange={change}
            />
          </div>
          <div className="w-1/2">
            <label className="text-zinc-900">Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-400 p-2 outline-none"
              placeholder="price of the book"
              name="price"
              value={data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-2">
          <label className="text-zinc-900">Description</label>
          <textarea
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="description of the book"
            name="description"
            rows="5"
            value={data.description}
            onChange={change}
          />
        </div>
        <button
          className="mt-4 px-3 bg-yellow-700 text-white font-semibold py-2 rounded hover:bg-yellow-950 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
