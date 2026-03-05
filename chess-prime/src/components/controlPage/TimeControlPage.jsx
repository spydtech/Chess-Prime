// // import React, { useState, useEffect } from "react";
// // import {
// //   Zap,
// //   Clock,
// //   Hourglass,
// //   Trophy,
// //   Users,
// //   Swords,
// //   Bot,
// //   ArrowLeft,
// // } from "lucide-react";
// // import { useNavigate, useLocation } from "react-router-dom";

// // function Card({ icon, title, time, players, onClick }) {
// //   return (
// //     <div 
// //       onClick={onClick}
// //       className="bg-[#120b06] border border-amber-500/30 rounded-xl p-5 hover:border-amber-400 hover:bg-amber-500/5 cursor-pointer transition-all group"
// //     >
// //       <div className="flex items-center gap-2 text-amber-400">
// //         {icon}
// //         <span className="font-semibold text-sm tracking-wide">{title} {time}</span>
// //       </div>

// //       <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
// //         <Users size={12} />
// //         <span>{players} playing now</span>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function TimeControlPage({ gameState, setGameState, onGameStart }) {
// //   const location = useLocation();
// //   const tabs = ["Quick playing", "Lobby", "Correspondence", "Message"];
// //   const [activeTab, setActiveTab] = useState("Quick playing");
// //   const [gameMode, setGameMode] = useState(location.state?.gameMode || 'online');
// //   const navigate = useNavigate();

// //   const sections = [
// //     {
// //       title: "Bullet",
// //       icon: <Zap size={16} />,
// //       description: "trains reflexes and intuitions",
// //       items: ["1+0", "2+1", "3+0"],
// //       players: [345, 166, 166]
// //     },
// //     {
// //       title: "Blitz",
// //       icon: <Clock size={16} />,
// //       description: "sharpens tactical awareness",
// //       items: ["3+2", "5+0", "5+3"],
// //       players: [525, 505, 455]
// //     },
// //     {
// //       title: "Rapid",
// //       icon: <Hourglass size={16} />,
// //       description: "builds positional understanding",
// //       items: ["10+0", "15+10", "20+0"],
// //       players: [225, 185, 85]
// //     },
// //     {
// //       title: "Classic",
// //       icon: <Trophy size={16} />,
// //       description: "tests deep strategic thinking",
// //       items: ["30+0", "60+0", "90+30"],
// //       players: [145, 85, 85]
// //     },
// //   ];

// //   const generateLobbyCode = () => {
// //     return Math.random().toString(36).substring(2, 8).toUpperCase();
// //   };

// //   const handleCardClick = (timeControl) => {
// //     // Generate lobby data
// //     const lobbyData = {
// //       lobbyCode: generateLobbyCode(),
// //       gameType: gameMode,
// //       timeControl: timeControl,
// //       isPrivate: false,
// //       createdAt: new Date().toISOString(),
// //       players: [
// //         { 
// //           id: 'current-user', 
// //           name: 'You', 
// //           rating: 1450,
// //           ready: gameMode === 'vs-computer' ? true : false 
// //         }
// //       ],
// //       status: gameMode === 'online' ? 'waiting' : 'ready'
// //     };

// //     // If playing vs computer, add computer player
// //     if (gameMode === 'vs-computer') {
// //       lobbyData.players.push({
// //         id: 'computer',
// //         name: 'Computer',
// //         rating: 1500,
// //         ready: true,
// //         isComputer: true
// //       });
// //       lobbyData.status = 'ready';
// //     }

// //     // Update game state with lobby data
// //     if (setGameState) {
// //       setGameState({
// //         ...gameState,
// //         gameMode: gameMode,
// //         timeControl: timeControl,
// //         status: gameMode === 'online' ? 'lobby' : 'playing',
// //         lobbyData: lobbyData,
// //         players: lobbyData.players
// //       });
// //     }

// //     // Call onGameStart callback if provided
// //     if (onGameStart) {
// //       onGameStart({
// //         gameMode: gameMode,
// //         timeControl: timeControl,
// //         lobbyData: lobbyData
// //       });
// //     }

