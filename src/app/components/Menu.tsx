"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";

const menuItems = [
  {
    title: "MENU",
    items: [
        {
          icon: "/MenuBar/homeIcon.png",
          label: "Dashboard",
          href: "/Dashboard",
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
    ]
  },
  {
    title: "OTHER",
    items: [
      {
        icon: "/MenuBar/repair-shop.png",
        label: "Service Center Profile",
        href: "/ProfilePage",
      },
      {
        icon: "/MenuBar/collaborator-512.png",
        label: "Accounts",
        href: "/AccountPage",
      },
      {
        icon: "/MenuBar/logout-512.png",
        label: "Logout",
        href:"/Login",
      },
    ],
  },
];


const Menu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  const handleLogout = () => {
    // Add your logout logic here
    router.push('/Login');
    setLogoutConfirm(false);
  };
  
  return (
    <div className="mt-4 text-sm">
      {menuItems.map((section) => (
        <div className="mb-6" key={section.title}>
          <span className="ml-4 hidden lg:block text-gray-600 font-medium text-xs tracking-wider mb-3">
            {section.title}
          </span>
          <div className="space-y-1">
            {section.items.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={(e) => {
                  if (item.label === "Logout") {
                    e.preventDefault();
                    setLogoutConfirm(true);
                  }
                }}
                className={`flex items-center px-4 py-2.5 mx-2 rounded-lg transition-all duration-200 hover:bg-blue-50 
                  ${pathname === item.href 
                    ? "bg-blue-100 text-blue-700 font-medium shadow-sm" 
                    : "text-gray-600 hover:text-blue-600"
                  }`}
              >
                <div className="w-5 h-5 relative">
                  <Image src={item.icon} alt="" fill className="object-contain" />
                </div>
                <span className="hidden lg:block ml-3 font-medium text-sm">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}

      {/* Logout Confirmation Dialog */}
      <Dialog 
        open={logoutConfirm} 
        onClose={() => setLogoutConfirm(false)}
        BackdropProps={{
          sx: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
          }
        }}
        sx={{
          "& .MuiPaper-root": { 
        borderRadius: "15px",
        padding: "20px",
        textAlign: "center",
        minWidth: "350px",
        maxWidth: "400px",
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        animation: "fadeInScale 0.3s ease-in-out",
          },
          "@keyframes fadeInScale": {
        "0%": { opacity: 0, transform: "scale(0.9)" },
        "100%": { opacity: 1, transform: "scale(1)" },
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mb: 1 }}>
            <img src="/warning.png" alt="Warning" width="50px" />
          </Box>
          Are you sure you want to logout?
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ textAlign: "center", mb: 2, color: "#555" }}>
        You will be logged out from your account. Make sure to save your work.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 2, gap: 2 }}>
          <Button 
        onClick={() => setLogoutConfirm(false)} 
        variant="contained"
        sx={{
          background: 'rgba(108, 117, 125, 0.9)',
          backdropFilter: 'blur(5px)',
          color: "white",
          borderRadius: "8px",
          px: 3,
          "&:hover": { background: 'rgba(90, 98, 104, 0.95)' }
        }}
          >
        Cancel
          </Button>
          <Button
        onClick={handleLogout}
        variant="contained"
        sx={{
          background: 'linear-gradient(to right, rgba(211, 47, 47, 0.9), rgba(255, 102, 89, 0.9))',
          backdropFilter: 'blur(5px)',
          color: "white",
          borderRadius: "8px",
          px: 3,
          "&:hover": { background: 'linear-gradient(to right, rgba(183, 28, 28, 0.95), rgba(211, 47, 47, 0.95))' }
        }}
          >
        Logout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Menu;