import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value.trimStart() });
  };

  const submit = async () => {
    try {
      const { username, password } = values;
      if (!username || !password) {
        alert("All fields are required");
        return;
      }
      const response = await axios.post(`${backendUrl}/api/v1/log-in`, {
        username,
        password,
      });

      const { id, token, role } = response.data;
      dispatch(authActions.login({ role }));
      localStorage.setItem("id", id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate("/profile");
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      alert(msg);
    }
  };

  return (
    <div className="h-auto px-12 py-8 flex items-center justify-center">
      <div className="rounded-lg border-3 border-zinc-800 px-8 py-5 w-full md:3/6 lg:w-2/6">
        <p className="text-zinc-800 font-semibold text-xl">LogIn</p>

        <div className="mt-4">
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

          <div className="mt-4">
            <button
              className="w-full bg-blue-300 text-white font-semibold py-2 rounded hover:bg-blue-500 transition-all"
              onClick={submit}
            >
              LogIn
            </button>
          </div>

          <p className="flex mt-4 items-center justify-center text-zinc-400 font-semibold">
            Or
          </p>

          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don&apos;t have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
              <u>Register Now</u>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
