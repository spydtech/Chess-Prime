// src/components/ChessHero.jsx
import React from "react";
import { Play } from "lucide-react";
import logo from "../assets/landing-images/Untitled design.png";
import main from "../assets/landing-images/main.png";

const ChessversLanding = () => {
  return (
    <section className="bg-[#150F0B] text-white min-h-screen items-center py-10">
      <div className="max-w-6xl mx-auto  md:px-10 w-full grid md:grid-cols-2 gap-5 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          {/* Logo */}
          <div className="flex items-center  mb-10    ">
            <div className="   flex items-center justify-center  rounded-full p-2 ">
                <img
                    src={logo}
                    alt="chess logo"
                    className="w-[180px] h-[180px] object-contain bg-black  rounded-full   p-4 "
                />
            </div>
           
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Play Chess
            <br />
            <span className="text-[#FFA200]">Like Never Before</span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 mt-6 max-w-md">
            Join millions of players in the most engaging chess platform.
            Play, learn, and compete at your level.
          </p>

          {/* Stats */}
         
          <div className="flex gap-10 mt-10">
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

          {/* Buttons */}
         
        </div>
       

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex flex-col justify-center items-center -mt-10 bg-[#150F0B]  ">
          <img
            src={main}
            alt="chess board"
            className="w-[400px] drop-shadow-2xl  py-10"
          />
          <div className="flex gap-4 mt-10 justify-right  ">
            <button className="flex items-center gap-2 bg-[#FFA200] hover:bg-[#FFA200] text-white text-sm  px-6 py-3 rounded-full shadow-lg transition">
              <Play size={18} />
              Play Now
            </button>

            <button className="border border-amber-500 text-white text-sm px-6 py-3 rounded-full hover:bg-[#FFA200] hover:text-white transition">
              Watch a Game
            </button>
          </div>
        </div>
         
      </div>
      <div className=" mt-0 w-full py-2">
         <h1 className="text-center text-gray-500 text-xl font-medium mt-10">Everything You Need to
        <span className="text-[#FFA200]"> Master Chess</span></h1>
      </div>
     
    </section>
  );
};

export default ChessversLanding;
