import React from "react";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthContext";
import {
  Menu,
  X,
  Search,
  User,
  Settings,
  Heart,
  LogOut,
  Bell,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Mock AuthContext for demo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { loggedIn, logout, user } = useAuth();
  const profileRef = useRef(null);
  const navigate = useNavigate();
  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  const handleProfileAction = (action) => {
    console.log("Profile action:", action);
    setIsProfileOpen(false);

    if (action === "logout") {
      logout();
    }
    if (action == "favorites") {
      navigate("/favorites");
    }
    if(action=="profile"){
      navigate("/profile");
    }
    // Handle other actions (profile, settings, favorites, etc.)
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const ProfileAvatar = ({ user, size = "md" }) => {
    const sizeClasses = {
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    if (user?.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className={`${sizeClasses[size]} rounded-full object-cover border-2 border-slate-600`}
        />
      );
    }

    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white border-2 border-slate-600`}
      >
        {user?.name ? (
          getInitials(user.name)
        ) : (
          <User size={size === "sm" ? 16 : 20} />
        )}
      </div>
    );
  };

  const ProfileDropdown = () => (
    <div className="absolute right-0 top-full mt-2 w-64 bg-slate-800 border border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden">
      {/* Profile Header */}
      <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-700">
        <div className="flex items-center gap-3">
          <ProfileAvatar user={user} size="lg" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate">
              {user?.username || "User"}
            </p>
            <p className="text-sm text-slate-400 truncate">
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <button
          onClick={() => handleProfileAction("profile")}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
        >
          <User size={18} />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => handleProfileAction("favorites")}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
        >
          <Heart size={18} />
          <span>Favorite Blogs</span>
        </button>

        <button
          onClick={() => handleProfileAction("my-posts")}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
        >
          <BookOpen size={18} />
          <span>My Posts</span>
        </button>

        <button
          onClick={() => handleProfileAction("notifications")}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
        >
          <Bell size={18} />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => handleProfileAction("settings")}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors duration-200"
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>

        <div className="border-t border-slate-700 mt-2 pt-2">
          <button
            onClick={() => handleProfileAction("logout")}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <nav className="bg-slate-900 text-white shadow-lg border-b border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-400 transition-all duration-300"
            >
              TechBlog
            </a>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                placeholder="Search articles..."
                className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 relative group font-medium"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 relative group font-medium"
              >
                Blogs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-blue-400 transition-colors duration-300 relative group font-medium"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Auth Section */}
            {loggedIn ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-800 transition-colors duration-300"
                  aria-label="Profile menu"
                >
                  <ProfileAvatar user={user} />
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && <ProfileDropdown />}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/register">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                    Register
                  </button>
                </Link>
                <Link to="/login">
                  <button className="px-4 py-2 border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-all duration-300">
                    Login
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-slate-800 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-slate-700">
            <div className="px-2 pt-4 pb-6 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                  placeholder="Search articles..."
                  className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <a
                  href="#"
                  className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors duration-300"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors duration-300"
                >
                  Blogs
                </a>
                <a
                  href="#"
                  className="block px-4 py-3 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-colors duration-300"
                >
                  About
                </a>
              </div>

              {/* Mobile Auth Section */}
              {loggedIn ? (
                <div className="border-t border-slate-700 pt-4 space-y-3">
                  {/* Profile Header */}
                  <div className="flex items-center gap-3 px-4 py-2">
                    <ProfileAvatar user={user} size="lg" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">
                        {user?.name || "User"}
                      </p>
                      <p className="text-sm text-slate-400 truncate">
                        {user?.email || "user@example.com"}
                      </p>
                    </div>
                  </div>

                  {/* Profile Actions */}
                  <div className="space-y-1">
                    <button
                      onClick={() => handleProfileAction("profile")}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => handleProfileAction("favorites")}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    >
                      <Heart size={18} />
                      <span>Favorite Blogs</span>
                    </button>

                    <button
                      onClick={() => handleProfileAction("my-posts")}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    >
                      <BookOpen size={18} />
                      <span>My Posts</span>
                    </button>

                    <button
                      onClick={() => handleProfileAction("settings")}
                      className="w-full flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200"
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={() => handleProfileAction("logout")}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors duration-200"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-slate-700 pt-4 space-y-3">
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300">
                    Register
                  </button>
                  <button className="w-full px-4 py-3 border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-all duration-300">
                    Login
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