// //     // Navigate based on game mode
// //     if (gameMode === 'vs-computer') {
// //       navigate(`/game/vs-computer/${timeControl}`, { 
// //         state: { lobbyData: lobbyData } 
// //       });
// //     } else {
// //       // For online mode, go back to sidebar which will show the lobby modal
// //       navigate({ 
// //         state: { 
// //           lobbyData: lobbyData,
// //           showLobby: true 
// //         } 
// //       });
// //     }
// //   };

// //   const handleJoinLobby = (lobby) => {
// //     if (setGameState) {
// //       setGameState({
// //         ...gameState,
// //         status: 'lobby',
// //         lobbyData: lobby,
// //         players: lobby.players
// //       });
// //     }
// //     navigate( { state: { lobbyData: lobby } });
// //   };

// //   // Sample lobbies data
// //   const availableLobbies = [
// //     {
// //       id: 1,
// //       lobbyCode: 'ABCD12',
// //       gameType: 'online',
// //       timeControl: '10+0',
// //       players: [
// //         { name: 'Player1', rating: 1400, ready: true },
// //         { name: 'Player2', rating: 1350, ready: false }
// //       ]
// //     },
// //     {
// //       id: 2,
// //       lobbyCode: 'EFGH34',
// //       gameType: 'online',
// //       timeControl: '5+0',
// //       players: [
// //         { name: 'Player3', rating: 1600, ready: true }
// //       ]
// //     },
// //     {
// //       id: 3,
// //       lobbyCode: 'IJKL56',
// //       gameType: 'online',
// //       timeControl: '3+2',
// //       players: [
// //         { name: 'Player4', rating: 1550, ready: true },
// //         { name: 'Player5', rating: 1500, ready: true }
// //       ]
// //     }
// //   ];

// //   return (
// //     <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#0f0703]">
// //       {/* Back Button */}
// //       <div className="pt-4 px-10">
// //         <button
// //           onClick={() => navigate('/')}
// //           className="flex items-center gap-2 text-gray-400 hover:text-white transition"
// //         >
// //           <ArrowLeft size={18} />
// //           <span>Back</span>
// //         </button>
// //       </div>

// //       {/* Fixed Header Section */}
// //       <div className="pt-4 pb-4 px-10">
// //         <h1 className="text-4xl font-bold text-center">
// //           Choose your <span className="text-amber-400">Time Control</span>
// //         </h1>

// //         <p className="text-center text-gray-400 mt-2 text-lg">
// //           Select your Game mode and start playing instantly
// //         </p>

// //         {/* Game Mode Toggle */}
// //         <div className="flex justify-center mt-6 gap-4">
// //           <button
// //             onClick={() => setGameMode('online')}
// //             className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
// //               gameMode === 'online' 
// //                 ? 'bg-amber-500 text-black' 
// //                 : 'bg-[#2a1a13] text-gray-400 hover:text-white'
// //             }`}
// //           >
// //             <Swords size={18} />
// //             Play Online
// //           </button>
// //           <button
// //             onClick={() => setGameMode('vs-computer')}
// //             className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
// //               gameMode === 'vs-computer' 
// //                 ? 'bg-amber-500 text-black' 
// //                 : 'bg-[#2a1a13] text-gray-400 hover:text-white'
// //             }`}
// //           >
// //             <Bot size={18} />
// //             vs Computer
// //           </button>
// //         </div>

// //         {/* TABS */}
// //         <div className="flex justify-center mt-8">
// //           <div className="bg-[#2a2522] rounded-full p-1.5 flex gap-1">
// //             {tabs.map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`px-6 py-2.5 rounded-full text-base font-medium transition ${
// //                   activeTab === tab
// //                     ? "bg-black text-amber-400"
// //                     : "text-gray-400 hover:text-white"
// //                 }`}
// //               >
// //                 {tab}
// //               </button>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Active Tab Content Indicator */}
// //         {activeTab === "Lobby" && (
// //           <div className="mt-4 text-center">
// //             <p className="text-amber-400 text-sm">
// //               Browse available lobbies or create your own
// //             </p>
// //           </div>
// //         )}
// //       </div>

