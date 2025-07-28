import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../loader";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Settings = () => {
  const [value, setValue] = useState({ address: "" });
  const [profileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/v1/get-user-information`,
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (err) {
        console.error("Failed to load profile", err);
      }
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const submitAddress = async () => {
    if (!value.address.trim()) {
      return alert("Address cannot be empty!");
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/v1/update-address`,
        value,
        { headers }
      );
      alert(response.data.message || "Address updated!");
      setProfileData((prev) => ({
        ...prev,
        address: value.address,
      }));
    } catch (err) {
      alert("Failed to update address.");
    }
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

          <div className="flex flex-wrap gap-8">
            <div className="text-black w-full md:w-1/2">
              <label>Username</label>
              <p className="p-2 rounded border-2 border-zinc-500 mt-2 font-semibold">
                {profileData.username}
              </p>
            </div>
            <div className="text-black w-full md:w-1/2">
              <label>Email</label>
              <p className="p-2 rounded border-2 border-zinc-500 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col text-black">
            <label>Address</label>
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
              disabled={value.address === profileData.address}
              className={`px-3 py-2 rounded font-semibold ${
                value.address === profileData.address
                  ? "bg-yellow-600 opacity-50 cursor-not-allowed"
                  : "bg-yellow-600 hover:bg-yellow-400 transition-all duration-300"
              } text-zinc-800`}
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
