// components/ChessExperience.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import knight from "../assets/horse.png";
import pawn from "../assets/pawn.png";
import knightIcon from "../assets/horse.png";
import rook from "../assets/queen.png";
import queen from "../assets/king.png";

const ChessExperience = () => {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user, updateChessExperience } = useAuth();

  const options = [
    { id: 1, text: "I don't know how to play", icon: pawn },
    { id: 2, text: "I know the rules and basics", icon: knightIcon },
    { id: 3, text: "I know Strategies and Tactics", icon: rook },
    { id: 4, text: "I'm a tournament player", icon: queen },
  ];

  useEffect(() => {
    // If user already has experience, redirect to dashboard
    if (user?.chessExperience) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleContinue = async () => {
    if (!selected) return;
    
    try {
      setSaving(true);
      await updateChessExperience(selected);
      navigate("/dashboard");
    } catch (error) {
      console.error('Failed to save chess experience:', error);
      alert('Failed to save your experience. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#140a03] relative flex flex-col items-center justify-center px-4">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 text-white z-20"
      >
        <ArrowLeft size={26} />
      </button>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[650px] h-[650px] bg-[#FFA200] opacity-20 rounded-full blur-[170px]" />
      </div>

      <div className="relative z-10 w-full max-w-[520px] text-center">
        <img
          src={knight}
          className="w-56 md:w-72 mx-auto object-contain mb-2"
          alt="Chess knight"
        />

        <h1 className="text-white text-2xl md:text-3xl font-semibold mb-6">
          What is Your Chess Experience?
        </h1>

        <div className="space-y-3">
          {options.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelected(item.id)}
              className={`
                flex items-center gap-4 border rounded-full px-6 py-3
                cursor-pointer transition-all
                hover:border-[#FFA200] hover:bg-[#FFA200]/5
                ${
                  selected === item.id
                    ? "border-[#FFA200] bg-[#FFA200]/10"
                    : "border-[#FFA200]/60"
                }
              `}
            >
              <img
                src={item.icon}
                className="w-8 h-8 object-contain"
                alt=""
              />

              <span className="text-gray-300 text-base text-left flex-1">
                {item.text}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={!selected || saving}
          className={`
            mt-6 w-full bg-[#FFA200] text-white py-3 rounded-full
            text-lg font-semibold hover:bg-[#e69500]
            transition shadow-lg shadow-[#FFA200]/40
            ${(!selected || saving) ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {saving ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default ChessExperience;

// import React, { useState, useEffect } from "react";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import knight from "../assets/horse.png";
// import pawn from "../assets/pawn.png";
// import knightIcon from "../assets/horse.png";
// import rook from "../assets/queen.png";
// import queen from "../assets/king.png";

// const ChessExperience = () => {
//   const [selected, setSelected] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const navigate = useNavigate();
//   const { user, updateChessExperience } = useAuth();

//   const options = [
//     { id: 1, text: "I don't know how to play", icon: pawn },
//     { id: 2, text: "I know the rules and basics", icon: knightIcon },
//     { id: 3, text: "I know Strategies and Tactics", icon: rook },
//     { id: 4, text: "I'm a tournament player", icon: queen },
//   ];

//   useEffect(() => {
//     // If user already has experience, redirect to dashboard
//     if (user?.chessExperience) {
//       navigate("/dashboard");
//     }
//   }, [user, navigate]);

//   const handleContinue = async () => {
//     if (!selected) return;
    
//     try {
//       setSaving(true);
//       await updateChessExperience(selected);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error('Failed to save chess experience:', error);
//       alert('Failed to save your experience. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#140a03] relative flex flex-col items-center justify-center px-4">
//       <button
//         onClick={() => navigate(-1)}
//         className="absolute top-6 left-6 text-white z-20"
//       >
//         <ArrowLeft size={26} />
//       </button>

//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="w-[650px] h-[650px] bg-[#FFA200] opacity-20 rounded-full blur-[170px]" />
//       </div>

//       <div className="relative z-10 w-full max-w-[520px] text-center">
//         <img
//           src={knight}
//           className="w-56 md:w-72 mx-auto object-contain mb-2"
//           alt="Chess knight"
//         />

//         <h1 className="text-white text-2xl md:text-3xl font-semibold mb-6">
//           What is Your Chess Experience?
//         </h1>

//         <div className="space-y-3">
//           {options.map((item) => (
//             <div
//               key={item.id}
//               onClick={() => setSelected(item.id)}
//               className={`
//                 flex items-center gap-4 border rounded-full px-6 py-3
//                 cursor-pointer transition-all
//                 hover:border-[#FFA200] hover:bg-[#FFA200]/5
//                 ${
//                   selected === item.id
//                     ? "border-[#FFA200] bg-[#FFA200]/10"
//                     : "border-[#FFA200]/60"
//                 }
//               `}
//             >
//               <img
//                 src={item.icon}
//                 className="w-8 h-8 object-contain"
//                 alt=""
//               />

//               <span className="text-gray-300 text-base text-left flex-1">
//                 {item.text}
//               </span>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={handleContinue}
//           disabled={!selected || saving}
//           className={`
//             mt-6 w-full bg-[#FFA200] text-white py-3 rounded-full
//             text-lg font-semibold hover:bg-[#e69500]
//             transition shadow-lg shadow-[#FFA200]/40
//             ${(!selected || saving) ? "opacity-50 cursor-not-allowed" : ""}
//           `}
//         >
//           {saving ? 'Saving...' : 'Continue'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChessExperience;