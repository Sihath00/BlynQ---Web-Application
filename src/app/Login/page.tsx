"use client";

import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800">
      {/* Decorative Blurred Background Elements */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-30"></div>

      {/* Glassmorphism Layer */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

      {/* Main Card */}
      <div className="relative flex w-[85%] max-w-6xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-3xl border border-white/20">
        {/* Left Section */}
        <div className="w-1/2 bg-gradient-to-b from-blue-200/40 to-blue-500/40 p-12 flex flex-col items-center justify-center relative">
          <img
            src="/login.png"
            alt="Login Illustration"
            className="w-[70%] h-auto z-10"
          />
          <h1 className="text-4xl font-extrabold text-white mt-8 z-10">
            Welcome Back!
          </h1>
          <p className="text-lg text-white mt-4 text-center z-10">
            Sign in to access your account.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white/40 backdrop-blur-lg">
          {/* Slightly Smaller Circular Logo */}
          <div className="flex justify-center mb-8">
            <div className="rounded-full shadow-lg h-40 w-40 flex items-center justify-center overflow-hidden">
              <img
                src="/BlynqLogo.png" // Replace with the actual path to your logo
                alt="Blynq Logo"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Form Header */}
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Login
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Enter your credentials to continue
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Username Input */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="Enter your password"
              />
            </div>

            {/* Options */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 border-gray-300 rounded"
                />
                Remember me
              </label>
              <a
                href="/ForgotPassword"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
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
        </div>
      </div>
    </div>
  );
};

export default Login;