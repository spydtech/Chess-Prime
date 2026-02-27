import React, { useState, useEffect } from "react";

const PlayPage = () => {
  const [boardColors, setBoardColors] = useState({
    lightSquare: "#eeeed2",
    darkSquare: "#769656",
    name: "Classic"
  });

  const initialBoard = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ];

  const options = [
    { title: "Play Online", desc: "Play against real players" },
    { title: "Play BOTS", desc: "Challenge AI opponent" },
    { title: "Play Coach", desc: "Learn to play with coach" },
    { title: "Play a Friend", desc: "Play against your friends" },
    { title: "Play Tournament", desc: "Challenge other players in tournaments" },
    { title: "Chess Variants", desc: "Set your own chess variant" },
  ];

  // Load board colors from localStorage
  useEffect(() => {
    const savedStyle = localStorage.getItem("boardStyle");
    if (savedStyle) {
      try {
        const parsed = JSON.parse(savedStyle);
        console.log("Loading board colors in PlayPage:", parsed);
        setBoardColors({
          lightSquare: parsed.lightSquare,
          darkSquare: parsed.darkSquare,
          name: parsed.name
        });
      } catch (e) {
        // Handle old format (just string)
        console.log("Loading board style in PlayPage:", savedStyle);
        switch (savedStyle) {
          case "themed":
            setBoardColors({ lightSquare: "#BDBDBD", darkSquare: "#140905", name: "Themed" });
            break;
          case "classic":
            setBoardColors({ lightSquare: "#E5E5E5", darkSquare: "#000000", name: "Classic" });
            break;
          case "fresh":
          default:
            setBoardColors({ lightSquare: "#D2B48C", darkSquare: "#7B3F2A", name: "Fresh" });
        }
      }
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#2b2b2b] text-white overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex-1 flex items-center justify-center px-16 py-10">

        {/* Square Board */}
        <div className="w-full max-w-[720px] aspect-square rounded-lg overflow-hidden shadow-2xl border border-black">

          <div className="grid grid-cols-8 grid-rows-8 w-full h-full relative">
            {initialBoard.map((row, r) =>
              row.map((piece, c) => {
                const dark = (r + c) % 2 === 1;

                return (
                  <div
                    key={r + "-" + c}
                    style={{
                      backgroundColor: dark ? boardColors.darkSquare : boardColors.lightSquare
                    }}
                    className="flex items-center justify-center text-3xl md:text-4xl lg:text-5xl font-bold"
                  >
                    {piece}
                  </div>
                );
              })
            )}
            
            {/* Optional: Show current board style name */}
            <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {boardColors.name} Style
            </div>
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-[380px] bg-black/40 flex flex-col border-l border-white/10">

        <div className="p-6 border-b border-white/10">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
            ♟️ Play Chess
          </h1>
          
          {/* Color indicator */}
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
            <span>Board: {boardColors.name}</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: boardColors.lightSquare }}></div>
              <div className="w-3 h-3 rounded" style={{ backgroundColor: boardColors.darkSquare }}></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-5
        scrollbar-thin
        scrollbar-thumb-[#7FA650]
        scrollbar-track-[#1f1f1f]">

          {options.map((item, i) => (
            <button
              key={i}
              className="w-full bg-[#333230] hover:bg-[#4a4a4a]
              p-6 rounded-2xl text-left transition
              shadow-lg hover:scale-[1.02]"
            >
              <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{item.desc}</p>
            </button>
          ))}

        </div>

      </div>

    </div>
  );
};

export default PlayPage;