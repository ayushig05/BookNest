import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../loader";
import SeeUserData from "../profile/seeUserData";
import { 
  FaUserCircle, 
  FaCheck 
} from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ status: e.target.value });
  };

  const submitChanges = async (index) => {
    const id = allOrders[index]._id;
    const response = await axios.put(
      `http://localhost:3000/api/v1/update-status/${id}`,
      values,
      { headers }
    );
    alert(response.data.message);
    const updatedOrders = [...allOrders];
    updatedOrders[index].status = values.status;
    setAllOrders(updatedOrders);
    setValues({ status: "" });
    setOptions(-1);
  };

  return (
    <>
      {!allOrders.length ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-yellow-700 mb-8">
            All Orders
          </h1>
          <div className="mt-4 bg-yellow-900 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">
                Sr.
              </h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>
                Books
              </h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>
                Description
              </h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>
                Price
              </h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>
                Status
              </h1>
            </div>
            <div className="w-[10%] md:w-[5%] mt-1">
              <h1>
                <FaUserCircle />
              </h1>
            </div>
          </div>
          {allOrders.map((items, index) => (
            <div
              className="bg-yellow-700 w-full rounded py-2 px-4 flex gap-2 hover:bg-yellow-900 hover:cursor-pointer transition-all duration-300"
              key={index}
            >
              <div className="w-[3%]">
                <h1 className="text-center">
                  {index + 1}
                </h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-black"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>
                  {items.book.description.slice(0, 50)}...
                </h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>
                  ₹ {items.book.price}
                </h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <button
                  className="hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    setOptions(index === options ? -1 : index);
                  }}
                >
                  {items.status === "Order Placed" ? (
                    <div className="text-green-500">
                      {items.status}
                    </div>
                  ) : items.status === "Canceled" ? (
                    <div className="text-red-500">
                      {items.status}
                    </div>
                  ) : (
                    <div className="text-yellow-500">
                      {items.status}
                    </div>
                  )}
                </button>
                {options === index && (
                  <div className="mt-2 flex">
                    <select
                      className="bg-gray-800 text-white"
                      value={values.status || items.status}
                      onChange={(e) => change(e)}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((status, id) => (
                        <option 
                          key={id} 
                          value={status}
                        >
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => submitChanges(index)}
                    >
                      <FaCheck />
                    </button>
                  </div>
                )}
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDiv={userDiv}
          userDivData={userDivData}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
