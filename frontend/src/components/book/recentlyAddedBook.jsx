import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import BookCard from "./bookCard";
import Loader from "../loader";

const RecentlyAddedBook = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-recent-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-700">
        Recently Added Books
      </h4>
      {!data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {data &&
          data.map((items, index) => (
            <div 
              key={index}
            >
              <BookCard data={items} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecentlyAddedBook;
