'use client';

import { Brain } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link'; // Add this import at the top with your other imports

export function Navbar() {
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <nav className={` fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Brain className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold">AI Interview Mocker</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}