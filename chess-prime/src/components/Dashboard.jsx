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



// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import TimeControlPage from "./controlPage/TimeControlPage";
// import Social from "./pagescomponents/Social";
// import Learn from "./pagescomponents/LearnPage";
// import Puzzles from "./pagescomponents/Puzzles";
// import Playnow from "./pagescomponents/PlayPage";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// // import {  useGame } from "../context/GameContext";

// const addScrollbarStyles = () => {
//   const style = document.createElement("style");
//   style.textContent = `
//     .custom-scrollbar::-webkit-scrollbar {
//       width: 6px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-track {
//       background: transparent;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//       background: #4a4542;
//       border-radius: 3px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: #6a6562;
//     }
//   `;
//   document.head.appendChild(style);
// };

// export default function Dashboard() {
//   const [activeComponent, setActiveComponent] = useState("Play");

//   const [gameState, setGameState] = useState({
//     status: "menu",
//     gameMode: null,
//     timeControl: null,
//     opponent: null,
//     lobbyData: null,
//     players: [],
//   });

//   const navigate = useNavigate();
//   const { user } = useAuth(); // Get user from auth context
//   // const game = useGame(); 

//   useEffect(() => {
//     addScrollbarStyles();
//   }, []);

//   const handleItemClick = (item) => {
//     setActiveComponent(item);

//     if (item === "Play vs Computer") {
//       navigate("/game/vs-computer/10+0");
//     } else if (item === "Game Started" && gameState.gameMode === "online") {
//       navigate(`/game/online/${gameState.timeControl || "10+0"}`);
//     }
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case "Play":
//         return (
//           <TimeControlPage
//             gameState={gameState}
//             setGameState={setGameState}
//             onGameStart={(mode, timeControl) => {
//               setGameState({
//                 ...gameState,
//                 status: "playing",
//                 gameMode: mode,
//                 timeControl: timeControl,
//               });

//               if (mode === "vs-computer") {
//                 navigate(`/game/vs-computer/${timeControl}`);
//               }
//             }}
//           />
//         );

//       case "Puzzles":
//         return <Puzzles />;

//       case "Play Now":
//         return <Playnow />;

//       case "Learn":
//         return <Learn />;

//       case "Social":
//         return <Social />;

//       default:
//         return (
//           <TimeControlPage
//             gameState={gameState}
//             setGameState={setGameState}
//             onGameStart={(mode, timeControl) => {
//               setGameState({
//                 ...gameState,
//                 status: "playing",
//                 gameMode: mode,
//                 timeControl: timeControl,
//               });

//               if (mode === "vs-computer") {
//                 navigate(`/game/vs-computer/${timeControl}`);
//               }
//             }}
//           />
//         );
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
      
//       {/* Sidebar */}
//       <Sidebar
//         activeItem={activeComponent}
//         onItemClick={handleItemClick}
//         gameState={gameState}
//         setGameState={setGameState}
//         currentUser={user} // Pass user to Sidebar
//       />

//       {/* Main Content Area */}
//       <div className="flex-1  h-auto w-full  overflow-hidden">
//         {renderComponent()}
//       </div>

//     </div>
//   );
// }


//testing

// Dashboard.jsx - Add socket status check
// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import TimeControlPage from "./controlPage/TimeControlPage";
// import Social from "./pagescomponents/Social";
// import Learn from "./pagescomponents/LearnPage";
// import Puzzles from "./pagescomponents/Puzzles";
// import Playnow from "./pagescomponents/PlayPage";
// import { useNavigate } from "react-router-dom";
// import { useGame } from "../context/GameContext"; // Add this import
// import { useAuth } from "../context/AuthContext";

// const addScrollbarStyles = () => {
//   const style = document.createElement("style");
//   style.textContent = `
//     .custom-scrollbar::-webkit-scrollbar {
//       width: 6px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-track {
//       background: transparent;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//       background: #4a4542;
//       border-radius: 3px;
//     }
//     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//       background: #6a6562;
//     }
    
