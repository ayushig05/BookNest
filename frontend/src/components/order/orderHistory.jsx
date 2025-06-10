import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader";
import Order from "../../assets/order.avif";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `${backendUrl}/api/v1/get-order-history`,
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, [orderHistory]);

  return (
    <>
      {!orderHistory ? (
        <div className="w-full h-[100%] flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : orderHistory.length === 0 ? (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex flex-col items-center justify-center w-full">
          No Order History
          <img 
            src={Order} 
            alt="Empty Cart" 
            className="h-[20vh] mb-8" 
          />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-yellow-700 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-yellow-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">
                Sr.
              </h1>
            </div>
            <div className="w-[22%]">
              <h1 className="">
                Books
              </h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">
                Description
              </h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">
                Price
              </h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">
                Status
              </h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">
                Mode
              </h1>
            </div>
          </div>
          {orderHistory.map((items, index) => (
            <div
              className="bg-yellow-700 w-full rounded py-2 px-4 flex gap-4 hover:bg-yellow-900 hover:cursor-pointer"
              key={items.book._id}
            >
              <div className="w-[3%]">
                <h1 className="text-center">
                  {index + 1}
                </h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-black"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">
                  {items.book.description.slice(0, 50)}...
                </h1>
              </div>
              <div className="w-[9%]">
                <h1 className="">
                  ₹ {items.book.price}
                </h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold text-yellow-500">
                  {items.status === "Order Placed" ? (
                    <div className="text-green-500">
                      {items.status}
                    </div>
                  ) : items.status === "Cancelled" ? (
                    <div className="text-red-500">
                      {items.status}
                    </div>
                  ) : (
                    <div className="text-yellow-500">
                      {items.status}
                    </div>
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm texr-zinc-400">
                  COD
                </h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;
