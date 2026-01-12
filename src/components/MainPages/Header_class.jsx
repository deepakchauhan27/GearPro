import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faRightToBracket,
  faRightFromBracket,
  faMoon,
  faSun,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

function Header_class() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName("");
    setMenuOpen(false); // close mobile menu on logout
  };

  return (
    <header
      className={`sticky top-0 z-50 shadow-md transition-all duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-8 py-3 space-y-3 md:space-y-0">
        {/* Top Row: Logo + Right Buttons */}
        <div className="flex w-full justify-evenly items-center ">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              className="h-12 rounded-lg hover:scale-105 transition-transform duration-300 dark:bg-white"
              src="/new_logo_2.svg"
              alt="GearPro_Logo"
            />
          </Link>

          {/* ✅ Show username next to logo (desktop view) */}
          {userName && (
            <span className="ml-4 font-semibold text-indigo-600 dark:text-indigo-400">
              Welcome, {userName}
            </span>
          )}

          {/* Right Side Buttons */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-5 py-2 rounded-lg hover:bg-indigo-800 hover:text-white transition-all duration-300 "
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>

            {/* Hamburger for mobile */}
            <button
              className="md:hidden px-5 py-2 rounded-lg hover:bg-indigo-800 hover:text-white transition-all duration-300"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex w-full md:w-1/2 max-w-lg mx-auto">
          <div className="flex items-center px-3 bg-gray-200 dark:bg-gray-700 rounded-l-lg">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
          <input
            className="flex-1 px-3 py-2 rounded-r-lg text-sm bg-gray-200 dark:bg-gray-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-800 transition-all duration-300"
            type="text"
            placeholder="Search for products..."
          />
        </div>

        {/* Desktop Right Side (Login/Profile/Cart) */}
        <div className="hidden pl-20 md:flex items-center text-md space-x-5">
          {!userName ? (
            // ✅ Show Login if not logged in
            <Link
              to="/Login"
              className="px-3 py-2 rounded-lg hover:bg-indigo-800 hover:text-white transition-all duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faRightToBracket} />
              <span className="text-sm font-semibold">Login</span>
            </Link>
          ) : (
            // ✅ Show Logout if logged in
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-lg dark:text-white  text-black hover:bg-red-600 hover:text-white nntransition-all duration-300 flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
              <span className="text-sm font-semibold">Logout</span>
            </button>
          )}

          <Link
            to="/Profilepage"
            className="px-3 py-2 rounded-lg hover:bg-indigo-800 hover:text-white transition-all duration-300 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faUser} />
            <span className="text-sm font-semibold">Profile</span>
          </Link>

          <Link
            to="/CartPage"
            className="relative px-3 py-2 rounded-lg hover:bg-indigo-800 hover:text-white transition-all duration-300 flex items-center space-x-2"
          >
            <FontAwesomeIcon icon={faCartShopping} />
            <span className="text-sm font-semibold">Cart</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
              2
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`md:hidden flex flex-col space-y-4 px-6 py-5 font-medium transition-all duration-300 ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            Shop
          </Link>
          <Link
            to="/categories"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            Categories
          </Link>
          <Link
            to="/about"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            Contact
          </Link>

          {/* ✅ Conditional Login/Logout */}
          {!userName ? (
            <Link
              to="/Sign_up"
              onClick={() => setMenuOpen(false)}
              className="hover:text-indigo-800 transition-colors"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-left hover:text-red-800 transition-colors"
            >
              Logout
            </button>
          )}

          <Link
            to="/Profilepage"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            Profile
          </Link>
          <Link
            to="/CartPage"
            onClick={() => setMenuOpen(false)}
            className="hover:text-indigo-800 transition-colors"
          >
            Cart
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header_class;
