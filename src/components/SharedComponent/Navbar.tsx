"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { LuCodeXml } from "react-icons/lu";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role;

  const links = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "About", href: "/about" },
    { id: 3, name: "Projects", href: "/projects" },
    { id: 4, name: "Blogs", href: "/blogs" },
    { id: 5, name: "Contact Me", href: "/contact" },
  ];

  if (role === "OWNER") {
    links.push({ id: 6, name: "Dashboard", href: "/dashboard" });
  }

  return (
    <nav className="shadow-md fixed w-full z-50 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex custom-card items-center gap-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent  px-2 py-1 rounded-lg border-x-2"
        >
          <p className="text-4xl text-indigo-500">
            <LuCodeXml />
          </p>
          <p className="text-xl font-bold">Masudur</p>
        </Link>

        {/* Desktop Menu (only visible on lg and above) */}
        <div className="hidden lg:flex gap-3">
          <div className="flex space-x-8 font-medium">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative transition-all duration-300 ${isActive
                    ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent font-semibold py-1 border-b-2 border-indigo-700"
                    : "hover:text-indigo-500 py-1"
                    }`}
                >
                  {link.name}
                  {/* {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 animate-pulse"></span>
                  )} */}
                </Link>
              );
            })}
            <div className="">
              {session ? (
                   
                  <div  onClick={() => signOut()} className="outer-cont custom-card btn-flex items-center w-fit text-sm"> 
                    LogOut
                  </div> 
              ) : (
                <Link
                  href="/auth/login"
                  className="outer-cont btn-flex custom-card text-sm items-center w-fit"
                > 
                    SignIn 
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Button (visible up to md) */}
        <div
          onClick={() => setOpen(!open)}
          className="lg:hidden text-2xl cursor-pointer text-white"
        >
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Mobile Menu (visible on mobile & md) */}
      {open && (
        <div className="lg:hidden border-t shadow-lg bg-black">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 transition-all duration-300 ${isActive
                  ? "bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent font-semibold"
                  : "text-white hover:text-indigo-400"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="px-4 py-3">
            {session ? (
              <Button
                onClick={() => signOut()}
                className="w-full outer-cont text-sm custom-card btn-flex"
              >
                LogOut
              </Button>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="block w-full outer-cont text-sm custom-card btn-flex"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
