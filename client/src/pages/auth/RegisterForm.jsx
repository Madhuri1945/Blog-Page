import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../utils/AuthContext";
import { showError, showSuccess } from "../../utils/toast";

const RegisterForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) {
      newErrors.username = "Username is required";
    } else if (form.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
        "http://localhost:4000/api/auth/register",
        form
      );
      console.log("Registration successful:", response.data);
      login(response.data.token);
      showSuccess("Register successful");
      navigate("/");
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.data?.message) {
        showError(err.response.data.message);
      } else {
        showError("Registration failed. Please try again.");
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
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-slate-400">
            Join our tech community and start sharing your insights
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Username
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <input
                  type="text"
                  id="username"
                  value={form.username}
                  onChange={(e) =>
                    handleInputChange("username", e.target.value)
                  }
                  className={`w-full pl-10 pr-4 py-3 bg-slate-900/50 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-slate-600 focus:ring-blue-500/50 focus:border-blue-500"
                  }`}
                  placeholder="Enter your username"
                />
              </div>
              {errors.username && (
                <p className="mt-2 text-sm text-red-400">{errors.username}</p>
              )}
            </div>

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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            By creating an account, you agree to our{" "}
            <a
              href="#"
              className="text-slate-400 hover:text-slate-300 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-slate-400 hover:text-slate-300 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
