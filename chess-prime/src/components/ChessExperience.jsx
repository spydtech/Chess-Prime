import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import knight from "../assets/horse.png";
import pawn from "../assets/pawn.png";
import knightIcon from "../assets/horse.png";
import rook from "../assets/queen.png";
import queen from "../assets/king.png";

const ChessExperience = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const options = [
    {
      id: 1,
      text: "I don’t know how to play",
      icon: pawn,
    },
    {
      id: 2,
      text: "I know the rules and basics",
      icon: knightIcon,
    },
    {
      id: 3,
      text: "I know Strategies and Tactics",
      icon: rook,
    },
    {
      id: 4,
      text: "I’m a tournament player",
      icon: queen,
    },
  ];

  const handleContinue = () => {
    if (selected) {
      // Navigate to dashboard after selection
      navigate("/dashboard");
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#140a03] flex items-start justify-center relative overflow-x-hidden px-4 pt-8 sm:pt-16">
      {/* BACK BUTTON */}
      <button 
        onClick={handleBack}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 text-white z-20"
      >
        <ArrowLeft size={24} className="sm:w-7 sm:h-7" />
      </button>

      {/* CENTER GLOW - responsive size */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] bg-[#FFA200] opacity-20 rounded-full blur-[120px] sm:blur-[180px]" />
      </div>

      {/* CONTENT - responsive width and spacing */}
      <div className="relative z-10 w-full max-w-[520px] text-center px-4 sm:px-0 mt-8 sm:-mt-16 md:-mt-20">
        
        {/* KNIGHT - responsive sizing */}
        <img
          src={knight}
          className="w-48 h-40 sm:w-64 sm:h-52 md:w-80 md:h-64 lg:w-96 lg:h-80 mx-auto object-contain"
          alt="Chess knight"
        />

        {/* TITLE - responsive text */}
        <h1 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-4 sm:mb-6">
          What is Your Chess Experience?
        </h1>

        {/* OPTIONS - responsive spacing and sizing */}
        <div className="space-y-2 sm:space-y-3">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`
                flex items-center
                gap-3 sm:gap-4 md:gap-5
                border
                rounded-full
                px-4 sm:px-5 md:px-6
                py-2.5 sm:py-3 md:py-3.5
                cursor-pointer
                transition-all
                w-full
                hover:border-[#FFA200] hover:bg-[#FFA200]/5
                ${selected === item.id
                  ? "border-[#FFA200] bg-[#FFA200]/10"
                  : "border-[#FFA200]/30 sm:border-[#FFA200]/70"
                }
              `}
            >
              <img
                src={item.icon}
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 object-contain"
                alt=""
              />
              <span className="text-gray-300 text-sm sm:text-base md:text-lg text-left flex-1">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* CONTINUE BUTTON - responsive sizing */}
        <button
          onClick={handleContinue}
          className={`
            mt-4 sm:mt-6
            w-full
            bg-[#FFA200]
            text-white
            py-3 sm:py-4
            rounded-full
            text-base sm:text-lg
            font-semibold
            hover:bg-[#e69500]
            transition-all
            shadow-lg
            shadow-[#FFA200]/40
            active:scale-95
            ${!selected ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          disabled={!selected}
        >
          Continue
        </button>
      </div>

      {/* Optional: Add a subtle gradient overlay at the bottom for better mobile transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#140a03] to-transparent pointer-events-none" />
    </div>
  );
};

export default ChessExperience;