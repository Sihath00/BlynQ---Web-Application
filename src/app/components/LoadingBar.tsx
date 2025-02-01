"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the styles

// Custom NProgress Styles
NProgress.configure({
  showSpinner: false, // Disable spinner
  speed: 500,
  minimum: 0.2,
  easing: "ease",
});

const LoadingBar = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timer = setTimeout(() => NProgress.done(), 700); // Simulate load time
    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // No UI needed, just triggers NProgress
};

export default LoadingBar;