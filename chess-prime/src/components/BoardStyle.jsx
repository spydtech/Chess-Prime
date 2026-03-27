// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa";
// import profileService from "../services/profileService";
// import { useAuth } from "../context/AuthContext";

// export default function BoardStyle() {
//   const [selectedBoard, setSelectedBoard] = useState(null);
//   const [selectedPiece, setSelectedPiece] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useAuth(); // Remove refreshUser if it doesn't exist

//   // Define color schemes for each board style
//   const boardSchemes = {
//     themed: {
//       name: "Themed",
//       lightSquare: "#bdbdbd",
//       darkSquare: "#140905",
//       type: "themed"
//     },
//     fresh: {
//       name: "Fresh",
//       lightSquare: "#d2b48c",
//       darkSquare: "#7b3f2a",
//       type: "fresh"
//     },
//     classic: {
//       name: "Classic",
//       lightSquare: "#d4d4d4",
//       darkSquare: "#000000",
//       type: "classic"
//     }
//   };

//   // Available piece sets
//   const pieceSets = [
//     { id: "alpha", name: "Alpha", preview: "wN" },
//     { id: "california", name: "California", preview: "wN" },
//     { id: "celtic", name: "Celtic", preview: "wN" },
//     { id: "fantasy", name: "Fantasy", preview: "wN" },
//     { id: "horsey", name: "Horsey", preview: "wN" },
//     { id: "anarcandy", name: "Anarcandy", preview: "wN" },
//     { id: "dubrovny", name: "Dubrovny", preview: "wN" },
//     { id: "kosal", name: "Kosal", preview: "wN" },
//     { id: "pirouetti", name: "Pirouetti", preview: "wN" }
//   ];

//   // Load previously saved preferences on component mount
//   useEffect(() => {
//     const savedBoardStyle = localStorage.getItem("boardStyle");
//     if (savedBoardStyle) {
//       try {
//         const parsed = JSON.parse(savedBoardStyle);
//         console.log("Previously saved board colors found:", parsed);
//         setSelectedBoard(parsed.type);
//       } catch (e) {
//         // Handle old format (just string)
//         console.log("Previously saved board style found:", savedBoardStyle);
//         setSelectedBoard(savedBoardStyle);
//       }
//     }

//     // Load saved piece set from user settings or localStorage
//     if (user?.settings?.pieceSet) {
//       setSelectedPiece(user.settings.pieceSet);
//     } else {
//       const savedPieceSet = localStorage.getItem("pieceSet");
//       if (savedPieceSet) {
//         setSelectedPiece(savedPieceSet);
//       }
//     }
//   }, [user]);

//   const handleContinue = async () => {
//     if (!selectedBoard) {
//       alert("Please select a board style");
//       return;
//     }

//     if (!selectedPiece) {
//       alert("Please select a piece set");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Get the color scheme for selected board style
//       const selectedScheme = boardSchemes[selectedBoard];
      
//       // Save board style to localStorage
//       localStorage.setItem("boardStyle", JSON.stringify(selectedScheme));
      
//       // Save piece set to localStorage
//       localStorage.setItem("pieceSet", selectedPiece);
      
//       // Update user settings in database
//       const settingsUpdate = {
//         boardTheme: selectedBoard,
//         pieceSet: selectedPiece
//       };
      
//       console.log("Updating settings:", settingsUpdate);
      
//       const response = await profileService.updateSettings(settingsUpdate);
      
//       console.log("Settings updated successfully:", response);
      
//       // Since refreshUser is not available, we can either:
//       // Option 1: Just navigate (data is already saved)
//       // Option 2: Update local user data through context if needed
      
//       // Show success message
//       alert("Settings saved successfully!");
      
//       // Navigate to tournament dashboard
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Failed to update settings:", error);
//       alert("Failed to save settings. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-screen text-white flex flex-col items-center justify-center relative overflow-y-auto py-12
//     bg-[radial-gradient(circle_at_center,#3a1f10_0%,#1a0e07_45%,#0b0402_100%)]">

//       {/* Back Arrow */}
//       <button
//         onClick={() => navigate(-1)}
//         className="absolute top-8 left-8 text-2xl text-gray-300 hover:text-white z-10"
//         disabled={loading}
//       >
//         <FaArrowLeft />
//       </button>

//       {/* Knight Icon */}
//       <div className="text-8xl text-gray-300 mb-6">♞</div>

//       {/* Heading */}
//       <h2 className="text-3xl font-semibold mb-8">
//         Customize Your Game Experience
//       </h2>

//       {/* Board Style Section */}
//       <div className="w-full max-w-6xl px-4 mb-12">
//         <h3 className="text-2xl font-medium mb-8 text-center">Choose Board Style</h3>
        
