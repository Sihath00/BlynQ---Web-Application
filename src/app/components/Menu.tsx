"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuItems = [
  {
    title: "MENU",
    items: [
      {
        icon: "/MenuBar/homeIcon.png",
        label: "Dashboard",
        href: "/MainDashboard",
      },
      {
        icon: "/MenuBar/employeeIcon.png",
        label: "Employee",
        href: "/EmployeeManagementPage",
      },
      {
        icon: "/MenuBar/book-16-512.png",
        label: "Bookings",
        href: "/BookingsPage",
      },
      {
        icon: "/MenuBar/Services.png",
        label: "Services",
        href: "/ServicesPage",
      },
      {
        icon: "/MenuBar/Autilog.png",
        label: "AuditLog",
        href: "/AuditLog",
      },
      {
        icon: "/MenuBar/report-512.png",
        label: "Records",
        href: "/RecordsPage",
      },
    ],
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/MenuBar/collaborator-512.png",
        label: "Profile",
        href: "/ProfilePage",
      },
      {
        icon: "/MenuBar/Settings.png",
        label: "Settings",
        href: "/SettingsPage",
      },
      {
        icon: "/MenuBar/logout-512.png",
        label: "Logout",
        href:"",
      },
    ],
  },
];
const Menu = () => {
    const pathname =usePathname();
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((i) => (
        <div className="relative flex flex-col gap-2"  key={i.title}>
          <span className="ml-2 hidden lg:block text-gray-700 font-light my-4">{i.title}</span>
          {i.items.map((item,itemIndex) => (
            <Link key={itemIndex} href={item.href} className={`flex items-center justify-center lg:justify-start gap-4 py-2 ml-3 hover:text-blue-500 transition ${
              pathname === item.href ? "text-blue-700 font-semibold border-l-4 border-blue-700 rounded-md bg-blue-50 pl-2" : "text-gray-500 pl-3"
            }`}>
              <Image className="" src={item.icon} alt="" width={20} height={20} />
              <span className="hidden lg:block font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
