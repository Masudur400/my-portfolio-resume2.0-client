'use client'
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuCodeXml } from "react-icons/lu"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Projects", href: "/projects" },
    { id: 4, name: "Blogs", href: "/blogs" },
  ];

  return (
    <nav className=" shadow-md fixed w-full z-50 bg-muted">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href='/' className="flex items-center gap-2"> 
            <p className='text-4xl text-indigo-500'><LuCodeXml /></p>
            <p className="text-xl my-0 font-bold text-indigo-500">Masudur</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 font-medium">
          {links.map((link) => (
            <div key={link.id}>
              <Link
                href={link.href}
                className="transition"
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden  text-2xl cursor-pointer"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden  border-t shadow-lg">
          {links.map((link) => (
            <div key={link.id} className="border-b">
              <Link
                href={link.href}
                className="block px-4 py-3"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
