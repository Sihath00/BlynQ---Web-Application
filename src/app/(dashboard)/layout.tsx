"use client";

import Image from "next/image";
import Link from "next/link";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* 🔵 Animated Loading Bar (Blue Line on Top) */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed top-0 left-0 w-full h-1 bg-blue-500 z-50"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar (Left Panel) */}
      <div className="relative w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-white shadow-md p-4">
        <Link href="/Dashboard" className="flex items-center justify-center">
          <Image
            className="mt-2"
            src="/logoNew.png"
            alt="logo"
            width={480}
            height={40}
          />
        </Link>
        <Menu />
      </div>

      {/* Main Content (Right Panel) */}
      <div className="flex flex-col w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-auto">
        <Navbar />

        {/* Page Transition Animation */}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}