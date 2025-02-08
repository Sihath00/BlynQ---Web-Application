"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({
        username: "",
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            username: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: ""
        };

        if (!username) {
            newErrors.username = "Username is required.";
            isValid = false;
        }
        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required.";
            isValid = false;
        } else if (!/^\d{10}$/.test(phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be exactly 10 numeric digits.";
            isValid = false;
        }
        if (!email) {
            newErrors.email = "Email address is required.";
            isValid = false;
        } else if (!isValidEmail(email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }
        if (!password) {
            newErrors.password = "Password is required.";
            isValid = false;
        }
        if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
    
            // Convert the phone number to E.164 format
            let formattedPhoneNumber = phoneNumber.trim();
            if (!formattedPhoneNumber.startsWith("+94")) {
                // If the number starts with "0", replace it with "+94"
                if (formattedPhoneNumber.startsWith("0")) {
                    formattedPhoneNumber = "+94" + formattedPhoneNumber.substring(1);
                } else {
                    // If it's missing the country code, add it
                    formattedPhoneNumber = "+94" + formattedPhoneNumber;
                }
            }
    
            try {
                const response = await fetch("http://localhost:5001/api/auth/registerWebUser", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: username,    // ✅ Use "name" instead of "username"
                        phone: formattedPhoneNumber, // ✅ Send formatted number
                        email,
                        password
                    })
                });
    
                const data = await response.json();
                setLoading(false);
                if (response.ok) {
                    router.push("/Login");
                } else {
                    setErrors({
                        username: "",
                        phoneNumber: "",
                        email: "",
                        password: "",
                        confirmPassword: data.message || "Registration failed"
                    });
                }
            } catch (error) {
                setLoading(false);
                setErrors({
                    username: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: "An error occurred. Please try again."
                });
            }
        }
    };
    
     
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 overflow-hidden">
            {/* Decorative Blurred Background Elements */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full blur-3xl opacity-30"></div>
            <div className="relative flex flex-col md:flex-row w-[90%] max-w-5xl md:h-[80%] lg:h-[70%] h-auto bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-white/20">
                <div className="w-full md:w-1/2 bg-gradient-to-b from-blue-200/40 to-blue-500/40 p-8 md:p-12 flex flex-col items-center justify-center">
                    <img
                        src="/acc.png"
                        alt="Register Illustration"
                        className="w-[60%] md:w-[70%] h-auto mb-4"
                    />
                    <h1 className="text-xl md:text-2xl font-extrabold text-white text-center">
                        Join Us!
                    </h1>
                    <p className="text-sm md:text-base text-white mt-2 text-center">
                        Create an account to get started.
                    </p>
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-10 bg-white flex flex-col justify-center">
                    <div className="flex justify-center mb-6">
                        <div className="rounded-full shadow-lg h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 flex items-center justify-center overflow-hidden">
                            <img
                                src="/BlynqLogo.png"
                                alt="Blynq Logo"
                                className="h-full w-full object-cover rounded-full"
                            />
                        </div>
                    </div>
                    <h2 className="text-lg md:text-2xl font-extrabold text-center text-gray-800">
                        Register
                    </h2>
                    <p className="text-sm text-center text-gray-600 mt-2">
                        Enter your details to create an account
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                        <div className="relative">
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className={`block w-full px-4 py-3 text-base text-gray-800 bg-transparent border ${
                                    errors.username ? "border-red-500" : "border-gray-300"
                                } rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                                    errors.username ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } peer`}
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                                    username ? "-top-3 text-blue-500" : "top-4 text-gray-500"
                                } peer-focus:-top-3 peer-focus:text-blue-500 peer-focus:bg-white`}
                            >
                                Username
                            </label>
                            {errors.username && (
                                <span className="text-xs text-red-500">{errors.username}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="number"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                                className={`block w-full px-4 py-3 text-base text-gray-800 bg-transparent border ${
                                    errors.phoneNumber ? "border-red-500" : "border-gray-300"
                                } rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                                    errors.phoneNumber ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } peer`}
                            />
                            <label
                                htmlFor="phoneNumber"
                                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                                    phoneNumber ? "-top-3 text-blue-500" : "top-4 text-gray-500"
                                } peer-focus:-top-3 peer-focus:text-blue-500 peer-focus:bg-white`}
                            >
                                Phone Number
                            </label>
                            {errors.phoneNumber && (
                                <span className="text-xs text-red-500">{errors.phoneNumber}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className={`block w-full px-4 py-3 text-base text-gray-800 bg-transparent border ${
                                    errors.email ? "border-red-500" : "border-gray-300"
                                } rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                                    errors.email ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } peer`}
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                                    email ? "-top-3 text-blue-500" : "top-4 text-gray-500"
                                } peer-focus:-top-3 peer-focus:text-blue-500 peer-focus:bg-white`}
                            >
                                Email Address
                            </label>
                            {errors.email && (
                                <span className="text-xs text-red-500">{errors.email}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className={`block w-full px-4 py-3 text-base text-gray-800 bg-transparent border ${
                                    errors.password ? "border-red-500" : "border-gray-300"
                                } rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                                    errors.password ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } peer`}
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                                    password ? "-top-3 text-blue-500" : "top-4 text-gray-500"
                                } peer-focus:-top-3 peer-focus:text-blue-500 peer-focus:bg-white`}
                            >
                                Password
                            </label>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPasswordVisible((prev) => !prev);
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none z-10 flex items-center pointer-events-none"
                            >
                                {passwordVisible ? (
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
                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588" />
                                        <path d="M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                    </svg>
                                )}
                            </button>
                            {errors.password && (
                                <span className="text-xs text-red-500">{errors.password}</span>
                            )}
                        </div>
                        <div className="relative">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={`block w-full px-4 py-3 text-base text-gray-800 bg-transparent border ${
                                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                } rounded-lg appearance-none focus:outline-none focus:ring-2 ${
                                    errors.confirmPassword ? "focus:ring-red-500" : "focus:ring-blue-500"
                                } peer pr-10`} // 👈 Added `pr-10` to prevent shifting
                            />
                            <label
                                htmlFor="confirmPassword"
                                className={`absolute left-4 bg-white px-2 text-sm transition-all duration-300 ${
                                    confirmPassword ? "-top-3 text-blue-500" : "top-4 text-gray-500"
                                } peer-focus:-top-3 peer-focus:text-blue-500 peer-focus:bg-white`}
                            >
                                Confirm Password
                            </label>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setConfirmPasswordVisible((prev) => !prev);
                                }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none z-10 flex items-center"
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
                                    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588" />
                                    <path d="M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                                    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                                </svg>
                                )}
                            </button>

                            {errors.confirmPassword && (
                                <span className="absolute left-0 text-xs text-red-500 mt-1">
                                    {errors.confirmPassword}
                                </span>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
                                disabled={loading}
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}
                        <a href="/Login" className="text-blue-500 hover:underline font-medium">
                            Login
                        </a>
                    </p>
                    <p className="mt-4 text-center text-sm text-gray-500">
                        Designed & Developed by{" "}
                        <span className="text-blue-500 font-semibold">Team BlynQ</span> 2024 © All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;