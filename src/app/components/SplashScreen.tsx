"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SplashScreen = () => {
  const router = useRouter();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start the fade-out animation before redirecting
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        router.push("/Login");
      }, 500); // Match this timeout to the fade-out duration in CSS
    }, 4000); // 2.5 seconds before starting the fade-out

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [router]);

  return (
    <div
      className={`relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-blue-700 to-indigo-800 transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative Blurred Background Elements */}
      <div className="absolute top-10 left-20 w-96 h-96 bg-gradient-to-r from-blue-300 to-purple-500 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-10 right-20 w-96 h-96 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full blur-3xl opacity-30"></div>

      {/* Splash Content */}
      <div className="flex flex-col items-center space-y-6 animate-fade-in">
        {/* Animated Logo in Circle */}
        <div className="relative w-36 h-36 rounded-full bg-gradient-to-r from-blue-100 to-purple-200 shadow-xl flex items-center justify-center overflow-hidden">
          <img
            src="/BlynqLogo.png" // Replace with the actual path to your logo
            alt="Blynq Logo"
            className="h-full w-full object-cover"
          />
        </div>

        {/* App Name */}
        <h1 className="text-5xl font-extrabold text-white animate-slide-up">
          BlynQ
        </h1>
        <p className="text-lg text-white animate-fade-in-slow">
          Sync Your Ride Simplfy Your Drive
        </p>

        {/* Loader Animation */}
        <div className="flex space-x-2 animate-bounce">
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <div className="w-4 h-4 bg-white rounded-full"></div>
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;