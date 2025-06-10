import React from "react";
import { useState } from "react";
import { 
  Link, 
  useNavigate 
} from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: ""
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        values.username === "" ||
        values.email === "" ||
        values.password === "" ||
        values.address === "" 
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          `${backendUrl}/api/v1/sign-up`,
          values
        );
        console.log(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-auto px-12 py-8 flex items-center justify-center">
      <div className="rounded-lg border-3 border-zinc-800 px-8 py-5 w-full md:3/6 lg:w-2/6">
        <p className="text-zinc-800 font-semibold text-xl">
          Register Now
        </p>
        <div className="mt-4">
          <div>
            <label 
              htmlFor="" 
              className="text-zinc-700"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200 tex-zinc-100 p-2 outline-none"
              placeholder="username"
              name="username"
              required
              value={values.username}
              onChange={change}
            />
          </div>
          <div>
            <label 
              htmlFor="" 
              className="text-zinc-700"
            >
              Email
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200 tex-zinc-100 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              required
              value={values.email}
              onChange={change}
            />
          </div>
          <div>
            <label 
              htmlFor="" 
              className="text-zinc-700"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-200 tex-zinc-100 p-2 outline-none"
              placeholder="password"
              name="password"
              required
              value={values.password}
              onChange={change}
            />
          </div>
          <div>
            <label 
              htmlFor="" 
              className="text-zinc-700"
            >
              Address
            </label>
            <textarea
              className="w-full mt-2 bg-zinc-200 tex-zinc-100 p-2 outline-none"
              rows="5"
              placeholder="address"
              name="address"
              required
              value={values.address}
              onChange={change}
            />
          </div>
          <div className="mt-4">
            <button
              className="w-full bg-blue-300 text-white font-semibold py-2 rounded hover:bg-blue-500 hover:text-white cursor-pointer"
              onClick={submit}
            >
              Register
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-300 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold cursor-pointer">
            Already have an account? &nbsp;
            <Link 
              to="/login" 
              className="hover:text-blue-500"
            >
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
