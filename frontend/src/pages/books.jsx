import React from "react";
import { 
  useState, 
  useEffect 
} from "react";
import axios from "axios";
import Loader from "../components/loader";
import BookCard from "../components/book/bookCard";

const Books = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/get-all-books"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="px-12 py-8 h-auto">
      <h4 className="text-3xl text-yellow-700">
        All Books
      </h4>
      {!data && (
        <div className="w-full h-screen flex items-center justify-center my-8">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data &&
          data.map((items, index) => (
            <div 
              key={index}
            >
              <BookCard 
                data={items} 
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Books;
