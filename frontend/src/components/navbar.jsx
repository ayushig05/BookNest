import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { TiThMenu } from "react-icons/ti";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [mobileView, setMobileView] = useState(false);

  const toggleMobile = () => setMobileView(!mobileView);

  const baseLinks = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/books" },
    ...(isLoggedIn && role === "user" ? [{ title: "Cart", link: "/cart" }] : []),
  ];

  const profileLink = isLoggedIn
    ? role === "admin"
      ? { title: "Admin Profile", link: "/profile" }
      : { title: "Profile", link: "/profile" }
    : null;

  return (
    <>
      <nav className="relative z-50 flex text-zinc-800 px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4 rounded" src={Logo} alt="logo" />
          <h1 className="text-2xl font-semibold">BookNest</h1>
        </Link>

        <div className="block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4 items-center">
            {baseLinks.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="hover:text-blue-500 transition-all duration-300"
              >
                {item.title}
              </Link>
            ))}

            {isLoggedIn && profileLink && (
              <Link
                to={profileLink.link}
                className="px-4 py-1 border border-blue-500 rounded hover:text-zinc-800 hover:bg-blue-500 transition-all duration-300"
              >
                {profileLink.title}
              </Link>
            )}
          </div>

          {!isLoggedIn && (
            <div className="hidden md:flex gap-4">
              <Link
                to="/login"
                className="px-4 py-1 border border-blue-500 rounded hover:text-zinc-800 hover:bg-blue-500 transition-all duration-300"
              >
                LogIn
              </Link>
            </div>
          )}
          <button
            className="block md:hidden text-zinc-800 text-2xl"
            onClick={toggleMobile}
          >
            <TiThMenu />
          </button>
        </div>
      </nav>

      <div className="w-full h-[0.5px] bg-zinc-500 hidden lg:block"></div>

      {mobileView && (
        <div className="bg-white h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
          {baseLinks.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300"
              onClick={toggleMobile}
            >
              {item.title}
            </Link>
          ))}

          {isLoggedIn && profileLink && (
            <Link
              to={profileLink.link}
              className="text-3xl font-semibold mb-8 px-8 py-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={toggleMobile}
            >
              {profileLink.title}
            </Link>
          )}

          {!isLoggedIn && (
            <Link
              to="/login"
              className="px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-zinc-800 hover:text-white bg-white hover:bg-blue-500 transition-all duration-300"
              onClick={toggleMobile}
            >
              LogIn
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
