import { useState, useEffect } from "react";
import { Menu } from "lucide-react";

export default function LearnPage() {
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

  // Load board colors from localStorage
  useEffect(() => {
    const savedStyle = localStorage.getItem("boardStyle");
    if (savedStyle) {
      try {
        const parsed = JSON.parse(savedStyle);
        console.log("Loading board colors in LearnPage:", parsed);
        setBoardColors({
          lightSquare: parsed.lightSquare,
          darkSquare: parsed.darkSquare,
          name: parsed.name
        });
      } catch (e) {
        // Handle old format (just string)
        console.log("Loading board style in LearnPage:", savedStyle);
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
    <div className="flex h-screen bg-[#262421] text-white overflow-hidden">

      {/* LEFT SIDE (Same as PlayPage) */}
      <div className="flex-1 flex items-center justify-center px-16 py-10">

        <div className="w-full max-w-[720px] aspect-square rounded-lg overflow-hidden shadow-2xl border border-black relative">

          <div className="grid grid-cols-8 grid-rows-8 w-full h-full">
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
          </div>

          {/* Board style indicator */}
          <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
            {boardColors.name} Style
          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}
      <div className="w-[380px] my-5 rounded-2xl bg-gradient-to-b from-[#1c1c1c] via-[#0f2c2f] to-[#0b3b3f] flex flex-col border-l border-white/10 p-8">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-semibold">Learn</span>
        </div>

        {/* Color indicator */}
        <div className="flex items-center justify-start gap-2 mb-6 text-xs text-gray-400">
          <span>Board:</span>
          <span className="text-white/80">{boardColors.name}</span>
          <div className="flex items-center gap-1 ml-1">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: boardColors.lightSquare }}></div>
            <div className="w-3 h-3 rounded" style={{ backgroundColor: boardColors.darkSquare }}></div>
          </div>
        </div>

        {/* TEACHER MESSAGE */}
        <div className="flex items-start gap-4 mb-14">
          <div className="w-12 h-12 rounded-full bg-[#3a3a3a] flex items-center justify-center shadow-md text-2xl">
            👨‍🏫
          </div>

          <div className="bg-white text-black text-sm px-4 py-3 rounded-2xl shadow-lg max-w-[240px] leading-relaxed">
            Learn how to move the king, the most important piece in chess.
          </div>
        </div>

        <div className="flex-grow" />

        {/* FOOTER */}
        <div className="text-lg font-semibold mb-4">
          Learn To Play
        </div>

        <div className="flex items-center gap-3">

          <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#406340] shadow-lg hover:scale-105 transition">
            <Menu size={22} />
          </button>

          <button className="flex-1 h-12 rounded-xl bg-[#7FA650] font-semibold shadow-lg hover:bg-[#6d8e45] transition">
            Start Lesson
          </button>

        </div>

      </div>

    </div>
  );
}