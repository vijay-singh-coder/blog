import { useState } from "react";
import { HiOutlineKey } from "react-icons/hi";
import { RiUser3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/user";

export default function Register() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
    profilePicture: null,
  });

  function onchangeHandler(e) {
    const { name, value, files } = e.target;
    setLogin((prev) => ({
      ...prev,
      [name]: name === "profilePicture" ? files[0] : value,
    }));
  }

  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("User registered:", data);
    },
    onError: (err) => {
      console.error("Registration failed:", err);
    },
  });

  function handleOnClick() {
    mutate(login);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign up</h2>

        <div className="relative mb-4">
          <RiUser3Line className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            required
            placeholder=" Email"
            name="email"
            value={login.email}
            onChange={onchangeHandler}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="relative mb-4">
          <HiOutlineKey className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
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

        <div className="mb-6">
          <input
            type="file"
            name="profilePicture"
            onChange={onchangeHandler}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          onClick={handleOnClick}
          disabled={isLoading}
          className={`w-full py-2 rounded-lg text-white transition-colors ${isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>

        {isError && (
          <p className="mt-2 text-center text-red-500 text-sm">
            {error?.response?.data?.message || "Registration failed."}
          </p>
        )}
        {isSuccess && (
          <p className="mt-2 text-center text-green-500 text-sm">
            Registration successful!
          </p>
        )}

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
