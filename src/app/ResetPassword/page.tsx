"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({} as Record<string, string>);
  const router = useRouter();

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleOtpChange = (value: string) => {
    if (/^\d*$/.test(value)) {
      setOtp(value.slice(0, 6));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Email address is required.";
    else if (!isValidEmail(email)) newErrors.email = "Please enter a valid email address.";
    if (!otp) newErrors.otp = "OTP is required.";
    else if (otp.length !== 6) newErrors.otp = "OTP must be 6 digits.";
    if (!newPassword) newErrors.newPassword = "New password is required.";
    else if (newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters.";
    if (!confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (newPassword !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully");
      router.push("/Login");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] bg-gradient-to-r from-purple-400 to-blue-600 rounded-full blur-[150px] opacity-50"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[600px] h-[600px] bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full blur-[200px] opacity-40"></div>

      {/* Reset Password Card */}
      <div className="relative flex flex-col md:flex-row w-[90%] max-w-5xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-200/50 to-blue-400/50 p-8 flex flex-col items-center justify-center">
          <img src="/OTP.png" alt="Reset Password Illustration" className="w-[80%] h-auto" />
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

          <form onSubmit={handleSubmit} className="flex flex-col items-center mt-8 space-y-6">
            {/* Email Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`peer w-full px-4 py-3 text-sm text-gray-800 bg-transparent border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg placeholder-transparent focus:outline-none`}
              />
              <label
                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                  email ? "-top-3 text-gray-600" : "top-4 text-gray-500"
                } peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:bg-white`}
              >
                Email Address
              </label>
              {errors.email && <span className="text-xs text-red-500 mt-1">{errors.email}</span>}
            </div>

            {/* OTP Input */}
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                value={otp}
                onChange={(e) => handleOtpChange(e.target.value)}
                required
                className={`peer w-full px-4 py-3 text-lg text-gray-800 tracking-[0.5em] bg-transparent border ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                } rounded-lg placeholder-transparent focus:outline-none`}
              />
              <label
                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                  otp ? "-top-3 text-gray-600" : "top-4 text-gray-500"
                } peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:bg-white`}
              >
                Enter 6-Digit Code
              </label>
              {errors.otp && <span className="text-xs text-red-500 mt-1">{errors.otp}</span>}
            </div>

            {/* New Password Input */}
<div className="relative w-full max-w-sm">
  <div className="relative">
    <input
      type={newPasswordVisible ? "text" : "password"}
      value={newPassword}
      onChange={(e) => setNewPassword(e.target.value)}
      required
      className={`peer w-full px-4 py-3 pr-12 text-sm text-gray-800 bg-transparent border ${
        errors.newPassword ? "border-red-500" : "border-gray-300"
      } rounded-lg placeholder-transparent focus:outline-none`}
    />
    <label
      className={`absolute left-4 px-1 bg-white text-sm text-gray-500 transition-all duration-300 ${
        newPassword
          ? "-top-3 text-gray-600"
          : "top-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-gray-600"
      }`}
    >
      New Password
    </label>
    <button
      type="button"
      onClick={() => setNewPasswordVisible(!newPasswordVisible)}
      className="absolute right-3 top-3 text-gray-500 hover:text-gray-600 focus:outline-none"
    >
      {newPasswordVisible ? (
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
  {errors.newPassword && (
    <span className="text-xs text-red-500 mt-1 block">{errors.newPassword}</span>
  )}
</div>

{/* Confirm Password Input */}
<div className="relative w-full max-w-sm">
  <div className="relative">
    <input
      type={confirmPasswordVisible ? "text" : "password"}
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className={`peer w-full px-4 py-3 pr-12 text-sm text-gray-800 bg-transparent border ${
        errors.confirmPassword ? "border-red-500" : "border-gray-300"
      } rounded-lg placeholder-transparent focus:outline-none`}
    />
    <label
      className={`absolute left-4 px-1 bg-white text-sm text-gray-500 transition-all duration-300 ${
        confirmPassword
          ? "-top-3 text-gray-600"
          : "top-4 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-gray-600"
      }`}
    >
      Confirm Password
    </label>
    <button
      type="button"
      onClick={() =>
        setConfirmPasswordVisible(!confirmPasswordVisible)
      }
      className="absolute right-3 top-3 text-gray-500 hover:text-gray-600 focus:outline-none"
    >
      {confirmPasswordVisible ? (
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
  {errors.confirmPassword && (
    <span className="text-xs text-red-500 mt-1 block">
      {errors.confirmPassword}
    </span>
  )}
</div>

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