// //       {/* Scrollable Cards Section */}
// //       <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
// //         <div className="max-w-4xl mx-auto space-y-8">
// //           {activeTab === "Quick playing" && (
// //             // Show time control cards for Quick playing
// //             sections.map((section) => (
// //               <div key={section.title}>
// //                 <p className="text-gray-400 mb-4 text-base font-medium">
// //                   {section.title} • {section.description}
// //                 </p>

// //                 <div className="grid md:grid-cols-3 gap-4">
// //                   {section.items.map((item, idx) => (
// //                     <Card
// //                       key={item}
// //                       icon={section.icon}
// //                       title={section.title}
// //                       time={item}
// //                       players={section.players[idx]}
// //                       onClick={() => handleCardClick(item)}
// //                     />
// //                   ))}
// //                 </div>
// //               </div>
// //             ))
// //           )}

// //           {activeTab === "Lobby" && (
// //             // Show available lobbies
// //             <div className="space-y-4">
// //               <div className="flex justify-between items-center">
// //                 <h3 className="text-white text-lg font-semibold">Available Lobbies</h3>
// //                 <button
// //                   onClick={() => {
// //                     // Create new lobby with default settings
// //                     const newLobby = {
// //                       lobbyCode: generateLobbyCode(),
// //                       gameType: 'online',
// //                       timeControl: '10+0',
// //                       isPrivate: false,
// //                       players: [{ name: 'You', rating: 1450, ready: true }]
// //                     };
// //                     handleJoinLobby(newLobby);
// //                   }}
// //                   className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
// //                 >
// //                   <Swords size={16} />
// //                   Create New Lobby
// //                 </button>
// //               </div>
              
