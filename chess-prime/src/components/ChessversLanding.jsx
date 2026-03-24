// src/components/ChessHero.jsx
import React from "react";
import { Play } from "lucide-react";
import logo from "../assets/landing-images/logo2.png";
import main from "../assets/landing-images/main.png";
import { Link } from "react-router-dom";

const ChessHero = () => {
  return (
    <section className="bg-[#150F0B] text-white min-h-screen items-center py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-2 gap-5 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start mb-10 bg-[#150F0B]">
            <div className="flex items-center justify-center rounded-full p-2">
                <img
                    src={logo}
                    alt="chess logo"
                    className="w-[140px] sm:w-[160px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] object-contain bg-white rounded-full p-4"
                />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Play Chess
            <br />
            <span className="text-[#FFA200]">Like Never Before</span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 mt-6 max-w-md mx-auto md:mx-0">
            Join millions of players in the most engaging chess platform.
            Play, learn, and compete at your level.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8 md:gap-10 mt-10">
            <div>
              <h3 className="text-[#FFA200] font-bold text-xl">2M+</h3>
              <p className="text-sm text-gray-400">Active Players</p>
            </div>

            <div>
              <h3 className="text-[#FFA200] font-bold text-xl">50K+</h3>
              <p className="text-sm text-gray-400">Daily Games</p>
            </div>

            <div>
              <h3 className="text-[#FFA200] font-bold text-xl">1M+</h3>
              <p className="text-sm text-gray-400">Puzzles</p>
            </div>
          </div>

          {/* Mobile/Tablet Buttons - visible below md breakpoint */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 md:hidden justify-center">
            <Link to="/login" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFA200] hover:bg-[#FFA200] text-white text-sm px-6 py-3 rounded-full shadow-lg transition">
                <Play size={18} />
                Play Now
              </button>
            </Link>

            <Link to="/chess-learning" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border border-amber-500 text-white text-sm px-6 py-3 rounded-full hover:bg-[#FFA200] hover:text-white transition">
                Learn With Us
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex flex-col justify-center items-center mt-0 md:mt-0 bg-[#150F0B]">
          <img
            src={main}
            alt="chess board"
            className="w-[300px] sm:w-[350px] md:w-[400px] drop-shadow-2xl py-10"
          />
          
          {/* Desktop Buttons - hidden below md breakpoint */}
          <div className="hidden md:flex gap-4 mt-10 justify-right">
            <Link to="/login">
              <button className="flex items-center gap-2 bg-[#FFA200] hover:bg-[#FFA200] text-white text-sm px-6 py-3 rounded-full shadow-lg transition">
                <Play size={18} />
                Play Now
              </button>
            </Link>

            <Link to="/chess-learning">
              <button className="border border-amber-500 text-white text-sm px-6 py-3 rounded-full hover:bg-[#FFA200] hover:text-white transition">
                Learn With Us
              </button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-0 w-full py-2">
        <h1 className="text-center text-gray-500 text-lg sm:text-xl font-medium mt-10 px-4">
          Everything You Need to
          <span className="text-[#FFA200]"> Master Chess</span>
        </h1>
      </div>
    </section>
  );
};

export default ChessHero;