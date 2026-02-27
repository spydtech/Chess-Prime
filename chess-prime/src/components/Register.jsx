// import React from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import knight from "../assets/horse.png";

// const Register = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-[#140a03] relative overflow-hidden">
//       <button 
//         onClick={() => navigate(-1)} 
//         className="absolute top-6 left-6 text-white z-20"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       <div className="absolute inset-0 flex items-start justify-center pt-20">
//         <div className="w-[650px] h-[650px] bg-[#FFA200] opacity-20 rounded-full blur-[180px]" />
//       </div>

//       <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 max-w-md mx-auto">
//         <img
//           src={knight}
//           alt="Chess"
//           className="w-100 h-60 object-contain mt-6"
//         />

//         <h1 className="text-white text-4xl font-bold leading-tight -mt-2">
//           Create your own <br />
//           <span className="text-[#FFA200]">ChessVerse</span> account
//         </h1>

//         <button
//           onClick={() => navigate("/register-form")}
//           className="mt-8 w-full bg-[#FFA200] hover:bg-[#e69500] text-white font-semibold py-4 rounded-full text-lg transition shadow-lg shadow-[#FFA200]/30"
//         >
//           Continue with Email
//         </button>

//         <div className="flex items-center gap-4 my-6 w-full">
//           <div className="flex-1 h-px bg-gray-600"></div>
//           <span className="text-gray-400">OR</span>
//           <div className="flex-1 h-px bg-gray-600"></div>
//         </div>

//         <button
//           onClick={() => navigate("/register-form")}
//           className="w-full border border-[#FFA200] text-white py-4 rounded-full text-lg hover:bg-[#FFA200] transition shadow-md shadow-[#FFA200]/20"
//         >
//           Registration
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from "react";
import { ArrowLeft, User, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import knight from "../assets/horse.png";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, error: authError, loading: authLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [localError, setLocalError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear validation error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors({
        ...validationErrors,
        [e.target.name]: ""
      });
    }
    setLocalError("");
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await register(formData);
      navigate("/chess-experience");
    } catch (error) {
      setLocalError(error.response?.data?.message || 'Registration failed');
    }
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen bg-[#0f0702] relative overflow-hidden flex items-start justify-center pt-8">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white hover:text-[#FFA200] transition"
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

        {displayError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
            {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="text-left mb-1">
            <label className="text-gray-300 text-sm font-medium">
              Full Name
            </label>
          </div>

          <div className="relative mb-1">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className={`w-full bg-transparent border ${
                validationErrors.name ? 'border-red-500' : 'border-[#FFA200]'
              } rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]`}
            />
          </div>
          {validationErrors.name && (
            <p className="text-red-500 text-xs text-left mb-3">{validationErrors.name}</p>
          )}

          <div className="text-left mb-1 mt-3">
            <label className="text-gray-300 text-sm font-medium">
              Email Address
            </label>
          </div>

          <div className="relative mb-1">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full bg-transparent border ${
                validationErrors.email ? 'border-red-500' : 'border-[#FFA200]'
              } rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]`}
            />
          </div>
          {validationErrors.email && (
            <p className="text-red-500 text-xs text-left mb-3">{validationErrors.email}</p>
          )}

          <div className="text-left mb-1 mt-3">
            <label className="text-gray-300 text-sm font-medium">
              Password
            </label>
          </div>

          <div className="relative mb-1">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full bg-transparent border ${
                validationErrors.password ? 'border-red-500' : 'border-[#FFA200]'
              } rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]`}
            />
          </div>
          {validationErrors.password && (
            <p className="text-red-500 text-xs text-left mb-5">{validationErrors.password}</p>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-[#FFA200] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#e69500] transition shadow-lg shadow-[#FFA200]/30 disabled:opacity-50 disabled:cursor-not-allowed mt-5"
          >
            {authLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Registering...
              </div>
            ) : 'Register'}
          </button>
        </form>

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