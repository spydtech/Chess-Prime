import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function BoardStyle() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Define color schemes for each board style
  const boardSchemes = {
    themed: {
      name: "Themed",
      lightSquare: "#bdbdbd",
      darkSquare: "#140905",
      type: "themed"
    },
    fresh: {
      name: "Fresh",
      lightSquare: "#d2b48c",
      darkSquare: "#7b3f2a",
      type: "fresh"
    },
    classic: {
      name: "Classic",
      lightSquare: "#d4d4d4",
      darkSquare: "#000000",
      type: "classic"
    }
  };

  const handleContinue = () => {
    if (!selected) {
      alert("Please select a board style");
      return;
    }

    // Get the color scheme for selected style
    const selectedScheme = boardSchemes[selected];
    
    // Save the complete color scheme to localStorage
    localStorage.setItem("boardStyle", JSON.stringify(selectedScheme));
    
    // Console log the saved colors
    console.log("Board colors saved to localStorage:", selectedScheme);
    
    // Also log the current localStorage value to verify
    console.log("Current localStorage value:", JSON.parse(localStorage.getItem("boardStyle")));

    // Navigate to tournament dashboard
    navigate("/tournament-dashboard");
  };

  // Load previously saved preference on component mount
  useState(() => {
    const savedStyle = localStorage.getItem("boardStyle");
    if (savedStyle) {
      try {
        const parsed = JSON.parse(savedStyle);
        console.log("Previously saved board colors found:", parsed);
        setSelected(parsed.type);
      } catch (e) {
        // Handle old format (just string)
        console.log("Previously saved board style found:", savedStyle);
        setSelected(savedStyle);
      }
    }
  }, []);

  return (
    <div className="w-full min-h-screen text-white flex flex-col items-center justify-center relative
    bg-[radial-gradient(circle_at_center,#3a1f10_0%,#1a0e07_45%,#0b0402_100%)]">

      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 text-2xl text-gray-300 hover:text-white"
      >
        <FaArrowLeft />
      </button>

      {/* Knight Icon */}
      <div className="text-8xl text-gray-300 mb-6">♞</div>

      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-16">
        Choose your Board Style?
      </h2>

      {/* Board Options */}
      <div className="flex gap-20 mb-20">

        {/* THEMED */}
        <div
          onClick={() => {
            setSelected("themed");
            console.log("Selected colors:", boardSchemes.themed); // Log the color scheme
          }}
          className={`cursor-pointer transition-all duration-300 ${
            selected === "themed" ? "scale-110" : "opacity-80 hover:opacity-100"
          }`}
        >
          <div className="w-32 h-32 grid grid-cols-2 border border-gray-400">
            <div style={{ backgroundColor: boardSchemes.themed.lightSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.themed.darkSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.themed.darkSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.themed.lightSquare }}></div>
          </div>
          <p className="text-center mt-4 text-lg">Themed</p>
          {/* <p className="text-xs text-gray-400 text-center mt-1">
            {boardSchemes.themed.lightSquare} / {boardSchemes.themed.darkSquare}
          </p> */}
        </div>

        {/* FRESH */}
        <div
          onClick={() => {
            setSelected("fresh");
            console.log("Selected colors:", boardSchemes.fresh); // Log the color scheme
          }}
          className={`cursor-pointer transition-all duration-300 ${
            selected === "fresh" ? "scale-110" : "opacity-80 hover:opacity-100"
          }`}
        >
          <div className="w-32 h-32 grid grid-cols-2">
            <div style={{ backgroundColor: boardSchemes.fresh.lightSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.fresh.darkSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.fresh.darkSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.fresh.lightSquare }}></div>
          </div>
          <p className="text-center mt-4 text-lg">Fresh</p>
          {/* <p className="text-xs text-gray-400 text-center mt-1">
            {boardSchemes.fresh.lightSquare} / {boardSchemes.fresh.darkSquare}
          </p> */}
        </div>

        {/* CLASSIC */}
        <div
          onClick={() => {
            setSelected("classic");
            console.log("Selected colors:", boardSchemes.classic); // Log the color scheme
          }}
          className={`cursor-pointer transition-all duration-300 ${
            selected === "classic" ? "scale-110" : "opacity-80 hover:opacity-100"
          }`}
        >
          <div className="w-32 h-32 grid grid-cols-2 border border-gray-400">
            <div style={{ backgroundColor: boardSchemes.classic.lightSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.classic.darkSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.classic.darkSquare }}></div>
            <div style={{ backgroundColor: boardSchemes.classic.lightSquare }}></div>
          </div>
          <p className="text-center mt-4 text-lg">Classic</p>
          {/* <p className="text-xs text-gray-400 text-center mt-1">
            {boardSchemes.classic.lightSquare} / {boardSchemes.classic.darkSquare}
          </p> */}
        </div>

      </div>

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        className="bg-[#F59E0B] hover:bg-[#d97706] px-24 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300"
      >
        Continue
      </button>
    </div>
  );
}