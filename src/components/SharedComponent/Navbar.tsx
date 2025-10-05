"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuCodeXml } from "react-icons/lu";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Projects", href: "/projects" },
    { id: 4, name: "Blogs", href: "/blogs" },
  ];

  return (
    <nav className="shadow-md fixed w-full z-50 bg-black">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href='/' className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300   border-indigo-700 px-2 py-1 rounded-lg border-x-2"> 
        <p className='text-4xl text-indigo-500'><LuCodeXml /></p> 
        <p className="text-xl my-0 font-bold ">Masudur</p> 
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                className={`relative transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent font-semibold"
                    : "hover:text-indigo-500"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 animate-pulse"></span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl cursor-pointer"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t shadow-lg">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent font-semibold"
                    : "hover:text-indigo-500"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
