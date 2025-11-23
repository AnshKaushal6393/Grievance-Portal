import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { logout } from "../../redux/slices/authSlice";
import {
  Menu,
  X,
  Home,
  FileText,
  User,
  LogOut,
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3">
            <div className="h-10 w-10 bg-[#2563eb] rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">
                Grievance Portal
              </h1>
              <p className="text-xs text-gray-500">E-Governance System</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive("/")
                    ? "text-[#2563eb] bg-blue-50"
                    : "text-gray-700 hover:text-[#2563eb] hover:bg-gray-50"
                }
              `}
            >
              <Home size={18} />
              <span>{t("nav.home")}</span>
            </Link>

            <Link
              to="/about"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive("/about")
                  ? "text-[#2563eb] bg-blue-50"
                  : "text-gray-700 hover:text-[#2563eb] hover:bg-gray-50"
              }`}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/track-complaint"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive("/track-complaint")
                    ? "text-[#2563eb] bg-blue-50"
                    : "text-gray-700 hover:text-[#2563eb] hover:bg-gray-50"
                }
              `}
            >
              <Search size={18} />
              <span>{t("nav.track")}</span>
            </Link>

            <div className="ml-4">
              <LanguageSwitcher />
            </div>

            {isAuthenticated ? (
              <>
                <button className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>

                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src={user?.avatar || "https://via.placeholder.com/40"}
                      alt="Profile"
                      className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.name}
                    </span>
                    <ChevronDown size={16} className="text-gray-500" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Home size={16} />
                        <span>{t("nav.dashboard")}</span>
                      </Link>

                      <Link
                        to="/my-complaints"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <FileText size={16} />
                        <span>{t("nav.myComplaints")}</span>
                      </Link>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User size={16} />
                        <span>{t("nav.profile")}</span>
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                        >
                          <LogOut size={16} />
                          <span>{t("nav.logout")}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-7">
                <Link to="/login">
                  <button className="px-5 py-2 text-sm font-medium text-[#2563eb] hover:bg-blue-50 rounded-lg transition-colors">
                    {t("nav.login")}
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-2 text-sm font-medium text-white bg-[#2563eb] hover:bg-[#1e40af] rounded-lg transition-colors shadow-md">
                    {t("nav.register")}
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/")
                  ? "text-[#2563eb] bg-blue-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.home")}
            </Link>

            <Link
              to="/about"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/about")
                  ? "text-[#2563eb] bg-blue-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.about")}
            </Link>

            <Link
              to="/track-complaint"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive("/track-complaint")
                  ? "text-[#2563eb] bg-blue-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("nav.track")}
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.dashboard")}
                </Link>
                <Link
                  to="/my-complaints"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.myComplaints")}
                </Link>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.profile")}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  {t("nav.logout")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#2563eb] hover:bg-[#1e40af]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
