import React from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import knight from "../assets/horse.png";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#140a03] relative overflow-hidden">
      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-6 left-6 text-white z-20"
      >
        <ArrowLeft size={28} />
      </button>

      <div className="absolute inset-0 flex items-start justify-center pt-20">
        <div className="w-[650px] h-[650px] bg-[#FFA200] opacity-20 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-16 max-w-md mx-auto">
        <img
          src={knight}
          alt="Chess"
          className="w-100 h-60 object-contain mt-6"
        />

        <h1 className="text-white text-4xl font-bold leading-tight -mt-2">
          Create your own <br />
          <span className="text-[#FFA200]">ChessVerse</span> account
        </h1>

        <button
          onClick={() => navigate("/register-form")}
          className="mt-8 w-full bg-[#FFA200] hover:bg-[#e69500] text-white font-semibold py-4 rounded-full text-lg transition shadow-lg shadow-[#FFA200]/30"
        >
          Continue with Email
        </button>

        <div className="flex items-center gap-4 my-6 w-full">
          <div className="flex-1 h-px bg-gray-600"></div>
          <span className="text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>

        <button
          onClick={() => navigate("/register-form")}
          className="w-full border border-[#FFA200] text-white py-4 rounded-full text-lg hover:bg-[#FFA200] transition shadow-md shadow-[#FFA200]/20"
        >
          Registration
        </button>
      </div>
    </div>
  );
};

export default Register;