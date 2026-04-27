// // src/components/ChessHero.jsx
// import React from "react";
// import { Play } from "lucide-react";
// import logo from "../assets/landing-images/logo2.png";
// import main from "../assets/landing-images/main.png";
// import { Link } from "react-router-dom";

// const ChessHero = () => {
//   return (
//     <section className="bg-[#150F0B] text-white  items-center py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-2 gap-5 items-center">
        
//         {/* LEFT CONTENT */}
//         <div className="text-center md:text-left">
//           {/* Logo */}
//           <div className="flex items-center justify-center md:justify-start mb-10 bg-[#150F0B]">
//             <div className="flex items-center justify-center rounded-full p-2">
//                 <img
//                     src={logo}
//                     alt="chess logo"
//                     className="w-[140px] sm:w-[160px] md:w-[180px] h-[140px] sm:h-[160px] md:h-[180px] object-contain bg-white rounded-full p-4"
//                 />
//             </div>
//           </div>

//           {/* Heading */}
//           <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
//             Play Chess
//             <br />
//             <span className="text-[#FFA200]">Like Never Before</span>
//           </h1>

//           {/* Description */}
//           <p className="text-gray-400 mt-6 max-w-md mx-auto md:mx-0">
//             Join millions of players in the most engaging chess platform.
//             Play, learn, and compete at your level.
//           </p>

//           {/* Stats */}
//           <div className="flex flex-wrap justify-center md:justify-start gap-6 sm:gap-8 md:gap-10 mt-10">
//             <div>
//               <h3 className="text-[#FFA200] font-bold text-xl">2M+</h3>
//               <p className="text-sm text-gray-400">Active Players</p>
//             </div>

//             <div>
//               <h3 className="text-[#FFA200] font-bold text-xl">50K+</h3>
//               <p className="text-sm text-gray-400">Daily Games</p>
//             </div>

//             <div>
//               <h3 className="text-[#FFA200] font-bold text-xl">1M+</h3>
//               <p className="text-sm text-gray-400">Puzzles</p>
//             </div>
//           </div>

//           {/* Mobile/Tablet Buttons - visible below md breakpoint */}
//           <div className="flex flex-col sm:flex-row gap-4 mt-10 md:hidden justify-center">
//             <Link to="/login" className="w-full sm:w-auto">
//               <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#FFA200] hover:bg-[#FFA200] text-white text-sm px-6 py-3 rounded-full shadow-lg transition">
//                 <Play size={18} />
//                 Play Now
//               </button>
//             </Link>

//             <Link to="/chess-learning" className="w-full sm:w-auto">
//               <button className="w-full sm:w-auto border border-amber-500 text-white text-sm px-6 py-3 rounded-full hover:bg-[#FFA200] hover:text-white transition">
//                 Learn With Us
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* RIGHT IMAGE */}
//         <div className="flex flex-col justify-center items-center mt-0 md:mt-0 bg-[#150F0B]">
//           <img
//             src={main}
//             alt="chess board"
//             className="w-[300px] sm:w-[350px] md:w-[400px] drop-shadow-2xl py-10"
//           />
          
//           {/* Desktop Buttons - hidden below md breakpoint */}
//           <div className="hidden md:flex gap-4 mt-10 justify-right">
//             <Link to="/login">
//               <button className="flex items-center gap-2 bg-[#FFA200] hover:bg-[#FFA200] text-white text-sm px-6 py-3 rounded-full shadow-lg transition">
//                 <Play size={18} />
//                 Play Now
//               </button>
//             </Link>

//             <Link to="/chess-learning">
//               <button className="border border-amber-500 text-white text-sm px-6 py-3 rounded-full hover:bg-[#FFA200] hover:text-white transition">
//                 Learn With Us
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
      
//       <div className="mt-0 w-full py-2">
//         <h1 className="text-center text-gray-500 text-lg sm:text-xl font-medium mt-10 px-4">
//           Everything You Need to
//           <span className="text-[#FFA200]"> Master Chess</span>
//         </h1>
//       </div>
//     </section>
//   );
// };

