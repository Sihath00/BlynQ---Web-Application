"use client";

import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Decorative Blurred Background Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-30"></div>

      {/* Glassmorphism Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

      {/* Main Card */}
      <div className="relative flex flex-col md:flex-row w-[90%] max-w-5xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3xl border border-white/20">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-200/40 to-blue-500/40 p-8 flex flex-col items-center justify-center relative">
          <img
            src="/login.png"
            alt="Login Illustration"
            className="w-[60%] md:w-[80%] h-auto z-10 mb-6"
          />
          <h1 className="text-2xl md:text-4xl font-extrabold text-white mt-4 z-10 text-center">
            Welcome Back!
          </h1>
          <p className="text-sm md:text-lg text-white mt-2 z-10 text-center">
            Sign in to access your account.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white/40 backdrop-blur-lg">
          {/* Circular Logo */}
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="rounded-full shadow-lg h-28 w-28 md:h-36 md:w-36 flex items-center justify-center overflow-hidden">
              <img
                src="/BlynqLogo.png"
                alt="Blynq Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Form Header */}
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800">
            Login
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Enter your credentials to continue
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                placeholder=" " // Ensures the label animation works properly
              />
              <label
                htmlFor="username"
                className="absolute text-sm text-gray-500 bg-white px-2 left-3 -top-2 scale-75 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:scale-75 peer-focus:text-blue-500"
              >
                Username
              </label>
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-gray-500 bg-white px-2 left-3 -top-2 scale-75 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:scale-75 peer-focus:text-blue-500"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none"
              >
                {passwordVisible ? (
                  // Open Eye SVG (Password Visible)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-eye-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                  </svg>
                ) : (
                  // Closed Eye SVG (Password Hidden)
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-eye-slash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                  </svg>
                )}
              </button>
            </div>


            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  className="mr-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded"
                />
                Remember me
              </label>
              <a
                href="/ForgotPassword"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgotten password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              href="#"
              className="text-blue-500 hover:underline font-medium"
            >
              Create an account
            </a>
          </p>
          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Designed & Developed by{" "}
            <span className="text-blue-500 font-semibold">
              Team BlynQ
            </span>{" "}
            2024 © All rights reserved.
          </p>
        </div>
        </div>
      </div>
  );
};

export default Login;