//     /* Mobile menu toggle button */
//     .mobile-menu-btn {
//       display: none;
//       position: fixed;
//       top: 1rem;
//       left: 1rem;
//       z-index: 60;
//       background: #2b2623;
//       border: 1px solid #4a4542;
//       border-radius: 0.5rem;
//       padding: 0.5rem;
//       color: white;
//       cursor: pointer;
//     }
    
//     /* Mobile responsive styles */
//     @media (max-width: 768px) {
//       .mobile-menu-btn {
//         display: block;
//       }
      
//       .sidebar {
//         position: fixed;
//         left: -100%;
//         transition: left 0.3s ease-in-out;
//         z-index: 50;
//         height: 100vh;
//         width: 280px;
//       }
      
//       .sidebar.open {
//         left: 0;
//       }
      
//       .main-content {
//         margin-left: 0 !important;
//         width: 100% !important;
//         padding-top: 4rem;
//       }
      
//       /* Overlay for mobile when sidebar is open */
//       .sidebar-overlay {
//         display: none;
//         position: fixed;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background: rgba(0, 0, 0, 0.5);
//         z-index: 45;
//       }
      
//       .sidebar-overlay.active {
//         display: block;
//       }
//     }
//   `;
//   document.head.appendChild(style);
// };

// // export default function Dashboard() {
// //   const [activeComponent, setActiveComponent] = useState("Play");
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [isMobileView, setIsMobileView] = useState(false);

// //   const [gameState, setGameState] = useState({
// //     status: "menu",
// //     gameMode: null,
// //     timeControl: null,
// //     opponent: null,
// //     lobbyData: null,
// //     players: [],
// //   });

// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     addScrollbarStyles();

// //     // Check if mobile view on mount and resize
// //     const checkMobileView = () => {
// //       setIsMobileView(window.innerWidth <= 768);
// //     };
    
// //     checkMobileView();
// //     window.addEventListener('resize', checkMobileView);
    
// //     return () => window.removeEventListener('resize', checkMobileView);
// //   }, []);

// //   const handleItemClick = (item) => {
// //     setActiveComponent(item);
    
// //     // Only close mobile menu if the clicked item is NOT "Play"
// //     // This way the TimeControlPage can render and show options
// //     if (item !== "Play") {
// //       setIsMobileMenuOpen(false);
// //     }

// //     if (item === "Play vs Computer") {
// //       navigate("/game/vs-computer/10+0");
// //     } else if (item === "Game Started" && gameState.gameMode === "online") {
// //       navigate(`/game/online/${gameState.timeControl || "10+0"}`);
// //     }
// //   };

// //   // Separate function to handle closing the menu
// //   const closeMobileMenu = () => {
// //     setIsMobileMenuOpen(false);
// //   };

// //   const renderComponent = () => {
// //     switch (activeComponent) {
// //       case "Play":
// //         return (
// //           <TimeControlPage
// //             gameState={gameState}
// //             setGameState={setGameState}
// //             onGameStart={(mode, timeControl) => {
// //               setGameState({
// //                 ...gameState,
// //                 status: "playing",
// //                 gameMode: mode,
// //                 timeControl: timeControl,
// //               });

// //               if (mode === "vs-computer") {
// //                 navigate(`/game/vs-computer/${timeControl}`);
// //               }
              
// //               // Close mobile menu when game actually starts
// //               if (isMobileView) {
// //                 closeMobileMenu();
// //               }
// //             }}
// //           />
// //         );

// //       case "Puzzles":
// //         return <Puzzles />;

// //       case "Play Now":
// //         return <Playnow />;

// //       case "Learn":
// //         return <Learn />;

// //       case "Social":
// //         return <Social />;

// //       default:
// //         return (
// //           <TimeControlPage
// //             gameState={gameState}
// //             setGameState={setGameState}
// //             onGameStart={(mode, timeControl) => {
// //               setGameState({
// //                 ...gameState,
// //                 status: "playing",
// //                 gameMode: mode,
// //                 timeControl: timeControl,
// //               });

