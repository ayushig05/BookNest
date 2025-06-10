import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import { 
  useNavigate, 
  useParams 
} from "react-router-dom";
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

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        data.url === "" ||
        data.title === "" ||
        data.author === "" ||
        data.price === "" ||
        data.language === "" ||
        data.description === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.put(
          `${backendUrl}/api/v1/update-book`,
          data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          description: "",
          language: "",
        });
        alert(response.data.message);
        navigate(`/view-book-details/${id}`);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl font-semibold text-blue-500 mb-7">
        Update Book
      </h1>
      <div className="p-4 bg-zinc-600 rounded">
        <div className="mt-2">
          <label 
            htmlFor="" 
            className="text-zinc-400"
          >
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="url of the image"
            name="url"
            required
            value={data.url}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label 
            htmlFor="" 
            className="text-zinc-400"
          >
            Title of the Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="title of the book"
            name="title"
            required
            value={data.title}
            onChange={change}
          />
        </div>
        <div className="mt-2">
          <label 
            htmlFor="" 
            className="text-zinc-400"
          >
            Author of the Book
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="author of the book"
            name="author"
            required
            value={data.author}
            onChange={change}
          />
        </div>
        <div className="mt-2 flex gap-4">
          <div className="w-3/6">
            <label 
              htmlFor="" 
              className="text-zinc-400"
            >
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-400 p-2 outline-none"
              placeholder="language of the book"
              name="language"
              required
              value={data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label 
              htmlFor="" 
              className="text-zinc-400"
            >
              Price
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-400 p-2 outline-none"
              placeholder="price of the book"
              name="price"
              required
              value={data.price}
              onChange={change}
            />
          </div>
        </div>
        <div className="mt-2">
          <label 
            htmlFor="" 
            className="text-zinc-400"
          >
            Description
          </label>
          <textarea
            type="text"
            className="w-full mt-2 bg-zinc-400 p-2 outline-none"
            placeholder="description of the image"
            name="description"
            required
            value={data.description}
            onChange={change}
          />
        </div>
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
