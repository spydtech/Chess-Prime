// import React, { useState } from "react";
// import { ArrowLeft, Mail, Lock, User } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import knight from "../assets/horse.png";

// const Login = () => {
//   const [remember, setRemember] = useState(true);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Login attempted");
//     navigate("/chess-experience");
//   };

//   return (
//     <div className="h-screen bg-[#140a03] relative overflow-hidden flex items-center justify-center">
      
//       <button 
//         onClick={() => navigate(-1)}
//         className="absolute top-6 left-6 text-white"
//       >
//         <ArrowLeft size={28} />
//       </button>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="w-[700px] h-[700px] bg-[#FFA200] opacity-20 rounded-full blur-[180px]" />
//       </div>

//       <div className="relative z-10 w-full max-w-md px-6 text-center">
//         <img
//           src={knight}
//           alt="horse"
//           className="w-100 h-80 mx-auto mb-2"
//         />

//         <h1 className="text-white text-3xl font-semibold whitespace-nowrap">
//           Welcome Back to ChessVerse
//         </h1>

//         <p className="text-gray-400 mt-0 mb-4">
//           Enter your credentials to access your account
//         </p>

//         <form onSubmit={handleLogin}>
          
//           {/* EMAIL LABEL */}
//           <div className="text-left mb-1">
//             <label className="text-gray-300 text-sm font-medium">
//               Email Address
//             </label>
//           </div>

//           {/* EMAIL INPUT */}
//           <div className="relative mb-3">
//             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="w-full bg-transparent border border-[#FFA200] rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]"
//             />
//           </div>

//           {/* PASSWORD LABEL */}
//           <div className="text-left mb-1">
//             <label className="text-gray-300 text-sm font-medium">
//               Password
//             </label>
//           </div>

//           {/* PASSWORD INPUT */}
//           <div className="relative mb-3">
//             <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full bg-transparent border border-[#FFA200] rounded-full py-3 pl-12 text-white outline-none focus:ring-2 focus:ring-[#FFA200]"
//             />
//           </div>

//           {/* REMEMBER ME & FORGOT PASSWORD */}
//           <div className="flex items-center justify-between mb-5">
//             <div className="flex items-center gap-3">
//               <div
//                 onClick={() => setRemember(!remember)}
//                 className={`
//                   w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition
//                   ${remember ? "bg-[#FFA200]" : "bg-gray-600"}
//                 `}
//               >
//                 <div
//                   className={`
//                     bg-white w-4 h-4 rounded-full shadow-md transform transition
//                     ${remember ? "translate-x-5" : ""}
//                   `}
//                 />
//               </div>
//               <span className="text-gray-400 text-sm">
//                 Remember me
//               </span>
//             </div>

//             <span className="text-[#FFA200] text-sm cursor-pointer hover:underline">
//               Forgot Password?
//             </span>
//           </div>

//           {/* LOGIN BUTTON */}
//           <button
//             type="submit"
//             className="w-full bg-[#FFA200] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#e69500] transition shadow-lg shadow-[#FFA200]/30"
//           >
//             Log In
//           </button>
//         </form>

//         {/* SIGN UP LINK */}
//         <div className="mt-4 text-gray-400">
//           Don't have an account?{" "}
//           <span 
//             onClick={() => navigate("/register")}
//             className="text-[#FFA200] cursor-pointer hover:underline"
//           >
//             Sign Up
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { ArrowLeft, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import knight from "../assets/horse.png";

const Login = () => {
  const [remember, setRemember] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [localError, setLocalError] = useState("");
  
  const navigate = useNavigate();
  const { login, error: authError, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ ...formData, remember });
      navigate("/chess-experience");
    } catch (error) {
      setLocalError(error.response?.data?.message || 'Login failed');
    }
  };

  const handleForgotPassword = () => {
    // You can implement this later
    alert('Please contact support or use the "Forgot Password" feature');
  };

  const displayError = localError || authError;

  return (
    <div className="h-screen bg-[#140a03] relative overflow-hidden flex items-center justify-center">
      
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
          className="w-100 h-80 mx-auto mb-2"
        />

        <h1 className="text-white text-3xl font-semibold">
          Welcome Back to <span className="text-[#FFA200]">ChessVerse</span>
        </h1>

        <p className="text-gray-400 mt-0 mb-4">
          Enter your credentials to access your account
        </p>

        {displayError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 mb-4">
            {displayError}
          </div>
        )}

        <form onSubmit={handleLogin}>
          
          <div className="text-left mb-1">
            <label className="text-gray-300 text-sm font-medium">
              Email Address
            </label>
          </div>

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

          <div className="text-left mb-1">
            <label className="text-gray-300 text-sm font-medium">
              Password
            </label>
          </div>

          <div className="relative mb-3">
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

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                onClick={() => setRemember(!remember)}
                className={`
                  w-10 h-5 flex items-center rounded-full p-1 cursor-pointer transition
                  ${remember ? "bg-[#FFA200]" : "bg-gray-600"}
                `}
              >
                <div
                  className={`
                    bg-white w-4 h-4 rounded-full shadow-md transform transition
                    ${remember ? "translate-x-5" : ""}
                  `}
                />
              </div>
              <span className="text-gray-400 text-sm">
                Remember me
              </span>
            </div>

            <span 
              onClick={handleForgotPassword}
              className="text-[#FFA200] text-sm cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFA200] text-white py-3 rounded-full text-lg font-semibold hover:bg-[#e69500] transition shadow-lg shadow-[#FFA200]/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-4 text-gray-400">
          Don't have an account?{" "}
          <span 
            onClick={() => navigate("/register")}
            className="text-[#FFA200] cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;