// //               if (mode === "vs-computer") {
// //                 navigate(`/game/vs-computer/${timeControl}`);
// //               }
              
// //               // Close mobile menu when game actually starts
// //               if (isMobileView) {
// //                 closeMobileMenu();
// //               }
// //             }}
// //           />
// //         );
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
      
// //       {/* Mobile Menu Button */}
// //       <button 
// //         className="mobile-menu-btn"
// //         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //       >
// //         <svg 
// //           xmlns="http://www.w3.org/2000/svg" 
// //           className="h-6 w-6" 
// //           fill="none" 
// //           viewBox="0 0 24 24" 
// //           stroke="currentColor"
// //         >
// //           {isMobileMenuOpen ? (
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// //           ) : (
// //             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
// //           )}
// //         </svg>
// //       </button>

// //       {/* Overlay for mobile */}
// //       {isMobileView && (
// //         <div 
// //           className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
// //           onClick={closeMobileMenu}
// //         />
// //       )}

// //       {/* Sidebar with mobile classes */}
// //       <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
// //         <Sidebar
// //           activeItem={activeComponent}
// //           onItemClick={handleItemClick}
// //           gameState={gameState}
// //           setGameState={setGameState}
// //         />
// //       </div>

// //       {/* Main Content Area */}
// //       <div className="flex-1 h-auto w-full overflow-hidden main-content">
// //         {renderComponent()}
// //       </div>

// //     </div>
// //   );
// // }
// // src/components/Dashboard.jsx
// // import React, { useState, useEffect } from "react";
// // import Sidebar from "./Sidebar";
// // import TimeControlPage from "./controlPage/TimeControlPage";
// // import Social from "./pagescomponents/Social";
// // import Learn from "./pagescomponents/LearnPage";
// // import Puzzles from "./pagescomponents/Puzzles";
// // import Playnow from "./pagescomponents/PlayPage";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// // const addScrollbarStyles = () => {
// //   const style = document.createElement("style");
// //   style.textContent = `
// //     .custom-scrollbar::-webkit-scrollbar {
// //       width: 6px;
// //     }
// //     .custom-scrollbar::-webkit-scrollbar-track {
// //       background: transparent;
// //     }
// //     .custom-scrollbar::-webkit-scrollbar-thumb {
// //       background: #4a4542;
// //       border-radius: 3px;
// //     }
// //     .custom-scrollbar::-webkit-scrollbar-thumb:hover {
// //       background: #6a6562;
// //     }
// //   `;
// //   document.head.appendChild(style);
// // };

// // export default function Dashboard() {
// //   const [activeComponent, setActiveComponent] = useState("Play");
// //   const [gameState, setGameState] = useState({
// //     status: "menu",
// //     gameMode: null,
// //     timeControl: null,
// //     opponent: null,
// //     lobbyData: null,
// //     players: [],
// //   });

// //   const navigate = useNavigate();
// //   const { user, isLoading } = useAuth();

// //   useEffect(() => {
// //     addScrollbarStyles();
// //     console.log("Dashboard - Current user:", user);
// //     console.log("Dashboard - Auth loading:", isLoading);
// //   }, [user, isLoading]);

// //   const handleItemClick = (item) => {
// //     setActiveComponent(item);

// //     if (item === "Play vs Computer") {
// //       navigate("/game/vs-computer/10+0");
// //     } else if (item === "Game Started" && gameState.gameMode === "online") {
// //       navigate(`/game/online/${gameState.timeControl || "10+0"}`);
// //     }
// //   };

// //   const renderComponent = () => {
// //     switch (activeComponent) {
// //       case "Play":
// //         return (
// //           <TimeControlPage
// //             gameState={gameState}
// //             setGameState={setGameState}
// //             onGameStart={(mode, timeControl) => {
// //               setGameState({
// //                 ...gameState,
// //                 status: "playing",
// //                 gameMode: mode,
// //                 timeControl: timeControl,
// //               });

