import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader";
import Sidebar from "../components/profile/sidebar";
import MobileNav from "../components/profile/mobileNav";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const headers = {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        };

        const response = await axios.get(
          `${backendUrl}/api/v1/get-user-information`,
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        if (error.response?.status === 403) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          setProfile(null);
        }
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        <p>You are not logged in. Please log in first.</p>
      </div>
    );
  }

  return (
    <div className="px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile ? (
        <div className="w-full h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6">
            <Sidebar data={profile} />
            <MobileNav />
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
