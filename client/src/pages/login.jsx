import { useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { RiUser3Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function onchangeHandler(e) {
    const { name, value } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const { mutate, isLoading, error } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("User login:", data);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.error("Registration failed:", err);
    },
  });

  function handleOnClick() {
    mutate(login);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>

        <div className="relative mb-5">
          <RiUser3Line className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            required
            placeholder="Email"
            name="email"
            value={login.email}
            onChange={onchangeHandler}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative mb-6">
          <HiOutlineKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="password"
            required
            placeholder="Password"
            name="password"
            value={login.password}
            onChange={onchangeHandler}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleOnClick}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
