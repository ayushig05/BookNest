import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { TiThMenu } from "react-icons/ti";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "All Books",
      link: "/books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin Profile",
      link: "/profile",
    },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(2, 3);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(4, 1)
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(2, 2)
  }

  const [mobileView, setMobileView] = useState("hidden");

  return (
    <>
      <nav className="relative z-50 flex text-zinc-800 px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4 rounded" src={Logo} alt="logo" />
          <h1 className="text-2xl font-semibold">
            BookStore
          </h1>
        </Link>
        <div className="block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((items, index) => (
              <div className="flex items-center">
                {items.title === "Profile" || items.title === "Admin Profile" ? (
                  <Link
                    to={items.link}
                    className="px-4 py-1 border border-blue-500 rounded hover:text-zinc-800 hover:bg-blue-500 transition-all duration-300"
                    key={index}
                  >
                    {items.title}
                  </Link>
                ) : (
                  <Link
                    to={items.link}
                    className="hover:text-blue-500 transition-all duration-300"
                    key={index}
                  >
                    {items.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
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
            onClick={() =>
              mobileView === "hidden"
                ? setMobileView("block")
                : setMobileView("hidden")
            }
          >
            <TiThMenu />
          </button>
        </div>
      </nav>
      <div className="w-full h-[0.5px] bg-zinc-500 hidden lg:block"></div>

      <div
        className={`${mobileView} bg-white h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((items, index) => (
          <Link
            to={items.link}
            className={`${mobileView} text-3xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300`}
            key={index}
            onClick={() =>
              mobileView === "hidden"
                ? setMobileView("block")
                : setMobileView("hidden")
            }
          >
            {items.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/login"
              className={`${mobileView} px-8 py-2 mb-8 text-3xl font-semibold border border-blue-500 rounded text-zinc-800 hover:text-white bg-white hover:bg-blue-500 transition-all duration-300`}
            >
              LogIn
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
