import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { clearError, login } from "../../redux/slices/authSlice";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.emailOrPhone || !formData.password) {
      toast.error("Please fill all required fields");
      return;
    }
    dispatch(login(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f0ff] via-white to-[#f5f8ff] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl border border-gray-200 rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="text-center pt-10 pb-6 px-8">
            <div className="mx-auto h-20 w-20 bg-[#2563eb] rounded-2xl flex items-center justify-center shadow-lg mb-5">
              <svg
                className="h-11 w-11 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("login.title")}
            </h1>
            <p className="text-sm text-gray-600">{t("login.subtitle")}</p>
          </div>

          {/* Login Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Phone Input */}
              <div>
                <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("login.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  placeholder={t("login.emailPlaceholder") || "Enter your email or phone number"}
                  required
                  className="w-full px-4 py-3 text-[15px] text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] placeholder:text-gray-400 bg-white transition-all duration-200"
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  {t("login.password")} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={t("login.passwordPlaceholder") || "Enter your password"}
                    required
                    className="w-full px-4 py-3 pr-12 text-[15px] text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] placeholder:text-gray-400 bg-white transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#2563eb] transition-colors focus:outline-none p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#2563eb] focus:ring-[#2563eb] cursor-pointer"
                  />
                  <span>{t("login.rememberMe")}</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#2563eb] hover:text-[#1e40af] font-medium hover:underline"
                >
                  {t("login.forgotPassword")}
                </Link>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2563eb] text-white py-3 rounded-lg font-semibold hover:bg-[#1e40af] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2563eb] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 mx-auto text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                  ) : (
                    t("login.signIn")
                  )}
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">{t("login.or")}</span>
              </div>
            </div>

            {/* Register Link */}
            <div className="text-center text-sm text-gray-700 mb-5">
              {t("login.noAccount")}{" "}
              <Link
                to="/register"
                className="text-[#2563eb] hover:text-[#1e40af] font-semibold hover:underline"
              >
                {t("login.signUp")}
              </Link>
            </div>

            {/* Track Complaint */}
            <div className="text-center">
              <Link
                to="/track-complaint"
                className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563eb] transition-colors"
              >
                <AlertCircle size={16} />
                <span>{t("login.trackComplaint") || "Track your complaint without login"}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;