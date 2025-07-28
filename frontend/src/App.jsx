import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store/auth";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Books from "./pages/books";
import Profile from "./pages/profile";
import LogIn from "./pages/user/login";
import SignUp from "./pages/user/signup";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Favourites from "./components/favourite/favourites";
import Settings from "./components/profile/settings";
import OrderHistory from "./components/order/orderHistory";
import AllOrders from "./components/order/allOrders";
import AddBook from "./components/book/addBook";
import ViewBookDetails from "./components/book/viewBookDetails";
import UpdateBook from "./components/book/updateBook";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    if (id && token && storedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(storedRole));
    }
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="add-book" element={<AddBook />} />
          )}
          <Route path="orderHistory" element={<OrderHistory />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
        <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
