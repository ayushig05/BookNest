import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import CartImage from "../assets/cart.png";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-cart-book",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, [cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(
      `http://localhost:3000/api/v1//remove-from-cart/${bookid}`,
      {},
      { headers }
    );
    alert(response.data.message);
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const placeOrder = async () => {
    try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/place-order",
          { order: cart },
          { headers }
        );
        alert(response.data.message);
        navigate("/profile/orderHistory");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="px-12 h-auto py-8">
      {!cart ? (
        <div className="w-full h-[100%] flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : cart.length === 0 ? (
        <div className="h-screen">
          <div className="h-[100%] flex items-center justify-center flex-col">
            <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">
              Empty Cart
            </h1>
            <img 
              src={CartImage} 
              alt="Empty Cart" 
              className="lg:h-[50vh]" 
            />
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-yellow-700 mb-8">
            Your Cart
          </h1>
          {cart.map((items, index) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-400 justify-between items-center"
              key={index}
            >
              <img
                src={items.url}
                alt="/"
                className="h-[20vh] md:h-[10vh] object-cover"
              />
              <div className="w-full md:w-auto">
                <h1 className="text-2xl text-black font-semibold text-start mt-2 md:mt-0">
                  {items.title}
                </h1>
                <p className="text-normal text-black mt-2 hidden lg:block">
                  {items.description.slice(0, 100)}...
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h2 className="text-black text-3xl font-semibold flex">
                  ₹ {items.price}
                </h2>
                <button
                  className="bg-red-100 cursor-pointer text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(items._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-zinc-400 rounded">
            <h1 className="text-3xl text-black font-semibold">
              Total Amount
            </h1>
            <div className="mt-3 flex items-center justify-between text-xl text-black">
              <h2>
                {cart.length} books
              </h2>
              <h2>
                ₹ {total}
              </h2>
            </div>
            <div className="w-[100%] mt-3">
              <button
                className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300 cursor-pointer"
                onClick={placeOrder}
              >
                Place your Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