//         <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
//           {/* THEMED */}
//           <div
//             onClick={() => !loading && setSelectedBoard("themed")}
//             className={`cursor-pointer transition-all duration-300 ${
//               selectedBoard === "themed" ? "scale-110" : "opacity-80 hover:opacity-100"
//             } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
//           >
//             <div className="w-32 h-32 grid grid-cols-2 border border-gray-400 rounded-lg overflow-hidden shadow-lg">
//               <div style={{ backgroundColor: boardSchemes.themed.lightSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.themed.darkSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.themed.darkSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.themed.lightSquare }}></div>
//             </div>
//             <p className="text-center mt-4 text-lg">Themed</p>
//             {selectedBoard === "themed" && (
//               <p className="text-xs text-[#F5A524] text-center mt-1">✓ Selected</p>
//             )}
//           </div>

//           {/* FRESH */}
//           <div
//             onClick={() => !loading && setSelectedBoard("fresh")}
//             className={`cursor-pointer transition-all duration-300 ${
//               selectedBoard === "fresh" ? "scale-110" : "opacity-80 hover:opacity-100"
//             } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
//           >
//             <div className="w-32 h-32 grid grid-cols-2 border border-gray-400 rounded-lg overflow-hidden shadow-lg">
//               <div style={{ backgroundColor: boardSchemes.fresh.lightSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.fresh.darkSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.fresh.darkSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.fresh.lightSquare }}></div>
//             </div>
//             <p className="text-center mt-4 text-lg">Fresh</p>
//             {selectedBoard === "fresh" && (
//               <p className="text-xs text-[#F5A524] text-center mt-1">✓ Selected</p>
//             )}
//           </div>

//           {/* CLASSIC */}
//           <div
//             onClick={() => !loading && setSelectedBoard("classic")}
//             className={`cursor-pointer transition-all duration-300 ${
//               selectedBoard === "classic" ? "scale-110" : "opacity-80 hover:opacity-100"
//             } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
//           >
//             <div className="w-32 h-32 grid grid-cols-2 border border-gray-400 rounded-lg overflow-hidden shadow-lg">
//               <div style={{ backgroundColor: boardSchemes.classic.lightSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.classic.darkSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.classic.darkSquare }}></div>
//               <div style={{ backgroundColor: boardSchemes.classic.lightSquare }}></div>
//             </div>
//             <p className="text-center mt-4 text-lg">Classic</p>
//             {selectedBoard === "classic" && (
//               <p className="text-xs text-[#F5A524] text-center mt-1">✓ Selected</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Piece Set Section */}
//       <div className="w-full max-w-6xl px-4 mb-12">
//         <h3 className="text-2xl font-medium mb-8 text-center">Choose Piece Set</h3>
        
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//           {pieceSets.map((piece) => (
//             <div
//               key={piece.id}
//               onClick={() => !loading && setSelectedPiece(piece.id)}
//               className={`cursor-pointer transition-all duration-300 p-4 rounded-lg border-2 ${
//                 selectedPiece === piece.id
//                   ? 'border-[#F5A524] bg-[#F5A524]/10 scale-105'
//                   : 'border-[#5A3A1A] hover:border-[#F5A524] bg-[#2A160C]'
//               } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
//             >
//               <div className="flex flex-col items-center">
//                 <img
//                   src={`/src/assets/chesspieces/${piece.id}/wN.svg`}
//                   alt={piece.name}
//                   className="w-16 h-16 object-contain mb-2"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = `/src/assets/chesspieces/${piece.id}/wN.png`;
//                     // If PNG also fails, show text fallback
//                     e.target.onerror = () => {
//                       e.target.style.display = 'none';
//                       e.target.parentElement.innerHTML += `<span class="text-2xl">♞</span>`;
//                     };
//                   }}
//                 />
//                 <span className="text-sm font-medium capitalize">{piece.name}</span>
//                 {selectedPiece === piece.id && (
//                   <span className="text-xs text-[#F5A524] mt-1">Selected</span>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Selected Preview */}
//       {(selectedBoard || selectedPiece) && (
//         <div className="mb-8 p-4 bg-[#2A160C] rounded-lg border border-[#5A3A1A]">
//           <p className="text-sm text-gray-300 mb-2">Your Selection:</p>
//           <div className="flex items-center gap-6">
//             {selectedBoard && (
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 grid grid-cols-2 border border-gray-400 rounded overflow-hidden">
//                   <div style={{ backgroundColor: boardSchemes[selectedBoard]?.lightSquare }}></div>
//                   <div style={{ backgroundColor: boardSchemes[selectedBoard]?.darkSquare }}></div>
//                   <div style={{ backgroundColor: boardSchemes[selectedBoard]?.darkSquare }}></div>
//                   <div style={{ backgroundColor: boardSchemes[selectedBoard]?.lightSquare }}></div>
//                 </div>
//                 <span className="text-sm capitalize">{boardSchemes[selectedBoard]?.name} Board</span>
//               </div>
//             )}
//             {selectedPiece && (
//               <div className="flex items-center gap-2">
//                 <img
//                   src={`/src/assets/chesspieces/${selectedPiece}/wN.svg`}
//                   alt=""
//                   className="w-8 h-8 object-contain"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = `/src/assets/chesspieces/${selectedPiece}/wN.png`;
//                   }}
//                 />
//                 <span className="text-sm capitalize">{pieceSets.find(p => p.id === selectedPiece)?.name} Pieces</span>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Continue Button */}
//       <button
//         onClick={handleContinue}
//         disabled={loading || !selectedBoard || !selectedPiece}
//         className={`bg-[#F59E0B] hover:bg-[#d97706] px-24 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300
//           ${(loading || !selectedBoard || !selectedPiece) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
//       >
//         {loading ? (
//           <div className="flex items-center gap-2">
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//             <span>Saving...</span>
//           </div>
//         ) : (
//           "Confirm & Continue"
//         )}
//       </button>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import profileService from "../services/profileService";
import { useAuth } from "../context/AuthContext";

