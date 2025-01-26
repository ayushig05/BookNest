import React from "react";
import Logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full lg:w-3/6 mb-12 md:mb-0 items-center lg:items-start justify-center flex flex-col">
        <h1 className="text-5xl lg:text-6xl font-semibold text-yellow-700 text-center lg:text-left">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-2xl lg:text-xl text-zinc-600 text-center lg:text-left">
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books
        </p>
        <div className="mt-6">
          <Link 
            to="/books" 
            className="border border-yellow-600 px-10 py-3 font-semibold text-yellow-700 text-xl lg:text-2xl rounded-full hover:bg-yellow-700 hover:text-white"
          >
            Discover Books
          </Link>
        </div>
      </div>

      <div className="w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center">
        <img 
          src={Logo} 
          alt="hero" 
        />
      </div>
    </div>
  );
};

export default Hero;