// //               <div className="grid gap-4">
// //                 {availableLobbies.map((lobby) => (
// //                   <div 
// //                     key={lobby.id}
// //                     className="bg-[#120b06] border border-amber-500/30 rounded-lg p-4 hover:border-amber-400 cursor-pointer transition-all"
// //                     onClick={() => handleJoinLobby(lobby)}
// //                   >
// //                     <div className="flex justify-between items-center mb-2">
// //                       <div className="flex items-center gap-2">
// //                         <span className="text-amber-400 font-mono font-bold">{lobby.lobbyCode}</span>
// //                         <span className="text-gray-500 text-xs">•</span>
// //                         <span className="text-gray-400 text-sm">{lobby.timeControl}</span>
// //                       </div>
// //                       <span className="text-gray-400 text-sm">
// //                         {lobby.players.length}/2 players
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center justify-between">
// //                       <div className="flex items-center gap-2">
// //                         {lobby.players.map((player, idx) => (
// //                           <div key={idx} className="flex items-center gap-1">
// //                             <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
// //                               <span className="text-amber-400 text-xs">
// //                                 {player.name.charAt(0)}
// //                               </span>
// //                             </div>
// //                             <span className="text-gray-300 text-sm">{player.rating}</span>
// //                           </div>
// //                         ))}
// //                         {lobby.players.length < 2 && (
// //                           <span className="text-gray-500 text-sm ml-2">(Waiting...)</span>
// //                         )}
// //                       </div>
// //                       <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded text-sm font-medium">
// //                         Join
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === "Correspondence" && (
// //             <div className="text-center text-gray-400 py-10">
// //               <p className="text-lg">Correspondence games appear here</p>
// //               <p className="text-sm mt-2">Play games over days or weeks</p>
// //             </div>
// //           )}

// //           {activeTab === "Message" && (
// //             <div className="text-center text-gray-400 py-10">
// //               <p className="text-lg">Messages and notifications appear here</p>
// //               <p className="text-sm mt-2">Stay updated with your games</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState } from "react";
// import {
//   Zap,
//   Clock,
//   Hourglass,
//   Trophy,
//   Users,
//   Swords,
//   Bot,
//   ArrowLeft,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// function Card({ icon, title, time, players, onClick }) {
//   return (
//     <div 
//       onClick={onClick}
//       className="bg-[#120b06] border border-amber-500/30 rounded-xl p-5 hover:border-amber-400 hover:bg-amber-500/5 cursor-pointer transition-all group"
//     >
//       <div className="flex items-center gap-2 text-amber-400">
//         {icon}
//         <span className="font-semibold text-sm tracking-wide">{title} {time}</span>
//       </div>

//       <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
//         <Users size={12} />
//         <span>{players} playing now</span>
//       </div>
//     </div>
//   );
// }

// export default function TimeControlPage({ gameState, setGameState, onGameStart }) {
//   const location = useLocation();
//   const tabs = ["Quick playing", "Lobby", "Correspondence", "Message"];
//   const [activeTab, setActiveTab] = useState("Quick playing");
//   const [gameMode, setGameMode] = useState(location.state?.gameMode || 'online');
//   const navigate = useNavigate();

//   const sections = [
//     {
//       title: "Bullet",
//       icon: <Zap size={16} />,
//       description: "trains reflexes and intuitions",
//       items: ["1+0", "2+1", "3+0"],
//       players: [345, 166, 166]
//     },
//     {
//       title: "Blitz",
//       icon: <Clock size={16} />,
//       description: "sharpens tactical awareness",
//       items: ["3+2", "5+0", "5+3"],
//       players: [525, 505, 455]
//     },
//     {
//       title: "Rapid",
//       icon: <Hourglass size={16} />,
//       description: "builds positional understanding",
//       items: ["10+0", "15+10", "20+0"],
//       players: [225, 185, 85]
//     },
//     {
//       title: "Classic",
//       icon: <Trophy size={16} />,
//       description: "tests deep strategic thinking",
//       items: ["30+0", "60+0", "90+30"],
//       players: [145, 85, 85]
//     },
//   ];

//   const generateLobbyCode = () => {
//     return Math.random().toString(36).substring(2, 8).toUpperCase();
//   };

//   const handleCardClick = (timeControl) => {
//     // Generate lobby data
//     const lobbyData = {
//       lobbyCode: generateLobbyCode(),
//       gameType: gameMode,
//       timeControl: timeControl,
//       isPrivate: false,
//       createdAt: new Date().toISOString(),
//       players: [
//         { 
//           id: 'current-user', 
//           name: 'You', 
//           rating: 1450,
//           ready: gameMode === 'vs-computer' ? true : false 
//         }
//       ],
//       status: gameMode === 'online' ? 'waiting' : 'ready'
//     };

//     // If playing vs computer, add computer player
//     if (gameMode === 'vs-computer') {
//       lobbyData.players.push({
//         id: 'computer',
//         name: 'Computer',
//         rating: 1500,
//         ready: true,
//         isComputer: true
//       });
//       lobbyData.status = 'ready';
//     }

//     // Update game state with lobby data
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         gameMode: gameMode,
//         timeControl: timeControl,
//         status: gameMode === 'online' ? 'lobby' : 'playing',
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: gameMode === 'online' // Show modal for online mode
//       });
//     }

//     // Call onGameStart callback if provided
//     if (onGameStart) {
//       onGameStart({
//         gameMode: gameMode,
//         timeControl: timeControl,
//         lobbyData: lobbyData
//       });
//     }

//     // Navigate based on game mode
//     if (gameMode === 'vs-computer') {
//       navigate(`/game/vs-computer/${timeControl}`, { 
//         state: { lobbyData: lobbyData } 
//       });
//     } else {
//       // For online mode, go back to home which will show the lobby modal
//       navigate('/', { 
//         state: { 
//           lobbyData: lobbyData,
//           showLobby: true 
//         } 
//       });
//     }
//   };

//   const handleJoinLobby = (lobby) => {
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: lobby,
//         players: lobby.players,
//         showLobbyModal: true
//       });
//     }
//     navigate('/', { state: { lobbyData: lobby, showLobby: true } });
//   };

//   // Sample lobbies data
//   const availableLobbies = [
//     {
//       id: 1,
//       lobbyCode: 'ABCD12',
//       gameType: 'online',
//       timeControl: '10+0',
//       players: [
//         { name: 'Player1', rating: 1400, ready: true },
//         { name: 'Player2', rating: 1350, ready: false }
//       ]
//     },
//     {
//       id: 2,
//       lobbyCode: 'EFGH34',
//       gameType: 'online',
//       timeControl: '5+0',
//       players: [
//         { name: 'Player3', rating: 1600, ready: true }
//       ]
//     },
//     {
//       id: 3,
//       lobbyCode: 'IJKL56',
//       gameType: 'online',
//       timeControl: '3+2',
//       players: [
//         { name: 'Player4', rating: 1550, ready: true },
//         { name: 'Player5', rating: 1500, ready: true }
//       ]
//     }
//   ];

//   return (
//     <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#0f0703]">
//       {/* Back Button */}
//       <div className="pt-4 px-10">
//         <button
//           onClick={() => navigate('/')}
//           className="flex items-center gap-2 text-gray-400 hover:text-white transition"
//         >
//           <ArrowLeft size={18} />
//           <span>Back</span>
//         </button>
//       </div>

//       {/* Fixed Header Section */}
//       <div className="pt-4 pb-4 px-10">
//         <h1 className="text-4xl font-bold text-center">
//           Choose your <span className="text-amber-400">Time Control</span>
//         </h1>

//         <p className="text-center text-gray-400 mt-2 text-lg">
//           Select your Game mode and start playing instantly
//         </p>

//         {/* Game Mode Toggle */}
//         <div className="flex justify-center mt-6 gap-4">
//           <button
//             onClick={() => setGameMode('online')}
//             className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
//               gameMode === 'online' 
//                 ? 'bg-amber-500 text-black' 
//                 : 'bg-[#2a1a13] text-gray-400 hover:text-white'
//             }`}
//           >
//             <Swords size={18} />
//             Play Online
//           </button>
//           <button
//             onClick={() => setGameMode('vs-computer')}
//             className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
//               gameMode === 'vs-computer' 
//                 ? 'bg-amber-500 text-black' 
//                 : 'bg-[#2a1a13] text-gray-400 hover:text-white'
//             }`}
//           >
//             <Bot size={18} />
//             vs Computer
//           </button>
//         </div>

//         {/* TABS */}
//         <div className="flex justify-center mt-8">
//           <div className="bg-[#2a2522] rounded-full p-1.5 flex gap-1">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-6 py-2.5 rounded-full text-base font-medium transition ${
//                   activeTab === tab
//                     ? "bg-black text-amber-400"
//                     : "text-gray-400 hover:text-white"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Active Tab Content Indicator */}
//         {activeTab === "Lobby" && (
//           <div className="mt-4 text-center">
//             <p className="text-amber-400 text-sm">
//               Browse available lobbies or create your own
//             </p>
//           </div>
//         )}
//       </div>

//       {/* Scrollable Cards Section */}
//       <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
//         <div className="max-w-4xl mx-auto space-y-8">
//           {activeTab === "Quick playing" && (
//             sections.map((section) => (
//               <div key={section.title}>
//                 <p className="text-gray-400 mb-4 text-base font-medium">
//                   {section.title} • {section.description}
//                 </p>

//                 <div className="grid md:grid-cols-3 gap-4">
//                   {section.items.map((item, idx) => (
//                     <Card
//                       key={item}
//                       icon={section.icon}
//                       title={section.title}
//                       time={item}
//                       players={section.players[idx]}
//                       onClick={() => handleCardClick(item)}
//                     />
//                   ))}
//                 </div>
//               </div>
//             ))
//           )}

//           {activeTab === "Lobby" && (
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <h3 className="text-white text-lg font-semibold">Available Lobbies</h3>
//                 <button
//                   onClick={() => {
//                     const newLobby = {
//                       lobbyCode: generateLobbyCode(),
//                       gameType: 'online',
//                       timeControl: '10+0',
//                       isPrivate: false,
//                       players: [{ name: 'You', rating: 1450, ready: true }]
//                     };
//                     handleJoinLobby(newLobby);
//                   }}
//                   className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
//                 >
//                   <Swords size={16} />
//                   Create New Lobby
//                 </button>
//               </div>
              
//               <div className="grid gap-4">
//                 {availableLobbies.map((lobby) => (
//                   <div 
//                     key={lobby.id}
//                     className="bg-[#120b06] border border-amber-500/30 rounded-lg p-4 hover:border-amber-400 cursor-pointer transition-all"
//                     onClick={() => handleJoinLobby(lobby)}
//                   >
//                     <div className="flex justify-between items-center mb-2">
//                       <div className="flex items-center gap-2">
//                         <span className="text-amber-400 font-mono font-bold">{lobby.lobbyCode}</span>
//                         <span className="text-gray-500 text-xs">•</span>
//                         <span className="text-gray-400 text-sm">{lobby.timeControl}</span>
//                       </div>
//                       <span className="text-gray-400 text-sm">
//                         {lobby.players.length}/2 players
//                       </span>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         {lobby.players.map((player, idx) => (
//                           <div key={idx} className="flex items-center gap-1">
//                             <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
//                               <span className="text-amber-400 text-xs">
//                                 {player.name.charAt(0)}
//                               </span>
//                             </div>
//                             <span className="text-gray-300 text-sm">{player.rating}</span>
//                           </div>
//                         ))}
//                         {lobby.players.length < 2 && (
//                           <span className="text-gray-500 text-sm ml-2">(Waiting...)</span>
//                         )}
//                       </div>
//                       <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded text-sm font-medium">
//                         Join
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "Correspondence" && (
//             <div className="text-center text-gray-400 py-10">
//               <p className="text-lg">Correspondence games appear here</p>
//               <p className="text-sm mt-2">Play games over days or weeks</p>
//             </div>
//           )}

//           {activeTab === "Message" && (
//             <div className="text-center text-gray-400 py-10">
//               <p className="text-lg">Messages and notifications appear here</p>
//               <p className="text-sm mt-2">Stay updated with your games</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import {
  Zap,
  Clock,
  Hourglass,
  Trophy,
  Users,
  Swords,
  Bot,
  ArrowLeft,
  Loader
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGame } from "../../context/GameContext";
import { useAuth } from "../../context/AuthContext";

function Card({ icon, title, time, players, onClick, disabled }) {
  return (
    <div 
      onClick={!disabled ? onClick : undefined}
      className={`bg-[#120b06] border border-amber-500/30 rounded-xl p-5 
        ${!disabled ? 'hover:border-amber-400 hover:bg-amber-500/5 cursor-pointer' : 'opacity-50 cursor-not-allowed'} 
        transition-all group`}
    >
      <div className="flex items-center gap-2 text-amber-400">
        {icon}
        <span className="font-semibold text-sm tracking-wide">{title} {time}</span>
      </div>

      <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
        <Users size={12} />
        <span>{players} playing now</span>
      </div>
    </div>
  );
}

export default function TimeControlPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    startComputerGame, 
    computerDifficulties, 
    loading, 
    error,
    createLobby,
    joinQuickMatch 
  } = useGame();

  const tabs = ["Quick playing", "Lobby", "Correspondence", "Message"];
  const [activeTab, setActiveTab] = useState("Quick playing");
  const [gameMode, setGameMode] = useState(location.state?.gameMode || 'online');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [showDifficultySelect, setShowDifficultySelect] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const sections = [
    {
      title: "Bullet",
      icon: <Zap size={16} />,
      description: "trains reflexes and intuitions",
      items: ["1+0", "2+1", "3+0"],
      players: [345, 166, 166]
    },
    {
      title: "Blitz",
      icon: <Clock size={16} />,
      description: "sharpens tactical awareness",
      items: ["3+2", "5+0", "5+3"],
      players: [525, 505, 455]
    },
    {
      title: "Rapid",
      icon: <Hourglass size={16} />,
      description: "builds positional understanding",
      items: ["10+0", "15+10", "20+0"],
      players: [225, 185, 85]
    },
    {
      title: "Classic",
      icon: <Trophy size={16} />,
      description: "tests deep strategic thinking",
      items: ["30+0", "60+0", "90+30"],
      players: [145, 85, 85]
    },
  ];

  const generateLobbyCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const handleCardClick = async (timeControl) => {
    if (gameMode === 'vs-computer') {
      setIsStarting(true);
      try {
        console.log('Starting computer game with:', { timeControl, difficulty: selectedDifficulty });
        
        const result = await startComputerGame(timeControl, selectedDifficulty);
        
        if (result.success) {
          console.log('Game started successfully:', result.game);
          // Navigate to game page with the game data
          navigate(`/game/vs-computer/${timeControl}`, { 
            state: { 
              gameData: result.game,
              difficulty: selectedDifficulty 
            } 
          });
        } else {
          console.error('Failed to start game:', result.message);
          alert(result.message || 'Failed to start game. Please try again.');
        }
      } catch (error) {
        console.error('Error starting computer game:', error);
        alert('An error occurred while starting the game. Please try again.');
      } finally {
        setIsStarting(false);
      }
    } else {
      // Online mode - join quick match
      try {
        const result = await joinQuickMatch(timeControl);
        if (result.success && result.matched) {
          navigate(`/game/online/${timeControl}`);
        } else if (result.success) {
          // Show queue status
          alert(`Added to queue. Position: ${result.queuePosition}`);
        }
      } catch (error) {
        console.error('Error joining quick match:', error);
        alert('Failed to join queue. Please try again.');
      }
    }
  };

  const handleCreateLobby = async () => {
    try {
      const result = await createLobby('standard', '10+0', false);
      if (result.success) {
        navigate('/', { state: { showLobby: true } });
      }
    } catch (error) {
      console.error('Error creating lobby:', error);
      alert('Failed to create lobby. Please try again.');
    }
  };

  // Sample lobbies data
  const availableLobbies = [
    {
      id: 1,
      lobbyCode: 'ABCD12',
      gameType: 'online',
      timeControl: '10+0',
      players: [
        { name: 'Player1', rating: 1400, ready: true },
        { name: 'Player2', rating: 1350, ready: false }
      ]
    },
    {
      id: 2,
      lobbyCode: 'EFGH34',
      gameType: 'online',
      timeControl: '5+0',
      players: [
        { name: 'Player3', rating: 1600, ready: true }
      ]
    },
    {
      id: 3,
      lobbyCode: 'IJKL56',
      gameType: 'online',
      timeControl: '3+2',
      players: [
        { name: 'Player4', rating: 1550, ready: true },
        { name: 'Player5', rating: 1500, ready: true }
      ]
    }
  ];

  const handleJoinLobby = (lobby) => {
    navigate('/', { state: { lobbyData: lobby, showLobby: true } });
  };

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#0f0703]">
      {/* Back Button */}
      <div className="pt-4 px-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          disabled={isStarting}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>
      </div>

      {/* Fixed Header Section */}
      <div className="pt-4 pb-4 px-10">
        <h1 className="text-4xl font-bold text-center">
          Choose your <span className="text-amber-400">Time Control</span>
        </h1>

        <p className="text-center text-gray-400 mt-2 text-lg">
          Select your Game mode and start playing instantly
        </p>

        {/* Game Mode Toggle */}
        <div className="flex justify-center mt-6 gap-4">
          <button
            onClick={() => setGameMode('online')}
            disabled={isStarting}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
              gameMode === 'online' 
                ? 'bg-amber-500 text-black' 
                : 'bg-[#2a1a13] text-gray-400 hover:text-white'
            } ${isStarting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Swords size={18} />
            Play Online
          </button>
          <button
            onClick={() => {
              setGameMode('vs-computer');
              setShowDifficultySelect(true);
            }}
            disabled={isStarting}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition ${
              gameMode === 'vs-computer' 
                ? 'bg-amber-500 text-black' 
                : 'bg-[#2a1a13] text-gray-400 hover:text-white'
            } ${isStarting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Bot size={18} />
            vs Computer
          </button>
        </div>

        {/* Difficulty Selection (for vs Computer) */}
        {gameMode === 'vs-computer' && showDifficultySelect && (
          <div className="flex justify-center mt-4">
            <div className="bg-[#2a1a13] rounded-lg p-2 flex flex-wrap gap-2">
              {computerDifficulties.map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id)}
                  disabled={isStarting}
                  className={`px-4 py-2 rounded-lg text-sm capitalize transition ${
                    selectedDifficulty === diff.id
                      ? 'bg-amber-500 text-black'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  } ${isStarting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={diff.description}
                >
                  {diff.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TABS */}
        <div className="flex justify-center mt-8">
          <div className="bg-[#2a2522] rounded-full p-1.5 flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                disabled={isStarting}
                className={`px-6 py-2.5 rounded-full text-base font-medium transition ${
                  activeTab === tab
                    ? "bg-black text-amber-400"
                    : "text-gray-400 hover:text-white"
                } ${isStarting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Active Tab Content Indicator */}
        {activeTab === "Lobby" && (
          <div className="mt-4 text-center">
            <p className="text-amber-400 text-sm">
              Browse available lobbies or create your own
            </p>
          </div>
        )}
      </div>

      {/* Loading Overlay */}
      {isStarting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1a0f0a] rounded-lg p-8 flex flex-col items-center">
            <Loader className="animate-spin text-amber-400 mb-4" size={48} />
            <p className="text-white">Starting game...</p>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="mx-10 mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Scrollable Cards Section */}
      <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
        <div className="max-w-4xl mx-auto space-y-8">
          {activeTab === "Quick playing" && (
            sections.map((section) => (
              <div key={section.title}>
                <p className="text-gray-400 mb-4 text-base font-medium">
                  {section.title} • {section.description}
                </p>

                <div className="grid md:grid-cols-3 gap-4">
                  {section.items.map((item, idx) => (
                    <Card
                      key={item}
                      icon={section.icon}
                      title={section.title}
                      time={item}
                      players={section.players[idx]}
                      onClick={() => handleCardClick(item)}
                      disabled={isStarting}
                    />
                  ))}
                </div>
              </div>
            ))
          )}

          {activeTab === "Lobby" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-white text-lg font-semibold">Available Lobbies</h3>
                <button
                  onClick={handleCreateLobby}
                  disabled={isStarting}
                  className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-50"
                >
                  <Swords size={16} />
                  Create New Lobby
                </button>
              </div>
              
              <div className="grid gap-4">
                {availableLobbies.map((lobby) => (
                  <div 
                    key={lobby.id}
                    onClick={() => !isStarting && handleJoinLobby(lobby)}
                    className="bg-[#120b06] border border-amber-500/30 rounded-lg p-4 hover:border-amber-400 cursor-pointer transition-all disabled:opacity-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-mono font-bold">{lobby.lobbyCode}</span>
                        <span className="text-gray-500 text-xs">•</span>
                        <span className="text-gray-400 text-sm">{lobby.timeControl}</span>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {lobby.players.length}/2 players
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {lobby.players.map((player, idx) => (
                          <div key={idx} className="flex items-center gap-1">
                            <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center">
                              <span className="text-amber-400 text-xs">
                                {player.name.charAt(0)}
                              </span>
                            </div>
                            <span className="text-gray-300 text-sm">{player.rating}</span>
                          </div>
                        ))}
                        {lobby.players.length < 2 && (
                          <span className="text-gray-500 text-sm ml-2">(Waiting...)</span>
                        )}
                      </div>
                      <button className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-1.5 rounded text-sm font-medium">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Correspondence" && (
            <div className="text-center text-gray-400 py-10">
              <p className="text-lg">Correspondence games appear here</p>
              <p className="text-sm mt-2">Play games over days or weeks</p>
            </div>
          )}

          {activeTab === "Message" && (
            <div className="text-center text-gray-400 py-10">
              <p className="text-lg">Messages and notifications appear here</p>
              <p className="text-sm mt-2">Stay updated with your games</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}