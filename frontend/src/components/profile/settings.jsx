import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import Loader from "../loader";

const Settings = () => {
  const [value, setValue] = useState();
  const [profileData, setProfileData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-user-information",
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:3000/api/v1/update-address",
      value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!profileData ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-yellow-700 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div className="text-black">
              <label 
                htmlFor=""
              >
                Username
              </label>
              <p className="p-2 rounded border-2 border-zinc-500 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="text-black">
              <label 
                htmlFor=""
              >
                Email
              </label>
              <p className="p-2 rounded border-2 border-zinc-500 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col text-black">
            <label 
              htmlFor=""
            >
              Address
            </label>
            <textarea
              className="p-2 rounded border-2 border-zinc-500 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={change}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-600 text-zinc-800 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
