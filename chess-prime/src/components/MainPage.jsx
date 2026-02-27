import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaBolt,
  FaRobot,
  FaTrophy,
  FaChessKnight,
} from "react-icons/fa";

export default function MainPage() {
  const [boardColors, setBoardColors] = useState({
    lightSquare: "#D2B48C",
    darkSquare: "#7B3F2A",
    name: "Fresh",
  });
  const [showTournament, setShowTournament] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedStyle = localStorage.getItem("boardStyle");

    if (savedStyle) {
      try {
        const parsed = JSON.parse(savedStyle);
        setBoardColors(parsed);
      } catch {
        switch (savedStyle) {
          case "themed":
            setBoardColors({
              lightSquare: "#BDBDBD",
              darkSquare: "#140905",
              name: "Themed",
            });
            break;

          case "classic":
            setBoardColors({
              lightSquare: "#E5E5E5",
              darkSquare: "#000000",
              name: "Classic",
            });
            break;

          default:
            setBoardColors({
              lightSquare: "#D2B48C",
              darkSquare: "#7B3F2A",
              name: "Fresh",
            });
        }
      }
    }
  }, []);

  const renderBoard = () => {
    const squares = [];

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const isLight = (row + col) % 2 === 0;

        squares.push(
          <div
            key={`${row}-${col}`}
            style={{
              backgroundColor: isLight
                ? boardColors.lightSquare
                : boardColors.darkSquare,
            }}
            className="w-full aspect-square"
          />
        );
      }
    }

    return squares;
  };

  return (
    <div className="w-full h-screen overflow-hidden flex text-white">
      
      {/* LEFT SIDE BOARD */}
      <div className="w-2/3 flex items-center justify-center bg-gradient-to-br from-[#3a2317] via-[#2B1A12] to-[#1a0e07]">
        <div className="grid grid-cols-8 w-[min(620px,80vh)] border-4 border-gray-400 shadow-2xl relative">
          {renderBoard()}

          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {boardColors.name} Style
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/3 bg-black flex flex-col justify-center px-12">

        {!showTournament && (
          <>
            <h1 className="text-5xl font-bold mb-10 leading-tight">
              Lets Play <br />
              <span className="text-[#F59E0B] flex items-center gap-2">
                Chess <FaChessKnight />
              </span>
            </h1>

            <div className="space-y-6">
              <button className="w-full flex items-center gap-4 border border-[#F59E0B] px-6 py-4 rounded-full hover:bg-[#F59E0B] hover:text-black transition">
                <FaUsers /> Play a Friend
              </button>

              <button className="w-full flex items-center gap-4 border border-[#F59E0B] px-6 py-4 rounded-full hover:bg-[#F59E0B] hover:text-black transition">
                <FaBolt /> Play Online
              </button>

              <button className="w-full flex items-center gap-4 border border-[#F59E0B] px-6 py-4 rounded-full hover:bg-[#F59E0B] hover:text-black transition">
                <FaRobot /> Play Bot
              </button>

              <button
                onClick={() => setShowTournament(true)}
                className="w-full flex items-center gap-4 border border-[#F59E0B] px-6 py-4 rounded-full hover:bg-[#F59E0B] hover:text-black transition"
              >
                <FaTrophy /> Tournament
              </button>
            </div>

            <div className="mt-8 text-xs text-gray-500 flex items-center gap-3">
              <span>Board: {boardColors.name}</span>

              <div className="flex items-center gap-1">
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: boardColors.lightSquare }}
                />
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: boardColors.darkSquare }}
                />
              </div>
            </div>
          </>
        )}

        {showTournament && (
          <div className="text-center">
            <FaChessKnight className="text-4xl mx-auto mb-6 text-gray-400" />

            <h1 className="text-5xl font-bold leading-tight mb-6">
              Chess <span className="text-[#F59E0B]">Master</span> <br />
              Tournament
            </h1>

            <p className="text-gray-400 mb-6">
              Show your strategy and speed! <br />
              Compete against top players and <br />
              claim the crown of the Chess Arena.
            </p>

            <p className="text-[#F59E0B] font-semibold mb-2">
              Starts on 20 November 2025
            </p>

            <p className="text-gray-500 mb-8">
              ⏱ check-in opens 15min before start
            </p>

            <button
              onClick={() => navigate("/dashboard")}
              className="w-full bg-[#F59E0B] text-black py-4 rounded-full font-semibold hover:opacity-90 transition mb-4"
            >
              Play Tournament
            </button>

            <button
              onClick={() => setShowTournament(false)}
              className="text-gray-400 hover:text-white transition"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}