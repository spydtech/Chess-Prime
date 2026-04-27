// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";

// // Add custom scrollbar styles
// const addScrollbarStyles = () => {
//   const style = document.createElement('style');
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

// export default function DashboardLayout({ children }) {
//   useEffect(() => {
//     addScrollbarStyles();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
//       <Sidebar />
//       {children}
//     </div>
//   );
// }





// import React, { useEffect } from "react";
// import Sidebar from "./Sidebar";

// // Add custom scrollbar styles
// const addScrollbarStyles = () => {
//   const style = document.createElement('style');
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

// export default function DashboardLayout({ children }) {
//   useEffect(() => {
//     addScrollbarStyles();
//   }, []);

//   return (
//     <div className="flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden">
//       <Sidebar />
//       <div className="flex-1 overflow-y-auto h-full">
//         {children}
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import TimeControlPage from "./controlPage/TimeControlPage";
import Social from "./pagescomponents/Social";
import Learn from "./pagescomponents/LearnPage";
import Puzzles from "./pagescomponents/Puzzles";
import Playnow from "./pagescomponents/PlayPage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const addScrollbarStyles = () => {
  const style = document.createElement("style");
  style.textContent = `
    /* Custom scrollbar styles */
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
    
    /* Prevent body from scrolling completely */
    body {
      overscroll-behavior: none;
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
    }
    
    /* Main container - prevent scroll chaining */
    .dashboard-container {
      overscroll-behavior: none;
      position: relative;
    }
    
    /* Sidebar scroll - controlled */
    .sidebar {
      overscroll-behavior: contain;
    }
    
    /* Main content scroll - controlled */
    .main-content-scroll {
      overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
    }
    
    /* Mobile menu button */
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
    
    /* Prevent pull-to-refresh on touch devices */
    * {
      touch-action: pan-x pan-y;
    }
    
    /* Mobile specific styles */
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
        overscroll-behavior: contain;
        overflow-y: auto;
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

    /* Desktop styles */
    @media (min-width: 769px) {
      .main-content-scroll {
        height: 100vh;
        overflow-y: auto;
        overflow-x: hidden;
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
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    addScrollbarStyles();

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
      // Restore body scroll on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      console.log('No user found, redirecting to login');
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Prevent scroll on touch move for the whole container
  const handleContainerTouchMove = useCallback((e) => {
    // Prevent default only if needed
    const target = e.target;
    const isScrollable = target.closest('.main-content-scroll, .sidebar');
    
    if (!isScrollable) {
      e.preventDefault();
    }
  }, []);

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
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#0b0502] to-[#2b2623]">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render dashboard if not authenticated
  if (!user) {
    return null;
  }

  return (
    <div 
      className="dashboard-container flex h-screen bg-gradient-to-r from-[#0b0502] to-[#2b2623] text-white overflow-hidden"
      onTouchMove={handleContainerTouchMove}
    >
      
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

      {/* Main Content Area - Fixed scrolling */}
      <div className="flex-1 h-full w-full overflow-hidden main-content">
        <div className="main-content-scroll h-full w-full overflow-y-auto overflow-x-hidden">
          {renderComponent()}
        </div>
      </div>

    </div>
  );
}