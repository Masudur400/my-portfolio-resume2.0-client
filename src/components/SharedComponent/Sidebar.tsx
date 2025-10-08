"use client";

import { useState } from "react";
import Link from "next/link";
// import { LuLayoutDashboard, LuBook, LuCodeXml } from "react-icons/lu";
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation"; 
import { LuCodeXml } from "react-icons/lu";
// import { RiProjectorLine } from "react-icons/ri";
// import { SiOpenmediavault } from "react-icons/si";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Create Project", href: "/dashboard/create-project"},
    { name: "Create Blog", href: "/dashboard/create-blog" },
    { name: "Projects", href: "/dashboard/manage-projects" },
    { name: "Blogs", href: "/dashboard/manage-blogs" },
  ];

  return (
    <>
      {/* Mobile toggle button (sm & md) */}
      <div className="lg:hidden flex items-center justify-between p-4">
        <span className="font-bold text-lg">Dashboard</span>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {open ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar (lg+ only) */}
      <div
        className={`fixed px-2 top-0 left-0 h-full w-64 bg-gradient-to-br from-gray-900/5 via-gray-800 to-black/5 shadow-md z-20 transform
          ${open ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 
          lg:translate-x-0 lg:static lg:flex flex-col`}
      >
        <div className="px-6 py-3 font-bold text-2xl border-b border-gray-200 dark:border-gray-700">
          <Link href='/' className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-700 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 border-indigo-700 px-2 py-1 rounded-lg border-x-2">
          <p className='text-4xl text-indigo-500'><LuCodeXml /></p>
          <p className="text-xl my-0 font-bold ">Masudur</p>
        </Link>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-4 px-6 py-3 my-1 rounded-lg transition-colors ${
                  isActive
                    ? "font-semibold text-sm sm:text-base bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 hover:from-blue-700 hover:via-indigo-800 hover:to-blue-900 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {/* <span className="text-lg">{link.icon}</span> */}
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-10 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
