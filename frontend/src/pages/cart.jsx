import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import CartImage from "../assets/cart.png";
import { AiFillDelete } from "react-icons/ai";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/v1/get-cart-book`, { headers });
        setCart(response.data.data || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        setCart([]);
      }
    };
    fetchCart();
  }, []);
  useEffect(() => {
    if (cart && cart.length > 0) {
      const sum = cart.reduce((acc, book) => acc + book.price, 0);
      setTotal(sum);
    }
  }, [cart]);

  const deleteItem = async (bookId) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/v1/remove-from-cart/${bookId}`,
        {},
        { headers }
      );
      alert(response.data.message);
      setCart((prev) => prev.filter((book) => book._id !== bookId));
    } catch (err) {
      alert("Failed to remove item from cart.");
    }
  };

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/place-order`,
        { order: cart },
        { headers }
      );
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (err) {
      alert("Failed to place order.");
    }
  };

  return (
    <div className="px-4 md:px-12 py-8 h-auto">
      {!cart ? (
        <div className="w-full h-[100%] flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : cart.length === 0 ? (
        <div className="h-screen flex items-center justify-center flex-col">
          <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400 mb-4">Empty Cart</h1>
          <img src={CartImage} alt="Empty Cart" className="lg:h-[50vh]" />
        </div>
      ) : (
        <>
          <h1 className="text-5xl font-semibold text-yellow-700 mb-8">Your Cart</h1>
          {cart.map((item) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-400 justify-between items-center"
              key={item._id}
            >
              <img src={item.url} alt={item.title} className="h-[20vh] md:h-[10vh] object-cover" />
              <div className="w-full md:w-auto mt-4 md:mt-0">
                <h1 className="text-2xl text-black font-semibold">{item.title}</h1>
                <p className="text-black mt-2 hidden lg:block">{item.description.slice(0, 100)}...</p>
              </div>
              <div className="flex items-center mt-4 md:mt-0 justify-between w-full md:w-auto">
                <h2 className="text-black text-3xl font-semibold">₹ {item.price}</h2>
                <button
                  className="bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {cart && cart.length > 0 && (
        <div className="mt-6 w-full flex justify-end">
          <div className="p-4 bg-zinc-400 rounded w-full md:w-[30%]">
            <h1 className="text-3xl text-black font-semibold">Total Amount</h1>
            <div className="mt-3 flex items-center justify-between text-xl text-black">
              <h2>{cart.length} books</h2>
              <h2>₹ {total}</h2>
            </div>
            <button
              className="mt-4 bg-zinc-100 hover:bg-zinc-300 text-black font-semibold px-4 py-2 w-full rounded transition"
              onClick={placeOrder}
            >
              Place your Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