export default function BoardStyle() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

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

  // Available piece sets
  const pieceSets = [
    { id: "alpha", name: "Alpha", preview: "wN" },
    { id: "california", name: "California", preview: "wN" },
    { id: "celtic", name: "Celtic", preview: "wN" },
    { id: "fantasy", name: "Fantasy", preview: "wN" },
    { id: "horsey", name: "Horsey", preview: "wN" },
    { id: "anarcandy", name: "Anarcandy", preview: "wN" },
    { id: "dubrovny", name: "Dubrovny", preview: "wN" },
    { id: "kosal", name: "Kosal", preview: "wN" },
    { id: "pirouetti", name: "Pirouetti", preview: "wN" }
  ];

  // Load previously saved preferences on component mount
  useEffect(() => {
    const savedBoardStyle = localStorage.getItem("boardStyle");
    if (savedBoardStyle) {
      try {
        const parsed = JSON.parse(savedBoardStyle);
        setSelectedBoard(parsed.type);
      } catch (e) {
        setSelectedBoard(savedBoardStyle);
      }
    }

    // Load saved piece set from user settings or localStorage
    if (user?.settings?.pieceSet) {
      setSelectedPiece(user.settings.pieceSet);
    } else {
      const savedPieceSet = localStorage.getItem("pieceSet");
      if (savedPieceSet) {
        setSelectedPiece(savedPieceSet);
      }
    }
  }, [user]);

  const handleContinue = async () => {
    if (!selectedBoard) {
      alert("Please select a board style");
      return;
    }

    if (!selectedPiece) {
      alert("Please select a piece set");
      return;
    }

    setLoading(true);

    try {
      // Get the color scheme for selected board style
      const selectedScheme = boardSchemes[selectedBoard];
      
      // Save board style to localStorage
      localStorage.setItem("boardStyle", JSON.stringify(selectedScheme));
      
      // Save piece set to localStorage
      localStorage.setItem("pieceSet", selectedPiece);
      
      // Update user settings in database
      const settingsUpdate = {
        boardTheme: selectedBoard,
        pieceSet: selectedPiece
      };
      
      const response = await profileService.updateSettings(settingsUpdate);
      
      alert("Settings saved successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen text-white flex flex-col items-center justify-center relative overflow-y-auto py-12
    bg-[radial-gradient(circle_at_center,#3a1f10_0%,#1a0e07_45%,#0b0402_100%)]">

      {/* Back Arrow */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-8 left-8 text-2xl text-gray-300 hover:text-white z-10"
        disabled={loading}
      >
        <FaArrowLeft />
      </button>

      {/* Knight Icon */}
      <div className="text-8xl text-gray-300 mb-6">♞</div>

      {/* Heading */}
      <h2 className="text-3xl font-semibold mb-8">
        Customize Your Game Experience
      </h2>

      {/* Board Style Section */}
      <div className="w-full max-w-6xl px-4 mb-12">
        <h3 className="text-2xl font-medium mb-8 text-center">Choose Board Style</h3>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
          {/* THEMED */}
          <div
            onClick={() => !loading && setSelectedBoard("themed")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedBoard === "themed" ? "scale-110" : "opacity-80 hover:opacity-100"
            } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <div className="w-32 h-32 grid grid-cols-2 border border-gray-400 rounded-lg overflow-hidden shadow-lg">
              <div style={{ backgroundColor: boardSchemes.themed.lightSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.themed.darkSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.themed.darkSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.themed.lightSquare }}></div>
            </div>
            <p className="text-center mt-4 text-lg">Themed</p>
            {selectedBoard === "themed" && (
              <p className="text-xs text-[#F5A524] text-center mt-1">✓ Selected</p>
            )}
          </div>

          {/* FRESH */}
          <div
            onClick={() => !loading && setSelectedBoard("fresh")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedBoard === "fresh" ? "scale-110" : "opacity-80 hover:opacity-100"
            } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <div className="w-32 h-32 grid grid-cols-2 border border-gray-400 rounded-lg overflow-hidden shadow-lg">
              <div style={{ backgroundColor: boardSchemes.fresh.lightSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.fresh.darkSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.fresh.darkSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.fresh.lightSquare }}></div>
            </div>
            <p className="text-center mt-4 text-lg">Fresh</p>
            {selectedBoard === "fresh" && (
              <p className="text-xs text-[#F5A524] text-center mt-1">✓ Selected</p>
            )}
          </div>

          {/* CLASSIC */}
          <div
            onClick={() => !loading && setSelectedBoard("classic")}
            className={`cursor-pointer transition-all duration-300 ${
              selectedBoard === "classic" ? "scale-110" : "opacity-80 hover:opacity-100"
            } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <div className="w-32 h-32 grid grid-cols-2 border border-gray-400 rounded-lg overflow-hidden shadow-lg">
              <div style={{ backgroundColor: boardSchemes.classic.lightSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.classic.darkSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.classic.darkSquare }}></div>
              <div style={{ backgroundColor: boardSchemes.classic.lightSquare }}></div>
            </div>
            <p className="text-center mt-4 text-lg">Classic</p>
            {selectedBoard === "classic" && (
              <p className="text-xs text-[#F5A524] text-center mt-1">✓ Selected</p>
            )}
          </div>
        </div>
      </div>

      {/* Piece Set Section */}
      <div className="w-full max-w-6xl px-4 mb-12">
        <h3 className="text-2xl font-medium mb-8 text-center">Choose Piece Set</h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {pieceSets.map((piece) => (
            <div
              key={piece.id}
              onClick={() => !loading && setSelectedPiece(piece.id)}
              className={`cursor-pointer transition-all duration-300 p-4 rounded-lg border-2 ${
                selectedPiece === piece.id
                  ? 'border-[#F5A524] bg-[#F5A524]/10 scale-105'
                  : 'border-[#5A3A1A] hover:border-[#F5A524] bg-[#2A160C]'
              } ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <div className="flex flex-col items-center">
                <img
                  src={`/assets/chesspieces/${piece.id}/wN.svg`}
                  alt={piece.name}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/assets/chesspieces/${piece.id}/wN.png`;
                    e.target.onerror = () => {
                      e.target.style.display = 'none';
                      const textSpan = document.createElement('span');
                      textSpan.className = 'text-2xl';
                      textSpan.textContent = '♞';
                      e.target.parentElement.appendChild(textSpan);
                    };
                  }}
                />
                <span className="text-sm font-medium capitalize">{piece.name}</span>
                {selectedPiece === piece.id && (
                  <span className="text-xs text-[#F5A524] mt-1">Selected</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Preview */}
      {(selectedBoard || selectedPiece) && (
        <div className="mb-8 p-4 bg-[#2A160C] rounded-lg border border-[#5A3A1A]">
          <p className="text-sm text-gray-300 mb-2">Your Selection:</p>
          <div className="flex items-center gap-6">
            {selectedBoard && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 grid grid-cols-2 border border-gray-400 rounded overflow-hidden">
                  <div style={{ backgroundColor: boardSchemes[selectedBoard]?.lightSquare }}></div>
                  <div style={{ backgroundColor: boardSchemes[selectedBoard]?.darkSquare }}></div>
                  <div style={{ backgroundColor: boardSchemes[selectedBoard]?.darkSquare }}></div>
                  <div style={{ backgroundColor: boardSchemes[selectedBoard]?.lightSquare }}></div>
                </div>
                <span className="text-sm capitalize">{boardSchemes[selectedBoard]?.name} Board</span>
              </div>
            )}
            {selectedPiece && (
              <div className="flex items-center gap-2">
                <img
                  src={`/assets/chesspieces/${selectedPiece}/wN.svg`}
                  alt=""
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `/assets/chesspieces/${selectedPiece}/wN.png`;
                  }}
                />
                <span className="text-sm capitalize">{pieceSets.find(p => p.id === selectedPiece)?.name} Pieces</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={loading || !selectedBoard || !selectedPiece}
        className={`bg-[#F59E0B] hover:bg-[#d97706] px-24 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300
          ${(loading || !selectedBoard || !selectedPiece) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Saving...</span>
          </div>
        ) : (
          "Confirm & Continue"
        )}
      </button>
    </div>
  );
}