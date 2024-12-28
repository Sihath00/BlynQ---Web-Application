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
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-blue-700 to-indigo-900 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400 to-blue-500 rounded-full blur-[120px] opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 to-indigo-700 rounded-full blur-[150px] opacity-50"></div>

      {/* Reset Password Card */}
      <div className="relative w-full max-w-3xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl transform transition-transform hover:scale-[1.02] hover:shadow-2xl">
        <div className="p-10">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-5 rounded-full shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-10 h-10 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89-3.421c.42-.182.92-.182 1.34 0L21 8m-9 11v-8m0 0l-8-4m8 4l8-4"
                />
              </svg>
            </div>
          </div>

          {/* Header */}
          <h1 className="text-center text-3xl font-extrabold text-white mt-6">
            Request Sent Successfully!
          </h1>
          <p className="text-center text-sm text-gray-200 mt-2">
            We've sent a 6-digit confirmation code to your email. Please enter
            it below to verify your email and reset your password.
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
                className="peer w-full px-4 py-3 text-sm text-white bg-transparent border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-3 text-sm text-gray-300 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-[-10px] peer-focus:scale-90 peer-focus:text-purple-500"
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
                  className="w-12 h-12 text-center text-lg text-white bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                className="peer w-full px-4 py-3 text-sm text-white bg-transparent border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-3 text-sm text-gray-300 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-[-10px] peer-focus:scale-90 peer-focus:text-purple-500"
                htmlFor="new-password"
              >
                New Password
              </label>
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-500 focus:outline-none"
              >
                {passwordVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                    <path
                      fillRule="evenodd"
                      d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.359 11.238A5.978 5.978 0 0 1 8 12c-2.07 0-3.945-1.042-5.359-2.762a.75.75 0 0 1 1.143-.984C4.248 9.903 5.992 11 8 11c1.966 0 3.65-.955 4.933-2.724a.75.75 0 1 1 1.153.96z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="peer w-full px-4 py-3 text-sm text-white bg-transparent border border-gray-300 rounded-lg placeholder-transparent focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=" "
              />
              <label
                className="absolute left-4 top-3 text-sm text-gray-300 transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:scale-100 peer-focus:top-[-10px] peer-focus:scale-90 peer-focus:text-purple-500"
                htmlFor="confirm-password"
              >
                Confirm Password
              </label>
            </div>

            {/* Update Password Button */}
            <button
              type="submit"
              className="w-full max-w-sm py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
            >
              Update Password
            </button>
          </form>

          {/* Footer Links */}
          <div className="text-center mt-6 text-sm text-gray-300">
            <p>
              Don’t have a code?{" "}
              <a href="#" className="text-purple-400 hover:underline">
                Resend code
              </a>
            </p>
            <p>
              <a href="/Login" className="text-purple-400 hover:underline">
                &lt; Return to sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;