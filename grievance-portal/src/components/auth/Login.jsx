import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { clearError, login } from "../../redux/slices/authSlice";
import { AlertCircle, Eye, EyeOff, Lock, Mail, Mic } from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-xl mb-6">
            <svg
              className="h-10 w-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {t('login.title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('login.subtitle')}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Email/Phone Input */}
            <div>
              <label htmlFor="emailOrPhone" className="block text-sm font-semibold text-gray-700 mb-3">
                {t('login.email')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="emailOrPhone"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  placeholder="Enter your email or phone number"
                  required
                  className="w-full pl-12 pr-4 py-4 text-base text-gray-900 border border-gray-300 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  placeholder-gray-400 bg-gray-50 hover:bg-white transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                {t('login.password')} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-4 text-base text-gray-900 border border-gray-300 rounded-xl
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  placeholder-gray-400 bg-gray-50 hover:bg-white transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-blue-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                  {t('login.rememberMe')}
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {t('login.forgotPassword')}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 
              rounded-xl shadow-lg hover:from-blue-700 hover:to-blue-800 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              mt-2"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  <span>Signing in...</span>
                </div>
              ) : (
                t('login.signIn')
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                {t('login.or')}
              </span>
            </div>
          </div>

          {/* Voice Login Button */}
          <Link to="/voice-login">
            <button
              type="button"
              className="w-full py-4 px-6 text-base font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 
              rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-800 
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
              transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]
              flex items-center justify-center gap-3"
            >
              <Mic className="h-5 w-5" />
              <span>{t('login.voiceLogin') || 'Login with Voice'}</span>
            </button>
          </Link>
          <p className="text-center text-xs text-gray-500 mt-3">
            For users who prefer voice input
          </p>

          {/* Register Link */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-base text-gray-700">
              {t('login.noAccount')}{" "}
              <Link
                to="/register"
                className="font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
              >
                {t('login.signUp')}
              </Link>
            </p>
          </div>
        </div>

        {/* Track Complaint Link */}
        <div className="mt-8 text-center">
          <Link
            to="/track-complaint"
            className="inline-flex items-center gap-2 text-base text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <AlertCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="group-hover:underline">Track your complaint without login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;