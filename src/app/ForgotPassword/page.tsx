"use client";

import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    // Add your logic to handle password reset
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Decorative Blurred Background Elements */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-purple-400 to-blue-600 rounded-full blur-[150px] opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-[200px] opacity-40"></div>

      {/* Main Card */}
      <div className="relative flex w-[90%] max-w-5xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-3xl border border-white/30">
        {/* Left Section (Illustration) */}
        <div className="w-1/2 bg-gradient-to-b from-blue-200/50 to-blue-400/50 p-8 flex flex-col items-center justify-center relative">
          <img
            src="/forgotpassword.png" // Replace with your illustration path
            alt="Forgot Password Illustration"
            className="w-[80%] h-auto"
          />
          <h1 className="text-3xl font-extrabold text-white mt-8 text-center">
            Forgot Your Password?
          </h1>
          <p className="text-lg text-white mt-4 text-center">
            No worries! Let's get you back on track.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white/40 backdrop-blur-lg">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Enter your email address, and we’ll send you instructions to reset your password.
          </p>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
                placeholder="Enter your email address"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
            >
              Reset Password
            </button>
          </form>

          {/* Back to Login */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <a
              href="/Login"
              className="text-blue-500 hover:underline font-medium"
            >
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;