// //               if (mode === "vs-computer") {
// //                 navigate(`/game/vs-computer/${timeControl}`);
// //               }
// //             }}
// //           />
// //         );

// //       case "Puzzles":
// //         return <Puzzles />;

// //       case "Play Now":
// //         return <Playnow />;

// //       case "Learn":
// //         return <Learn />;

// //       case "Social":
// //         return <Social />;

// //       default:
// //         return (
// //           <TimeControlPage
// //             gameState={gameState}
// //             setGameState={setGameState}
// //             onGameStart={(mode, timeControl) => {
// //               setGameState({
// //                 ...gameState,
// //                 status: "playing",
// //                 gameMode: mode,
// //                 timeControl: timeControl,
// //               });

// //               if (mode === "vs-computer") {
// //                 navigate(`/game/vs-computer/${timeControl}`);
// //               }
// //             }}
// //           />
// //         );
// //     }
// //   };

// //   // Show loading state while auth is loading
// //   if (isLoading) {
// //     return (
// //       <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
// //           <p className="text-gray-400">Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
// //       <Sidebar
// //         activeItem={activeComponent}
// //         onItemClick={handleItemClick}
// //         gameState={gameState}
// //         setGameState={setGameState}
// //         currentUser={user}
// //       />
// //       <div className="flex-1 h-auto w-full overflow-hidden">
// //         {renderComponent()}
// //       </div>
// //     </div>
// //   );
// // }


// export default function Dashboard() {
//   const [activeComponent, setActiveComponent] = useState("Play");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobileView, setIsMobileView] = useState(false);
//   const [gameState, setGameState] = useState({
//     status: "menu",
//     gameMode: null,
//     timeControl: null,
//     opponent: null,
//     lobbyData: null,
//     players: [],
//   });

//   const navigate = useNavigate();
//   const { user, loading: authLoading } = useAuth();
//   const { loading: gameLoading } = useGame(); // Test if GameContext is available

//   // Debug log to verify contexts
//   useEffect(() => {
//     console.log('📊 Dashboard mounted - Checking contexts:', {
//       authAvailable: !!user,
//       authLoading,
//       gameAvailable: !gameLoading, // This will error if GameContext not available
//     });
//   }, [user, authLoading, gameLoading]);

//   useEffect(() => {
//     addScrollbarStyles();

//     const checkMobileView = () => {
//       setIsMobileView(window.innerWidth <= 768);
//     };
    
//     checkMobileView();
//     window.addEventListener('resize', checkMobileView);
    
//     return () => window.removeEventListener('resize', checkMobileView);
//   }, []);

//   // Redirect to login if not authenticated
//   useEffect(() => {
//     if (!authLoading && !user) {
//       navigate('/login');
//     }
//   }, [user, authLoading, navigate]);

//   const handleItemClick = (item) => {
//     setActiveComponent(item);
    
//     if (item !== "Play") {
//       setIsMobileMenuOpen(false);
//     }

//     if (item === "Play vs Computer") {
//       navigate("/game/vs-computer/10+0");
//     } else if (item === "Game Started" && gameState.gameMode === "online") {
//       navigate(`/game/online/${gameState.timeControl || "10+0"}`);
//     }
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case "Play":
//         return (
//           <TimeControlPage
//             gameState={gameState}
//             setGameState={setGameState}
//             onGameStart={(mode, timeControl) => {
//               setGameState({
//                 ...gameState,
//                 status: "playing",
//                 gameMode: mode,
//                 timeControl: timeControl,
//               });

//               if (mode === "vs-computer") {
//                 navigate(`/game/vs-computer/${timeControl}`);
//               }
              
//               if (isMobileView) {
//                 closeMobileMenu();
//               }
//             }}
//           />
//         );

//       case "Puzzles":
//         return <Puzzles />;

//       case "Play Now":
//         return <Playnow />;

//       case "Learn":
//         return <Learn />;

//       case "Social":
//         return <Social />;

//       default:
//         return (
//           <TimeControlPage
//             gameState={gameState}
//             setGameState={setGameState}
//             onGameStart={(mode, timeControl) => {
//               setGameState({
//                 ...gameState,
//                 status: "playing",
//                 gameMode: mode,
//                 timeControl: timeControl,
//               });

//               if (mode === "vs-computer") {
//                 navigate(`/game/vs-computer/${timeControl}`);
//               }
              
//               if (isMobileView) {
//                 closeMobileMenu();
//               }
//             }}
//           />
//         );
//     }
//   };

//   // Show loading state
//   if (authLoading) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#0b0502] to-[#2b2623]">
//         <div className="text-white text-xl">Loading...</div>
//       </div>
//     );
//   }

//   // Don't render dashboard if not authenticated
//   if (!user) {
//     return null;
//   }

//   return (
//     <>
//       <ContextDebug /> {/* Add debug component to see context status */}
//       <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
        
//         {/* Mobile Menu Button */}
//         <button 
//           className="mobile-menu-btn"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//         >
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-6 w-6" 
//             fill="none" 
//             viewBox="0 0 24 24" 
//             stroke="currentColor"
//           >
//             {isMobileMenuOpen ? (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>

//         {/* Overlay for mobile */}
//         {isMobileView && (
//           <div 
//             className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
//             onClick={closeMobileMenu}
//           />
//         )}

//         {/* Sidebar with mobile classes */}
//         <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
//           <Sidebar
//             activeItem={activeComponent}
//             onItemClick={handleItemClick}
//             gameState={gameState}
//             setGameState={setGameState}
//           />
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 h-auto w-full overflow-hidden main-content">
//           {renderComponent()}
//         </div>

//       </div>
//     </>
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
import { useAuth } from "../context/AuthContext"; // ✅ THIS IMPORT WAS MISSING

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
    
    .mobile-menu-btn {
      display: none;
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 60;
      background: #2b2623;
      border: 1px solid #4a4542;
      border-radius: 0.5rem;
      padding: 0.5rem;
      color: white;
      cursor: pointer;
    }
    
    @media (max-width: 768px) {
      .mobile-menu-btn {
        display: block;
      }
      
      .sidebar {
        position: fixed;
        left: -100%;
        transition: left 0.3s ease-in-out;
        z-index: 50;
        height: 100vh;
        width: 280px;
      }
      
      .sidebar.open {
        left: 0;
      }
      
      .main-content {
        margin-left: 0 !important;
        width: 100% !important;
        padding-top: 4rem;
      }
      
      .sidebar-overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 45;
      }
      
      .sidebar-overlay.active {
        display: block;
      }
    }
  `;
  document.head.appendChild(style);
};

export default function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Play");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [gameState, setGameState] = useState({
    status: "menu",
    gameMode: null,
    timeControl: null,
    opponent: null,
    lobbyData: null,
    players: [],
  });

  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth(); // ✅ Now useAuth is defined

  useEffect(() => {
    addScrollbarStyles();

    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('No user found, redirecting to login');
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  const handleItemClick = (item) => {
    setActiveComponent(item);
    
    if (item !== "Play") {
      setIsMobileMenuOpen(false);
    }

    if (item === "Play vs Computer") {
      navigate("/game/vs-computer/10+0");
    } else if (item === "Game Started" && gameState.gameMode === "online") {
      navigate(`/game/online/${gameState.timeControl || "10+0"}`);
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
              
              if (isMobileView) {
                closeMobileMenu();
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
              
              if (isMobileView) {
                closeMobileMenu();
              }
            }}
          />
        );
    }
  };

  // Show loading state
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-[#0b0502] to-[#2b2623]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
      
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isMobileView && (
        <div 
          className={`sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar with mobile classes */}
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <Sidebar
          activeItem={activeComponent}
          onItemClick={handleItemClick}
          gameState={gameState}
          setGameState={setGameState}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-auto w-full overflow-hidden main-content">
        {renderComponent()}
      </div>

    </div>
  );
}