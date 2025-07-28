import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader";
import Order from "../../assets/order.avif";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/v1/get-order-history`,
          { headers }
        );
        setOrderHistory(response.data.data);
      } catch (err) {
        console.error("Failed to fetch order history:", err);
        setOrderHistory([]);
      }
    };
    fetch();
  }, []);

  return (
    <>
      {!orderHistory ? (
        <div className="w-full h-full flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="text-5xl font-semibold h-full text-zinc-500 flex flex-col items-center justify-center w-full">
          No Order History
          <img src={Order} alt="Empty Cart" className="h-[20vh] mb-8" />
        </div>
      ) : (
        <div className="h-full p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-yellow-700 mb-8">
            Your Order History
          </h1>

          <div className="mt-4 bg-yellow-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%] text-center">Sr.</div>
            <div className="w-[22%]">Books</div>
            <div className="w-[45%]">Description</div>
            <div className="w-[9%]">Price</div>
            <div className="w-[16%]">Status</div>
            <div className="w-none md:w-[5%] hidden md:block">Mode</div>
          </div>

          {orderHistory.map((item, index) => (
            <div
              key={item._id}
              className="bg-yellow-700 w-full rounded py-2 px-4 flex gap-4 hover:bg-yellow-900 hover:cursor-pointer transition-all duration-300"
            >
              <div className="w-[3%] text-center">{index + 1}</div>

              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${item.book._id}`}
                  className="hover:text-black"
                >
                  {item.book.title}
                </Link>
              </div>

              <div className="w-[45%]">
                {item.book.description.slice(0, 50)}...
              </div>

              <div className="w-[9%]">₹ {item.book.price}</div>

              <div className="w-[16%] font-semibold">
                {item.status === "Order Placed" ? (
                  <span className="text-green-500">{item.status}</span>
                ) : item.status === "Cancelled" ? (
                  <span className="text-red-500">{item.status}</span>
                ) : (
                  <span className="text-yellow-500">{item.status}</span>
                )}
              </div>

              <div className="w-none md:w-[5%] hidden md:block">
                <span className="text-sm text-zinc-400">COD</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
