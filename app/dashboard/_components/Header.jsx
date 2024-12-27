"use client"; // Enables client-side rendering for this component

import React, { useEffect, useState } from "react"; // Import React and necessary hooks
import Image from "next/image"; // Import Next.js optimized Image component
import { UserButton } from "@clerk/nextjs"; // Import UserButton component from Clerk for user authentication
import { usePathname } from "next/navigation"; // Import hook to get current pathname

const Header = () => {
  const path = usePathname(); // Retrieve the current URL path
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to control mobile menu visibility

  useEffect(() => {
    console.log(path); // Log the current path to the console (useful for debugging)
  }, [path]); // Run this effect whenever the path changes

  // Function to toggle the mobile menu's visibility
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const getLinkClassNames = (route) => {
    return `text-gray-700 hover:text-blue-500 dark:text-white dark:hover:text-blue-400 transition ${
      path === route ? "font-bold text-blue-500" : ""
    }`;
  };

  return (
    <header className="bg-white shadow-lg dark:bg-gray-900">
      {/* Container for the header content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex container to arrange logo, navigation, and user menu */}
        <div className="flex justify-between items-center py-4">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Image
              src={"/logo.svg"} // Path to the logo image
              width={160} // Width of the image
              height={100} // Height of the image
              alt="logo" // Alt text for accessibility
              className="h-8 w-auto" // Tailwind classes for styling
            />
          </div>

          {/* Navigation Links - Hidden on small screens, visible on medium and larger screens */}
          <nav className="hidden md:flex space-x-8">
            {/* Dashboard Link */}
            <a href="/dashboard" className={getLinkClassNames("/dashboard")}>
              Dashboard
            </a>

            {/* How it Works Link */}
            <a href="/hiw" className={getLinkClassNames("/hiw")}>
              How it Works
            </a>

          

            {/* About Link */}
            <a href="/about" className={getLinkClassNames("/about")}>
              About
            </a>
          </nav>

          {/* User Menu and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            {/* UserButton from Clerk handles user authentication (sign-in, profile, sign-out) */}
            <UserButton afterSignOutUrl="/" />

            {/* Mobile Menu Button - Visible only on small screens */}
            <button
              type="button"
              className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
              aria-expanded={isMobileMenuOpen ? "true" : "false"} // Accessibility attribute
              onClick={toggleMobileMenu} // Toggle the mobile menu on click
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Three horizontal lines */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Rendered conditionally based on state */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-800 shadow-lg">
          <nav className="flex flex-col space-y-4 px-4 py-4">
            {/* Dashboard Link */}
            <a
              href="/dashboard"
              className={getLinkClassNames("/dashboard")}
              onClick={toggleMobileMenu} // Close the menu when link is clicked
            >
              Dashboard
            </a>

            {/* How it Works Link */}
            <a
              href="/hiw"
              className={getLinkClassNames("/hiw")}
              onClick={toggleMobileMenu} // Close the menu when link is clicked
            >
              How it Works
            </a>

           

            {/* About Link */}
            <a
              href="/about"
              className={getLinkClassNames("/about")}
              onClick={toggleMobileMenu} // Close the menu when link is clicked
            >
              About
            </a>

           
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header; // Export the Header component for use in other parts of the application