// export default ChessHero;



import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import logo from "../assets/landing-images/logo2.png";
import main from "../assets/landing-images/main.png";
import { Link } from "react-router-dom";

const ChessHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    // Prevent default touchmove behavior on the entire page
    const preventTouchMove = (e) => {
      // Allow scrolling on the hero section itself if needed
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea');
      
      if (!isInteractive) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    
    // Add CSS to prevent overscroll
    const style = document.createElement('style');
    style.textContent = `
      html, body {
        overscroll-behavior: none;
        overflow-x: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
      }
      
      .chess-hero-container {
        overscroll-behavior: none;
        -webkit-overflow-scrolling: touch;
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
      }
      
      .chess-hero-container::-webkit-scrollbar {
        width: 6px;
      }
      
      .chess-hero-container::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
      }
      
      .chess-hero-container::-webkit-scrollbar-thumb {
        background: rgba(255, 162, 0, 0.3);
        border-radius: 3px;
      }
      
      .hero-button {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: pointer;
      }
      
      .hero-button:active {
        transform: scale(0.98);
      }
      
      @media (max-width: 768px) {
        .chess-hero-container {
          height: 100vh;
          overflow-y: auto;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      // Restore body styles
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = '';
      document.removeEventListener('touchmove', preventTouchMove);
      document.head.removeChild(style);
    };
  }, []);

  // Handle scroll to prevent boundary bounce
  const handleScroll = (e) => {
    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollHeight - scrollTop === clientHeight;
    
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
  };

  return (
    <div 
      ref={heroRef}
      className="chess-hero-container bg-[#150F0B]"
      onWheel={handleScroll}
    >
      <section className="min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 w-full grid md:grid-cols-2 gap-8 items-center py-8 sm:py-12">
          
          {/* LEFT */}
          <div className="text-center md:text-left space-y-4 sm:space-y-6">
            
            {/* Logo */}
            <div className="flex justify-center md:justify-start">
              <img
                src={logo}
                alt="chess logo"
                className="w-[100px] sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto bg-white rounded-full p-2 sm:p-3"
              />
            </div>

            {/* Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Play Chess <br />
              <span className="text-[#FFA200]">Like Never Before</span>
            </h1>

            {/* Description */}
            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto md:mx-0">
              Learn, practice, and improve your chess skills with structured lessons 
              and real-time gameplay designed for all levels.
            </p>

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 sm:gap-8 pt-2 sm:pt-4">
              <div>
                <h3 className="text-[#FFA200] font-bold text-lg sm:text-xl">1000+</h3>
                <p className="text-xs sm:text-sm text-gray-400">Students</p>
              </div>

              <div>
                <h3 className="text-[#FFA200] font-bold text-lg sm:text-xl">Daily</h3>
                <p className="text-xs sm:text-sm text-gray-400">Practice Games</p>
              </div>

              <div>
                <h3 className="text-[#FFA200] font-bold text-lg sm:text-xl">All Levels</h3>
                <p className="text-xs sm:text-sm text-gray-400">Courses</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4 justify-center md:justify-start">
              <Link to="/login">
                <button className="hero-button flex items-center justify-center gap-2 bg-[#FFA200] text-black px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#e69500] hover:shadow-lg hover:shadow-[#FFA200]/30">
                  <Play size={18} />
                  Play Now
                </button>
              </Link>

              <Link to="/chess-learning">
                <button className="hero-button border text-gray-400 border-amber-500 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full hover:bg-[#FFA200] hover:text-black transition">
                  Learn With Us
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex justify-center md:justify-end">
            <img
              src={main}
              alt="chess board"
              className="w-[200px] sm:w-[260px] md:w-[320px] lg:w-[400px] xl:w-[480px] object-contain"
            />
          </div>
        </div>

        {/* Bottom Text */}
        <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center px-4 pointer-events-none">
          <p className="text-gray-500 text-xs sm:text-sm">
            Everything You Need to{" "}
            <span className="text-[#FFA200]">Master Chess</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ChessHero;