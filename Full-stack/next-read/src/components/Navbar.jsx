// import React from 'react';
"use client"
import Link from 'next/link';
import { Plus, Book } from 'lucide-react';
import { usePathname } from 'next/navigation';

// Navbar Component
const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="bg-black text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Book className="h-8 w-8" />
            <span className="text-2xl font-bold">BookLib</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/home" className={`hover:text-gray-300 transition-colors ${pathname==="/home"?"bg-white px-5 py-3 rounded-md text-black": "text-gray-200"}`}>Library</Link>
            <Link href="/home/reading-list" className={`hover:text-gray-300 transition-colors ${pathname==="/home/reading-list"?"bg-white rounded-md  px-2 py-3 text-black": "text-gray-200"}`}>Reading List</Link>
          </div>
          
          <Link href="/home/add-book" className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Book</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar