// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import TimeControlPage from "./controlPage/TimeControlPage";
// import Social from "./pagescomponents/Social";

// const addScrollbarStyles = () => {

//   const style = document.createElement("style");

//   style.textContent = `

//   .custom-scrollbar::-webkit-scrollbar {

//     width: 6px;

//   }

//   .custom-scrollbar::-webkit-scrollbar-track {

//     background: transparent;

//   }

//   .custom-scrollbar::-webkit-scrollbar-thumb {

//     background: #4a4542;

//     border-radius: 3px;

//   }

//   .custom-scrollbar::-webkit-scrollbar-thumb:hover {

//     background: #6a6562;

//   }

//   `;

//   document.head.appendChild(style);

// };


// export default function Dashboard() {

//   const [activeComponent, setActiveComponent] = useState("Social");


//   useEffect(() => {

//     addScrollbarStyles();

//   }, []);


//   const renderComponent = () => {

//     switch (activeComponent) {

//       case "Social":

//         return <Social />;

//       default:

//         return <TimeControlPage />;

//     }

//   };


//   return (

//     <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">

//       <Sidebar

//         activeItem={activeComponent}

//         onItemClick={setActiveComponent}

//       />


//       {renderComponent()}

//     </div>

//   );

// }



import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import TimeControlPage from "./controlPage/TimeControlPage";
import Social from "./pagescomponents/Social";
import Learn from "./pagescomponents/LearnPage";
import Puzzles from "./pagescomponents/Puzzles";
import Playnow from "./pagescomponents/PlayPage";
import { useNavigate } from "react-router-dom";

const addScrollbarStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 6px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: #4a4542;
      border-radius: 3px;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background: #6a6562;
    }
  `;
  document.head.appendChild(style);
};

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Play");

  const [gameState, setGameState] = useState({
    status: "menu",
    gameMode: null,
    timeControl: null,
    opponent: null,
    lobbyData: null,
    players: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    addScrollbarStyles();
  }, []);

  const handleItemClick = (item) => {
    setActiveComponent(item);

    if (item === "Play vs Computer") {
      navigate("/game/vs-computer/10+0");
    } else if (item === "Game Started" && gameState.gameMode === "online") {
      navigate(`/game/online/${gameState.timeControl || "10+0"}`);
    }
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Play":
        return (
          <TimeControlPage
            gameState={gameState}
            setGameState={setGameState}
            onGameStart={(mode, timeControl) => {
              setGameState({
                ...gameState,
                status: "playing",
                gameMode: mode,
                timeControl: timeControl,
              });

              if (mode === "vs-computer") {
                navigate(`/game/vs-computer/${timeControl}`);
              }
            }}
          />
        );

      case "Puzzles":
        return <Puzzles />;

      case "Play Now":
        return <Playnow />;

      case "Learn":
        return <Learn />;

      case "Social":
        return <Social />;

      default:
        return (
          <TimeControlPage
            gameState={gameState}
            setGameState={setGameState}
            onGameStart={(mode, timeControl) => {
              setGameState({
                ...gameState,
                status: "playing",
                gameMode: mode,
                timeControl: timeControl,
              });

              if (mode === "vs-computer") {
                navigate(`/game/vs-computer/${timeControl}`);
              }
            }}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar
        activeItem={activeComponent}
        onItemClick={handleItemClick}
        gameState={gameState}
        setGameState={setGameState}
      />

      {/* Main Content Area */}
      <div className="flex-1 h-full w-full  overflow-hidden">
        {renderComponent()}
      </div>

    </div>
  );
}