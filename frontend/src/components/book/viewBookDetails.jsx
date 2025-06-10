import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import { 
  Link, 
  useNavigate, 
  useParams 
} from "react-router-dom";
import axios from "axios";
import Loader from "../loader";
import { useSelector } from "react-redux";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleFavourite = async () => {
    const response = await axios.put(
      `${backendUrl}/api/v1/add-book-to-favourite`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      `${backendUrl}/api/v1/add-book-to-cart`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  const deleteBook = async () => {
    const response = await axios.delete(
      `${backendUrl}/api/v1/delete-book`,
      { headers }
    );
    alert(response.data.message);
    navigate("/books");
  };

  return (
    <>
      {data && (
        <div className="px-4 md:px-12 py-8 flex flex-col md:flex-row lg:flex-row">
          <div className="w-full md:w-3/6 lg:w-3/6">
            <div className="flex flex-col md:flex-row lg:flex-row justify-around rounded bg-zinc-800 md:p-6 p-12 lg:gap-6">
              {data && data.url ? (
                <img
                  src={data.url}
                  alt={data.title || "Book"}
                  className="h-[40vh] md:h-[50vh] lg:h-[60vh] w-[85vw] md:w-[30vw] lg:w-[30vw] rounded"
                />
              ) : (
                <p className="text-zinc-800">
                  No image available
                </p>
              )}
              {isLoggedIn === true && role === "user" ? (
                <div className="flex flex-row md:flex-col lg:flex-col mt-8 lg:mt-0 items-center justify-between md:justify-start lg:justify-start">
                  <button
                    className="bg-white rounded md:rounded-full lg:rounded-full text-3xl p-3 text-red-500 flex items-center justify-center cursor-pointer"
                    onClick={handleFavourite}
                  >
                    <FaHeart />
                    <span className="ms-1 text-sm block md:hidden lg:hidden">
                      Favourites
                    </span>
                  </button>
                  <button
                    className="bg-blue-500 rounded md:rounded-full lg:rounded-full text-3xl p-3 mt-0 md:mt-8 lg:mt-8 text-white flex items-center justify-center cursor-pointer"
                    onClick={handleCart}
                  >
                    <FaShoppingCart />
                    <span className="ms-1 text-sm block md:hidden lg:hidden">
                      Add to Cart
                    </span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-row md:flex-col lg:flex-col mt-8 lg:mt-0 items-center justify-between md:justify-start lg:justify-start">
                  <Link
                    to={`/update-book/${id}`}
                    className="bg-white rounded md:rounded-full lg:rounded-full text-3xl p-3 flex items-center justify-center"
                  >
                    <FaEdit />
                    <span className="ms-1 text-sm block md:hidden lg:hidden">
                      Edit
                    </span>
                  </Link>
                  <button
                    className="bg-white rounded md:rounded-full lg:rounded-full text-3xl p-3 mt-0 md:mt-8 lg:mt-8 text-red-500 flex items-center justify-center cursor-pointer"
                    onClick={deleteBook}
                  >
                    <MdDelete />
                    <span className="ms-1 text-sm block md:hidden lg:hidden">
                      Delete Book
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 w-full md:w-3/6 lg:w-3/6">
            <h1 className="text-4xl text-yellow-800 font-semibold">
              {data?.title}
            </h1>
            <p className="text-zinc-800 mt-1">
              {data?.author}
            </p>
            <p className="text-zinc-800 mt-4 text-xl">
              {data?.description}
            </p>
            <p className="flex mt-4 items-center justify-start text-zinc-800">
              <GrLanguage className="me-3" />
              {data?.language}
            </p>
            <p className="mt-4 text-yellow-800 text-3xl font-semibold">
              Price: ₹ {data?.price}
            </p>
          </div>
        </div>
      )}
      {!data && (
        <div className="h-screen bg-zinc-800 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
