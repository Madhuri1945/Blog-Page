import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { showSuccess, showError } from "../../utils/toast";
import { useAuth } from "../../utils/AuthContext";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const validateForm = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        form
      );
      console.log("Login successful:", response.data);
      login(response.data.token);
      showSuccess("Login successful");
      // Redirect to home
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.data?.message) {
        toast.showError(err.response.data.message);
      } else {
        showError("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50"></div>
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">
            Sign in to your account and continue your tech journey
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  value={form.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-600 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className={`w-full pl-10 pr-12 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-600 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-slate-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-300 hover:bg-slate-700 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center px-4 py-2 border border-slate-600 rounded-lg bg-slate-900/50 text-slate-300 hover:bg-slate-700 transition-all duration-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
              >
                Create one here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Protected by industry-standard encryption and security measures
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
