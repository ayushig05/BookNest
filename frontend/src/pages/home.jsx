import React from "react";
import Hero from "../components/hero";
import RecentlyAddedBook from "../components/book/recentlyAddedBook";

const Home = () => {
  return (
    <div className="text-zinc-800 px-10 py-8">
      <Hero />
      <RecentlyAddedBook />
    </div>
  );
};

export default Home;
