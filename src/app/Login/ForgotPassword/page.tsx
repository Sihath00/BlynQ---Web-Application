"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    router.push("/ResetPassword");
    e.preventDefault();
    
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(""); // Clear error if valid
    console.log("Email:", email);
    // Add your logic to handle password reset
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Decorative Blurred Background Elements */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-purple-400 to-blue-600 rounded-full blur-[150px] opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-[200px] opacity-40"></div>

      {/* Main Card */}
      <div className="relative flex flex-col md:flex-row w-[90%] max-w-5xl bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/30">
        {/* Left Section (Illustration) */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-200/50 to-blue-400/50 p-8 flex flex-col items-center justify-center relative">
          <img
            src="/forgotpassword.png"
            alt="Forgot Password Illustration"
            className="w-[80%] h-auto"
          />
          <h1 className="text-3xl font-extrabold text-white mt-8 text-center">
            Forgot Your Password?
          </h1>
          <p className="text-lg text-white mt-4 text-center">
            No worries! Let’s get you back on track.
          </p>
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-3xl font-extrabold text-center text-gray-800">
            Reset Password
          </h2>
          <p className="text-sm text-center text-gray-500 mt-2">
            Enter your registered email address, and we’ll send you instructions to reset your password.
          </p>

          {/* Forgot Password Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Animated Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`block w-full px-4 py-3 text-sm text-gray-900 bg-transparent border rounded-lg appearance-none focus:outline-none focus:ring-2 peer ${
                  error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute text-sm ${
                  error ? "text-red-500" : "text-gray-500"
                } bg-white px-2 left-3 -top-2 scale-75 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:scale-75 ${
                  error ? "peer-focus:text-red-500" : "peer-focus:text-blue-500"
                }`}
              >
                Email Address
              </label>
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-1">{error}</p>
            )}

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