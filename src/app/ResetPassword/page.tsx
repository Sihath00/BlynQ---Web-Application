"use client";

import { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleCodeChange = (value: string, index: number) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Code:", code.join(""));
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-purple-400 to-blue-600 rounded-full blur-[150px] opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-[200px] opacity-40"></div>

      {/* Reset Password Card */}
      <div className="relative flex flex-col md:flex-row w-[90%] max-w-5xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-200/50 to-blue-400/50 p-8 flex flex-col items-center justify-center relative">
          <img
            src="/OTP.png"
            alt="Reset Password Illustration"
            className="w-[80%] h-auto"
          />
          <h1 className="text-3xl font-extrabold text-white mt-8 text-center">
            Reset Your Password
          </h1>
          <p className="text-lg text-white mt-4 text-center">
            Enter your new password below to regain access.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-gray-800">
            Create New Password
          </h2>
          <p className="text-sm text-center text-gray-600 mt-2">
            Enter your registered email and the verification code sent to you.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mt-8 space-y-6"
          >
            {/* Email Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="peer w-full px-4 py-3 text-sm bg-transparent border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-4 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:scale-75 peer-focus:text-blue-500 bg-white px-2"
                htmlFor="email"
              >
                Email Address
              </label>
            </div>

            {/* Code Input */}
            <div className="flex justify-between space-x-3">
              {code.map((value, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  maxLength={1}
                  value={value}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                  className="w-12 h-12 text-center text-lg bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            {/* New Password Input */}
            <div className="relative w-full max-w-sm">
              <input
                type={passwordVisible ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="peer w-full px-4 py-3 text-sm bg-transparent border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-4 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:scale-75 peer-focus:text-blue-500 bg-white px-2"
                htmlFor="new-password"
              >
                New Password
              </label>
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="peer w-full px-4 py-3 text-sm bg-transparent border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-4 text-sm text-gray-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-focus:top-[-10px] peer-focus:scale-75 peer-focus:text-blue-500 bg-white px-2"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
            </div>

            {/* Update Password Button */}
            <button
              type="submit"
              className="w-full max-w-sm py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;