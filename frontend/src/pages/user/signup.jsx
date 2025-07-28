import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });

  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.trimStart() });
  };

  const submit = async () => {
    try {
      const { username, email, password, address } = values;
      if (!username || !email || !password || !address) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(`${backendUrl}/api/v1/sign-up`, values);
      alert(response.data.message || "Registered successfully!");
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      alert(msg);
    }
  };

  return (
    <div className="h-auto px-12 py-8 flex items-center justify-center">
      <div className="rounded-lg border-3 border-zinc-800 px-8 py-5 w-full md:3/6 lg:w-2/6">
        <p className="text-zinc-800 font-semibold text-xl">Register Now</p>

        <div className="mt-4">
          <div className="mt-4">
            <label className="text-zinc-700 block mb-2">Select Role:</label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={values.role === "user"}
                  onChange={change}
                />
                <span className="text-zinc-800">User</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={values.role === "admin"}
                  onChange={change}
                />
                <span className="text-zinc-800">Admin</span>
              </label>
            </div>

            {values.role === "admin" && (
              <p className="mt-2 text-sm text-red-600">
                <strong>Note:</strong> Admins can add, update, and manage books.
              </p>
            )}

            {values.role === "user" && (
              <p className="mt-2 text-sm text-blue-600">
                <strong>Note:</strong> Users can browse, order, and manage books.
              </p>
            )}
          </div>

          <div>
            <label className="text-zinc-700">Username</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-200 text-zinc-800 p-2 outline-none"
              placeholder="username"
              name="username"
              value={values.username}
              onChange={change}
            />
          </div>

          <div>
            <label className="text-zinc-700">Email</label>
            <input
              type="email"
              className="w-full mt-2 bg-zinc-200 text-zinc-800 p-2 outline-none"
              placeholder="xyz@example.com"
              name="email"
              value={values.email}
              onChange={change}
            />
          </div>

          <div>
            <label className="text-zinc-700">Password</label>
            <input
              type="password"
              className="w-full mt-2 bg-zinc-200 text-zinc-800 p-2 outline-none"
              placeholder="password"
              name="password"
              value={values.password}
              onChange={change}
            />
          </div>

          <div>
            <label className="text-zinc-700">Address</label>
            <textarea
              className="w-full mt-2 bg-zinc-200 text-zinc-800 p-2 outline-none resize-none"
              rows="5"
              placeholder="address"
              name="address"
              value={values.address}
              onChange={change}
            />
          </div>

          <div className="mt-4">
            <button
              className="w-full bg-blue-300 text-white font-semibold py-2 rounded hover:bg-blue-500 transition-all"
              onClick={submit}
            >
              Register
            </button>
          </div>

          <p className="flex mt-4 items-center justify-center text-zinc-400 font-semibold">
            Or
          </p>

          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Already have an account? &nbsp;
            <Link to="/login" className="hover:text-blue-500">
              <u>LogIn</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
