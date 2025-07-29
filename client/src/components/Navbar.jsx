import React from 'react'
import { useState } from 'react';
import { Menu, X } from "lucide-react";
const Navbar = () => {
    const [isOpen,setIsOpen]=useState(false);
 return (
    <div className="bg-gray-100 text-black px-20 py-4">
      <div className="flex justify-between items-center">
        {/* Logo and Search */}
        <div className="flex items-center gap-4">
          <a href="#" className="text-2xl font-bold">LOGO</a>
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border px-3 py-1 rounded-md"
            />
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 text-lg">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Blogs</a>
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Logout</a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 text-lg">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border px-3 py-1 rounded-md"
          />
          <a href="#" className="block hover:underline">Home</a>
          <a href="#" className="block hover:underline">Blogs</a>
          <a href="#" className="block hover:underline">About</a>
          <a href="#" className="block hover:underline">Logout</a>
        </div>
      )}
    </div>
  );

}

export default Navbar;