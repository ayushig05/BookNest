import React from "react";
import { 
  useEffect, 
  useState 
} from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Loader from "../components/loader";
import Sidebar from "../components/profile/sidebar";
import MobileNav from "../components/profile/mobileNav";

const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [profile, setProfile] = useState();
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
      setProfile(response.data);
    };
    fetch();
  }, []);

  if (isLoggedIn === false) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-white">
        <p>You are not logged in. Please log in first.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-800 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!profile ? (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar 
              data={profile} 
            />
            <MobileNav />
          </div>
          <div className="lg:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
