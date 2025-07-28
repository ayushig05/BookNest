import React from "react";
import Logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center px-4 lg:px-20">
      <div className="w-full lg:w-1/2 mb-12 md:mb-0 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-bold text-yellow-700">
          Discover Your Next Great Read
        </h1>
        <p className="mt-4 text-lg lg:text-xl text-zinc-600">
          Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books.
        </p>
        <Link
          to="/books"
          className="mt-6 inline-block border border-yellow-600 px-10 py-3 font-semibold text-yellow-700 text-xl rounded-full hover:bg-yellow-700 hover:text-white transition-all duration-300"
        >
          Discover Books
        </Link>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src={Logo}
          alt="Hero"
          className="max-h-[60vh] object-contain rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default Hero;
