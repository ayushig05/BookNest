import React from "react";
import Hero from "../components/hero";
import RecentlyAddedBook from "../components/book/recentlyAddedBook";

const Home = () => {
  return (
    <main className="text-zinc-800 px-4 md:px-10 py-8 space-y-12">
      <Hero />
      <RecentlyAddedBook />
    </main>
  );
};

export default Home;
