import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import knight from "../assets/horse.png";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    // After successful registration, navigate to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f0702] relative overflow-hidden flex items-start justify-center pt-8">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white"
      >
        <ArrowLeft size={28} />
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-[#FFA200] opacity-20 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6 text-center">
        <img
          src={knight}
          alt="horse"
          className="w-100 h-72 mx-auto mb-2"
        />

        <h1 className="text-white text-3xl font-semibold">
          Create Your Account
        </h1>

        <p className="text-gray-400 mt-1 mb-4">
          Join ChessVerse and start your journey
        </p>

        <form onSubmit={handleSubmit}>
          {/* NAME LABEL */}
          <div className="text-left mb-1">
            <label className="text-gray-300 text-sm font-medium">
              Full Name
            </label>
          </div>

          {/* NAME INPUT */}
          <div className="relative mb-3">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full bg-transparent border border-[#FFA200] rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]"
            />
          </div>

          {/* EMAIL LABEL */}
          <div className="text-left mb-1">
            <label className="text-gray-300 text-sm font-medium">
              Email Address
            </label>
          </div>

          {/* EMAIL INPUT */}
          <div className="relative mb-3">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full bg-transparent border border-[#FFA200] rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]"
            />
          </div>

          {/* PASSWORD LABEL */}
          <div className="text-left mb-1">
            <label className="text-gray-300 text-sm font-medium">
              Password
            </label>
          </div>

          {/* PASSWORD INPUT */}
          <div className="relative mb-5">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full bg-transparent border border-[#FFA200] rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FFA200] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#e69500] transition shadow-lg shadow-[#FFA200]/30"
          >
            Register
          </button>
        </form>

        {/* LOGIN LINK */}
        <div className="mt-4 text-gray-400">
          Already have an account?{" "}
          <span 
            onClick={() => navigate("/login")}
            className="text-[#FFA200] cursor-pointer hover:underline"
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;