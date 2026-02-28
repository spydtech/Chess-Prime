// import React, { useState, useRef, useEffect } from "react";
// import {
//   Gamepad2,
//   Puzzle,
//   GraduationCap,
//   Eye,
//   Users,
//   MoreHorizontal,
//   Moon,
//   Settings,
//   LifeBuoy,
//   Crown,
//   Swords,
//   Users2,
//   Bot,
//   Timer,
//   Search,
//   X,
//   Check,
//   UserPlus,
//   Copy,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// // Bottom Item Component
// function BottomItem({ icon, label, onClick }) {
//   return (
//     <div 
//       onClick={onClick}
//       className="flex items-center gap-4 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition text-xs"
//     >
//       <span className="text-gray-400">{icon}</span>
//       {label}
//     </div>
//   );
// }

// // Lobby Creation Modal
// function CreateLobbyModal({ isOpen, onClose, onCreateLobby }) {
//   const [lobbySettings, setLobbySettings] = useState({
//     gameType: 'standard',
//     timeControl: '10+0',
//     isPrivate: false,
//     maxPlayers: 2
//   });

//   if (!isOpen) return null;

//   const gameTypes = [
//     { id: 'standard', name: 'Standard Chess' },
//     { id: 'blitz', name: 'Blitz Chess' },
//     { id: 'bullet', name: 'Bullet Chess' },
//     { id: 'rapid', name: 'Rapid Chess' }
//   ];

//   const timeControls = [
//     { id: '1+0', name: '1+0 • Bullet' },
//     { id: '2+1', name: '2+1 • Bullet' },
//     { id: '3+0', name: '3+0 • Blitz' },
//     { id: '3+2', name: '3+2 • Blitz' },
//     { id: '5+0', name: '5+0 • Blitz' },
//     { id: '5+3', name: '5+3 • Blitz' },
//     { id: '10+0', name: '10+0 • Rapid' },
//     { id: '10+5', name: '10+5 • Rapid' },
//     { id: '15+10', name: '15+10 • Rapid' },
//     { id: '30+0', name: '30+0 • Classical' }
//   ];

//   const handleCreateLobby = () => {
//     const lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//     onCreateLobby({
//       ...lobbySettings,
//       lobbyCode,
//       createdAt: new Date().toISOString(),
//       players: [{ id: 'current-user', name: 'You', rating: 1450, ready: true }]
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Create Lobby</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {/* Game Type Selection */}
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Game Type</label>
//             <select 
//               className="w-full bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
//               value={lobbySettings.gameType}
//               onChange={(e) => setLobbySettings({...lobbySettings, gameType: e.target.value})}
//             >
//               {gameTypes.map(type => (
//                 <option key={type.id} value={type.id}>{type.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Time Control Selection */}
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Time Control</label>
//             <select 
//               className="w-full bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
//               value={lobbySettings.timeControl}
//               onChange={(e) => setLobbySettings({...lobbySettings, timeControl: e.target.value})}
//             >
//               {timeControls.map(tc => (
//                 <option key={tc.id} value={tc.id}>{tc.name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Private Lobby Toggle */}
//           <div className="flex items-center justify-between">
//             <span className="text-gray-300 text-sm">Private Lobby</span>
//             <button
//               onClick={() => setLobbySettings({...lobbySettings, isPrivate: !lobbySettings.isPrivate})}
//               className={`w-12 h-6 rounded-full transition-colors ${
//                 lobbySettings.isPrivate ? 'bg-amber-500' : 'bg-gray-600'
//               }`}
//             >
//               <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
//                 lobbySettings.isPrivate ? 'translate-x-7' : 'translate-x-1'
//               }`} />
//             </button>
//           </div>

//           {/* Create Button */}
//           <button
//             onClick={handleCreateLobby}
//             className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition mt-4"
//           >
//             Create Lobby
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Quick Match Modal
// function QuickMatchModal({ isOpen, onClose, onMatchFound }) {
//   const [searching, setSearching] = useState(false);
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     let interval;
//     if (searching) {
//       interval = setInterval(() => {
//         setTimeElapsed(prev => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [searching]);

//   const handleSearch = () => {
//     setSearching(true);
//     // Simulate finding a match after 3-5 seconds
//     setTimeout(() => {
//       setSearching(false);
//       setTimeElapsed(0);
//       const matchData = {
//         opponent: {
//           name: 'Player_' + Math.floor(Math.random() * 1000),
//           rating: 1200 + Math.floor(Math.random() * 400)
//         },
//         gameType: 'Standard',
//         timeControl: '10+0'
//       };
//       onMatchFound(matchData);
//       navigate('/game/online/10+0', { state: { matchData } });
//       onClose();
//     }, 3000 + Math.random() * 2000);
//   };

//   const handleCancel = () => {
//     setSearching(false);
//     setTimeElapsed(0);
//   };

//   if (!isOpen) return null;

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Quick Match</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {!searching ? (
//           <div className="space-y-4">
//             <p className="text-gray-300 text-sm">Find an opponent instantly based on your skill level</p>
//             <button
//               onClick={handleSearch}
//               className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
//             >
//               <Search size={18} />
//               Start Searching
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="flex items-center justify-center py-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
//             </div>
//             <p className="text-center text-amber-400">Searching for opponent...</p>
//             <p className="text-center text-gray-500 text-sm">Time: {formatTime(timeElapsed)}</p>
//             <button
//               onClick={handleCancel}
//               className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-2 rounded-lg transition"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Add User Modal
// function AddUserModal({ isOpen, onClose, onAddUser }) {
//   const [userId, setUserId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);

//   const handleSearch = () => {
//     if (!userId.trim()) return;
    
//     setSearching(true);
//     // Simulate API call to find user
//     setTimeout(() => {
//       setSearchResult({
//         id: userId,
//         name: 'User_' + userId,
//         rating: 1300,
//         status: 'online'
//       });
//       setSearching(false);
//     }, 1000);
//   };

//   const handleAddUser = () => {
//     if (searchResult) {
//       onAddUser(searchResult);
//       setUserId('');
//       setSearchResult(null);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Add Player</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           {/* Search Input */}
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter User ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
//             />
//             <button
//               onClick={handleSearch}
//               disabled={searching}
//               className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
//             >
//               {searching ? '...' : 'Search'}
//             </button>
//           </div>

//           {/* Search Result */}
//           {searchResult && (
//             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-white font-medium">{searchResult.name}</p>
//                   <p className="text-gray-400 text-xs">Rating: {searchResult.rating}</p>
//                 </div>
//                 <span className="text-green-400 text-xs flex items-center gap-1">
//                   <span className="w-2 h-2 bg-green-400 rounded-full" />
//                   {searchResult.status}
//                 </span>
//               </div>
//               <button
//                 onClick={handleAddUser}
//                 className="w-full mt-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-1 rounded text-sm transition flex items-center justify-center gap-1"
//               >
//                 <UserPlus size={14} />
//                 Add to Game
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Lobby Display Component - MODAL VERSION (Centered)
// function LobbyDisplay({ lobby, onStartGame, onInviteFriend, onClose }) {
//   const [copied, setCopied] = useState(false);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         {/* Header with Close Button */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
//           <button 
//             onClick={onClose} 
//             className="text-gray-400 hover:text-white"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         {/* Lobby Code */}
//         <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
//           <span className="text-gray-400 text-sm">Lobby Code:</span>
//           <div className="flex items-center gap-2">
//             <span className="text-amber-400 font-mono font-bold">{lobby.lobbyCode}</span>
//             <button
//               onClick={handleCopyCode}
//               className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
//             >
//               <Copy size={12} />
//               {copied ? 'Copied!' : 'Copy'}
//             </button>
//           </div>
//         </div>

//         {/* Game Details */}
//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Game Type:</span>
//             <span className="text-white text-sm capitalize">{lobby.gameType} Chess</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Time Control:</span>
//             <span className="text-white text-sm">{lobby.timeControl}</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Visibility:</span>
//             <span className="text-white text-sm">{lobby.isPrivate ? 'Private' : 'Public'}</span>
//           </div>
//         </div>

//         {/* Players List */}
//         <div className="border-t border-white/10 pt-4 mb-4">
//           <p className="text-gray-400 text-sm mb-3">Players ({lobby.players.length}/2):</p>
//           <div className="space-y-2">
//             {lobby.players.map((player, index) => (
//               <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                 <div className="flex items-center gap-2">
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                     index === 0 ? 'bg-amber-500/20' : player.isComputer ? 'bg-gray-600/20' : 'bg-gray-600/20'
//                   }`}>
//                     <span className={`text-sm font-bold ${
//                       index === 0 ? 'text-amber-400' : player.isComputer ? 'text-gray-400' : 'text-gray-400'
//                     }`}>
//                       {player.name.charAt(0)}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-white text-sm">{player.name}</span>
//                     {index === 0 && (
//                       <span className="text-amber-400 text-xs ml-2">(You)</span>
//                     )}
//                     {player.isComputer && (
//                       <span className="text-gray-500 text-xs ml-2">(Computer)</span>
//                     )}
//                   </div>
//                 </div>
//                 {player.ready ? (
//                   <span className="flex items-center gap-1 text-green-400 text-xs">
//                     <Check size={12} />
//                     Ready
//                   </span>
//                 ) : (
//                   <span className="text-gray-500 text-xs">Not Ready</span>
//                 )}
//               </div>
//             ))}
            
//             {/* Empty slots */}
//             {lobby.players.length < 2 && !lobby.players.some(p => p.isComputer) && (
//               <div className="bg-[#2a1a13]/50 p-2 rounded-lg border border-dashed border-white/10">
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center">
//                     <span className="text-gray-500 text-sm">?</span>
//                   </div>
//                   <span className="text-gray-500 text-sm">Waiting for player...</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2">
//           {!lobby.players.some(p => p.isComputer) && (
//             <button
//               onClick={onInviteFriend}
//               className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//             >
//               <UserPlus size={16} />
//               Invite
//             </button>
//           )}
//           <button
//             onClick={onStartGame}
//             disabled={lobby.players.length < 2 && !lobby.players.some(p => p.isComputer)}
//             className={`${
//               !lobby.players.some(p => p.isComputer) ? 'flex-1' : 'w-full'
//             } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
//           >
//             <Swords size={16} />
//             {lobby.players.some(p => p.isComputer) ? 'Start Game' : 'Start Game'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Dropdown Menu Component
// function PlayDropdown({ isOpen, onClose, onSelect }) {
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onClose();
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const playOptions = [
//     { 
//       name: "Create Lobby", 
//       icon: <Swords size={15} />, 
//       description: "Start a new game with custom settings",
//       action: "create-lobby"
//     },
//     { 
//       name: "Quick Match", 
//       icon: <Timer size={15} />, 
//       description: "Find an opponent instantly",
//       action: "quick-match"
//     },
//     { 
//       name: "Play vs Computer", 
//       icon: <Bot size={15} />, 
//       description: "Practice against AI",
//       action: "vs-computer"
//     },
//     { 
//       name: "Tournaments", 
//       icon: <Users2 size={15} />, 
//       description: "Join competitive events",
//       action: "tournaments"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 top-full mt-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         {playOptions.map((option) => (
//           <button
//             key={option.name}
//             className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors text-left group"
//             onClick={() => {
//               onSelect(option.action);
//               onClose();
//             }}
//           >
//             <span className="text-amber-400 mt-0.5">{option.icon}</span>
//             <div className="flex-1">
//               <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
//                 {option.name}
//               </div>
//               <div className="text-gray-500 text-xs mt-0.5">
//                 {option.description}
//               </div>
//             </div>
//           </button>
//         ))}
        
//         {/* Divider */}
//         <div className="my-2 border-t border-white/5" />
        
//         {/* Additional options */}
//         <button
//           className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
//           onClick={() => {
//             onSelect("custom-settings");
//             onClose();
//           }}
//         >
//           <span className="text-gray-400 text-xs">⚙️</span>
//           <span className="text-gray-300 text-sm">Custom Game Settings</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main Sidebar Component
// export default function Sidebar({ activeItem, onItemClick, gameState, setGameState }) {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [currentLobby, setCurrentLobby] = useState(null);
//   const timeoutRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check for lobby data from navigation
//   useEffect(() => {
//     if (location.state?.lobbyData) {
//       setCurrentLobby(location.state.lobbyData);
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: location.state.lobbyData,
//         players: location.state.lobbyData.players
//       });
//     }
//   }, [location.state]);

//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//   const bottomItems = [
//     { name: "Dark mode", icon: <Moon size={15} /> },
//     { name: "Settings", icon: <Settings size={15} /> },
//     { name: "Support", icon: <LifeBuoy size={15} /> },
//   ];

//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       onItemClick("Settings");
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleMouseEnter = (itemName) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
    
//     if (itemName === "Play") {
//       setOpenDropdown("Play");
//     }
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setOpenDropdown(null);
//     }, 200);
//   };

//   const handleDropdownSelect = (action) => {
//     if (action === "create-lobby") {
//       setShowCreateLobby(true);
//     } else if (action === "quick-match") {
//       setShowQuickMatch(true);
//     } else if (action === "vs-computer") {
//       navigate('/time-control', { state: { gameMode: 'vs-computer' } });
//     } else if (action === "tournaments") {
//       onItemClick("Tournaments");
//     } else if (action === "custom-settings") {
//       onItemClick("Custom Game Settings");
//     }
//   };

//   const handleCreateLobby = (lobbyData) => {
//     setCurrentLobby(lobbyData);
//     setGameState({
//       ...gameState,
//       status: 'lobby',
//       lobbyData: lobbyData,
//       players: lobbyData.players
//     });
//     onItemClick("Lobby Created");
//   };

//   const handleMatchFound = (matchData) => {
//     const lobbyData = {
//       lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
//       gameType: 'online',
//       timeControl: '10+0',
//       players: [
//         { name: 'You', rating: 1450, ready: true },
//         { name: matchData.opponent.name, rating: matchData.opponent.rating, ready: true }
//       ]
//     };
    
//     setCurrentLobby(lobbyData);
//     setGameState({
//       status: 'playing',
//       gameMode: 'online',
//       timeControl: '10+0',
//       lobbyData: lobbyData,
//       players: lobbyData.players
//     });
//   };

//   const handleAddUser = (user) => {
//     if (currentLobby) {
//       const updatedLobby = {
//         ...currentLobby,
//         players: [...currentLobby.players, { 
//           id: user.id, 
//           name: user.name, 
//           rating: user.rating,
//           ready: false 
//         }]
//       };
//       setCurrentLobby(updatedLobby);
//       setGameState({
//         ...gameState,
//         lobbyData: updatedLobby,
//         players: updatedLobby.players
//       });
//     }
//   };

//   const handleStartGame = () => {
//     if (currentLobby) {
//       const canStart = currentLobby.players.some(p => p.isComputer) 
//         ? true 
//         : currentLobby.players.length >= 2;
      
//       if (canStart) {
//         setGameState({
//           ...gameState,
//           status: 'playing',
//           gameMode: currentLobby.gameType,
//           timeControl: currentLobby.timeControl,
//           players: currentLobby.players
//         });
        
//         if (currentLobby.players.some(p => p.isComputer)) {
//           navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
//             state: { lobbyData: currentLobby } 
//           });
//         } else {
//           navigate(`/game/online/${currentLobby.timeControl}`, { 
//             state: { lobbyData: currentLobby } 
//           });
//         }
        
//         // Close the lobby modal
//         setCurrentLobby(null);
//       }
//     }
//   };

//   return (
//     <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
//       {/* LOGO - Fixed at top */}
//       <div className="flex items-center gap-3 px-6 py-8">
//         <Crown className="text-amber-400" size={28} />
//         <div>
//           <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//           <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//         </div>
//       </div>

//       {/* MENU - Scrollable if needed */}
//       <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-24">
//         {menuItems.map((item) => {
//           const isActive = activeItem === item.name;
          
//           return (
//             <div
//               key={item.name}
//               className="relative"
//               onMouseEnter={() => handleMouseEnter(item.name)}
//               onMouseLeave={handleMouseLeave}
//             >
//               <button
//                 onClick={() => onItemClick(item.name)}
//                 className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
//                   ${
//                     isActive
//                       ? "bg-[#FFA20026] text-white"
//                       : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
//                   }`}
//               >
//                 <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
//                 {item.name}
//                 {/* {item.hasDropdown && (
//                   <span className="ml-auto text-gray-600 text-[10px]">▼</span>
//                 )} */}
//               </button>
              
//               {/* Dropdown for Play button */}
//               {item.name === "Play" && (
//                 <PlayDropdown 
//                   isOpen={openDropdown === "Play"}
//                   onClose={() => setOpenDropdown(null)}
//                   onSelect={handleDropdownSelect}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       {/* BOTTOM - Fixed at bottom */}
//       <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm">
//         {bottomItems.map((item) => (
//           <BottomItem 
//             key={item.name}
//             icon={item.icon} 
//             label={item.name}
//             onClick={() => handleBottomItemClick(item.name)}
//           />
//         ))}
//       </div>

//       {/* Modals */}
//       <CreateLobbyModal 
//         isOpen={showCreateLobby}
//         onClose={() => setShowCreateLobby(false)}
//         onCreateLobby={handleCreateLobby}
//       />

//       <QuickMatchModal
//         isOpen={showQuickMatch}
//         onClose={() => setShowQuickMatch(false)}
//         onMatchFound={handleMatchFound}
//       />

//       <AddUserModal
//         isOpen={showAddUser}
//         onClose={() => setShowAddUser(false)}
//         onAddUser={handleAddUser}
//       />

//       {/* Lobby Display Modal - Centered */}
//       {currentLobby && gameState?.status === 'lobby' && (
//         <LobbyDisplay 
//           lobby={currentLobby}
//           onStartGame={handleStartGame}
//           onInviteFriend={() => setShowAddUser(true)}
//           onClose={() => {
//             setCurrentLobby(null);
//             setGameState({...gameState, status: 'menu'});
//           }}
//         />
//       )}
//     </div>
//   );
// }




// import React, { useState, useRef, useEffect } from "react";
// import {
//   Gamepad2,
//   Puzzle,
//   GraduationCap,
//   Eye,
//   Users,
//   MoreHorizontal,
//   Moon,
//   Settings,
//   LifeBuoy,
//   Crown,
//   Swords,
//   Users2,
//   Bot,
//   Timer,
//   Search,
//   X,
//   Check,
//   UserPlus,
//   Copy,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";

// // Bottom Item Component
// function BottomItem({ icon, label, onClick }) {
//   return (
//     <div 
//       onClick={onClick}
//       className="flex items-center gap-4 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition text-xs"
//     >
//       <span className="text-gray-400">{icon}</span>
//       {label}
//     </div>
//   );
// }

// // Lobby Creation Modal
// function CreateLobbyModal({ isOpen, onClose, onCreateLobby }) {
//   const [lobbySettings, setLobbySettings] = useState({
//     gameType: 'standard',
//     timeControl: '10+0',
//     isPrivate: false,
//     maxPlayers: 2
//   });

//   if (!isOpen) return null;

//   const gameTypes = [
//     { id: 'standard', name: 'Standard Chess' },
//     { id: 'blitz', name: 'Blitz Chess' },
//     { id: 'bullet', name: 'Bullet Chess' },
//     { id: 'rapid', name: 'Rapid Chess' }
//   ];

//   const timeControls = [
//     { id: '1+0', name: '1+0 • Bullet' },
//     { id: '2+1', name: '2+1 • Bullet' },
//     { id: '3+0', name: '3+0 • Blitz' },
//     { id: '3+2', name: '3+2 • Blitz' },
//     { id: '5+0', name: '5+0 • Blitz' },
//     { id: '5+3', name: '5+3 • Blitz' },
//     { id: '10+0', name: '10+0 • Rapid' },
//     { id: '10+5', name: '10+5 • Rapid' },
//     { id: '15+10', name: '15+10 • Rapid' },
//     { id: '30+0', name: '30+0 • Classical' }
//   ];

//   const handleCreateLobby = () => {
//     const lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//     onCreateLobby({
//       ...lobbySettings,
//       lobbyCode,
//       createdAt: new Date().toISOString(),
//       players: [{ 
//         id: 'current-user', 
//         name: 'You', 
//         rating: 1450, 
//         ready: true 
//       }]
//     });
//     onClose();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Create Lobby</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Game Type</label>
//             <select 
//               className="w-full bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
//               value={lobbySettings.gameType}
//               onChange={(e) => setLobbySettings({...lobbySettings, gameType: e.target.value})}
//             >
//               {gameTypes.map(type => (
//                 <option key={type.id} value={type.id}>{type.name}</option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Time Control</label>
//             <select 
//               className="w-full bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
//               value={lobbySettings.timeControl}
//               onChange={(e) => setLobbySettings({...lobbySettings, timeControl: e.target.value})}
//             >
//               {timeControls.map(tc => (
//                 <option key={tc.id} value={tc.id}>{tc.name}</option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-gray-300 text-sm">Private Lobby</span>
//             <button
//               onClick={() => setLobbySettings({...lobbySettings, isPrivate: !lobbySettings.isPrivate})}
//               className={`w-12 h-6 rounded-full transition-colors ${
//                 lobbySettings.isPrivate ? 'bg-amber-500' : 'bg-gray-600'
//               }`}
//             >
//               <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
//                 lobbySettings.isPrivate ? 'translate-x-7' : 'translate-x-1'
//               }`} />
//             </button>
//           </div>

//           <button
//             onClick={handleCreateLobby}
//             className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition mt-4"
//           >
//             Create Lobby
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Quick Match Modal
// function QuickMatchModal({ isOpen, onClose, onMatchFound }) {
//   const [searching, setSearching] = useState(false);
//   const [timeElapsed, setTimeElapsed] = useState(0);

//   useEffect(() => {
//     let interval;
//     if (searching) {
//       interval = setInterval(() => {
//         setTimeElapsed(prev => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [searching]);

//   const handleSearch = () => {
//     setSearching(true);
//     setTimeout(() => {
//       setSearching(false);
//       setTimeElapsed(0);
//       const matchData = {
//         opponent: {
//           name: 'Player_' + Math.floor(Math.random() * 1000),
//           rating: 1200 + Math.floor(Math.random() * 400)
//         },
//         gameType: 'Standard',
//         timeControl: '10+0'
//       };
//       onMatchFound(matchData);
//       onClose();
//     }, 3000 + Math.random() * 2000);
//   };

//   const handleCancel = () => {
//     setSearching(false);
//     setTimeElapsed(0);
//   };

//   if (!isOpen) return null;

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Quick Match</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {!searching ? (
//           <div className="space-y-4">
//             <p className="text-gray-300 text-sm">Find an opponent instantly based on your skill level</p>
//             <button
//               onClick={handleSearch}
//               className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
//             >
//               <Search size={18} />
//               Start Searching
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             <div className="flex items-center justify-center py-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
//             </div>
//             <p className="text-center text-amber-400">Searching for opponent...</p>
//             <p className="text-center text-gray-500 text-sm">Time: {formatTime(timeElapsed)}</p>
//             <button
//               onClick={handleCancel}
//               className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-2 rounded-lg transition"
//             >
//               Cancel
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// // Add User Modal
// function AddUserModal({ isOpen, onClose, onAddUser }) {
//   const [userId, setUserId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);

//   const handleSearch = () => {
//     if (!userId.trim()) return;
    
//     setSearching(true);
//     setTimeout(() => {
//       setSearchResult({
//         id: userId,
//         name: 'Player_' + userId,
//         rating: 1300,
//         status: 'online'
//       });
//       setSearching(false);
//     }, 1000);
//   };

//   const handleAddUser = () => {
//     if (searchResult) {
//       onAddUser(searchResult);
//       setUserId('');
//       setSearchResult(null);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Add Player</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="flex gap-2">
//             <input
//               type="text"
//               placeholder="Enter User ID"
//               value={userId}
//               onChange={(e) => setUserId(e.target.value)}
//               className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
//             />
//             <button
//               onClick={handleSearch}
//               disabled={searching}
//               className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
//             >
//               {searching ? '...' : 'Search'}
//             </button>
//           </div>

//           {searchResult && (
//             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-white font-medium">{searchResult.name}</p>
//                   <p className="text-gray-400 text-xs">Rating: {searchResult.rating}</p>
//                 </div>
//                 <span className="text-green-400 text-xs flex items-center gap-1">
//                   <span className="w-2 h-2 bg-green-400 rounded-full" />
//                   {searchResult.status}
//                 </span>
//               </div>
//               <button
//                 onClick={handleAddUser}
//                 className="w-full mt-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-1 rounded text-sm transition flex items-center justify-center gap-1"
//               >
//                 <UserPlus size={14} />
//                 Add to Game
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // Lobby Display Component
// function LobbyDisplay({ lobby, onStartGame, onInviteFriend, onClose, gameState, setGameState }) {
//   const [copied, setCopied] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleAddUser = (user) => {
//     if (lobby && setGameState) {
//       const updatedLobby = {
//         ...lobby,
//         players: [...lobby.players, { 
//           id: user.id, 
//           name: user.name, 
//           rating: user.rating,
//           ready: true // Set the invited user as ready by default
//         }]
//       };
      
//       setGameState({
//         ...gameState,
//         lobbyData: updatedLobby,
//         players: updatedLobby.players
//       });
//     }
//   };

//   const handleToggleReady = () => {
//     if (setGameState && lobby) {
//       const updatedPlayers = lobby.players.map((player, index) => {
//         if (index === 0) { // Current user is always first
//           return { ...player, ready: !player.ready };
//         }
//         return player;
//       });
      
//       setGameState({
//         ...gameState,
//         lobbyData: {
//           ...lobby,
//           players: updatedPlayers
//         },
//         players: updatedPlayers
//       });
//     }
//   };

//   const canStartGame = lobby?.players?.some(p => p.isComputer) 
//     ? true 
//     : lobby?.players?.length === 2 && lobby?.players?.every(p => p.ready);

//   return (
//     <>
//       <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//         <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-white">
//               <X size={20} />
//             </button>
//           </div>

//           <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
//             <span className="text-gray-400 text-sm">Lobby Code:</span>
//             <div className="flex items-center gap-2">
//               <span className="text-amber-400 font-mono font-bold">{lobby?.lobbyCode}</span>
//               <button
//                 onClick={handleCopyCode}
//                 className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
//               >
//                 <Copy size={12} />
//                 {copied ? 'Copied!' : 'Copy'}
//               </button>
//             </div>
//           </div>

//           <div className="space-y-2 mb-4">
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400 text-sm">Game Type:</span>
//               <span className="text-white text-sm capitalize">{lobby?.gameType || 'Standard'} Chess</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400 text-sm">Time Control:</span>
//               <span className="text-white text-sm">{lobby?.timeControl}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-400 text-sm">Visibility:</span>
//               <span className="text-white text-sm">{lobby?.isPrivate ? 'Private' : 'Public'}</span>
//             </div>
//           </div>

//           <div className="border-t border-white/10 pt-4 mb-4">
//             <p className="text-gray-400 text-sm mb-3">Players ({lobby?.players?.length || 0}/2):</p>
//             <div className="space-y-2">
//               {lobby?.players?.map((player, index) => (
//                 <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       index === 0 ? 'bg-amber-500/20' : player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
//                     }`}>
//                       <span className={`text-sm font-bold ${
//                         index === 0 ? 'text-amber-400' : player.isComputer ? 'text-gray-400' : 'text-blue-400'
//                       }`}>
//                         {player.name.charAt(0)}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-white text-sm">{player.name}</span>
//                       {index === 0 && (
//                         <span className="text-amber-400 text-xs ml-2">(You)</span>
//                       )}
//                       {player.isComputer && (
//                         <span className="text-gray-500 text-xs ml-2">(Computer)</span>
//                       )}
//                       {!player.isComputer && index > 0 && (
//                         <span className="text-blue-400 text-xs ml-2">(Opponent)</span>
//                       )}
//                     </div>
//                   </div>
//                   {index === 0 && !player.isComputer ? (
//                     <button
//                       onClick={handleToggleReady}
//                       className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
//                         player.ready 
//                           ? 'bg-green-500/20 text-green-400' 
//                           : 'bg-yellow-500/20 text-yellow-400'
//                       }`}
//                     >
//                       {player.ready ? <Check size={12} /> : <Timer size={12} />}
//                       {player.ready ? 'Ready' : 'Not Ready'}
//                     </button>
//                   ) : (
//                     <span className={`flex items-center gap-1 text-xs ${
//                       player.ready ? 'text-green-400' : 'text-gray-500'
//                     }`}>
//                       {player.ready && <Check size={12} />}
//                       {player.ready ? 'Ready' : 'Not Ready'}
//                     </span>
//                   )}
//                 </div>
//               ))}
              
//               {lobby?.players?.length < 2 && !lobby?.players?.some(p => p.isComputer) && (
//                 <div className="bg-[#2a1a13]/50 p-2 rounded-lg border border-dashed border-white/10">
//                   <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center">
//                       <span className="text-gray-500 text-sm">?</span>
//                     </div>
//                     <span className="text-gray-500 text-sm">Waiting for player...</span>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex gap-2">
//             {!lobby?.players?.some(p => p.isComputer) && lobby?.players?.length < 2 && (
//               <button
//                 onClick={() => setShowAddUser(true)}
//                 className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//               >
//                 <UserPlus size={16} />
//                 Invite
//               </button>
//             )}
//             <button
//               onClick={onStartGame}
//               disabled={!canStartGame}
//               className={`${
//                 !lobby?.players?.some(p => p.isComputer) && lobby?.players?.length < 2 ? 'flex-1' : 'w-full'
//               } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
//             >
//               <Swords size={16} />
//               {canStartGame ? 'Start Game' : 'Waiting for players...'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Add User Modal */}
//       {showAddUser && (
//         <AddUserModal
//           isOpen={showAddUser}
//           onClose={() => setShowAddUser(false)}
//           onAddUser={(user) => {
//             handleAddUser(user);
//             setShowAddUser(false);
//           }}
//         />
//       )}
//     </>
//   );
// }

// // Dropdown Menu Component
// function PlayDropdown({ isOpen, onClose, onSelect }) {
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         onClose();
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   const playOptions = [
//     { 
//       name: "Create Lobby", 
//       icon: <Swords size={15} />, 
//       description: "Start a new game with custom settings",
//       action: "create-lobby"
//     },
//     { 
//       name: "Quick Match", 
//       icon: <Timer size={15} />, 
//       description: "Find an opponent instantly",
//       action: "quick-match"
//     },
//     { 
//       name: "Play vs Computer", 
//       icon: <Bot size={15} />, 
//       description: "Practice against AI",
//       action: "vs-computer"
//     },
//     { 
//       name: "Tournaments", 
//       icon: <Users2 size={15} />, 
//       description: "Join competitive events",
//       action: "tournaments"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 top-full mt-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         {playOptions.map((option) => (
//           <button
//             key={option.name}
//             className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors text-left group"
//             onClick={() => {
//               onSelect(option.action);
//               onClose();
//             }}
//           >
//             <span className="text-amber-400 mt-0.5">{option.icon}</span>
//             <div className="flex-1">
//               <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
//                 {option.name}
//               </div>
//               <div className="text-gray-500 text-xs mt-0.5">
//                 {option.description}
//               </div>
//             </div>
//           </button>
//         ))}
        
//         <div className="my-2 border-t border-white/5" />
        
//         <button
//           className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
//           onClick={() => {
//             onSelect("custom-settings");
//             onClose();
//           }}
//         >
//           <span className="text-gray-400 text-xs">⚙️</span>
//           <span className="text-gray-300 text-sm">Custom Game Settings</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// // Main Sidebar Component
// export default function Sidebar({ activeItem, onItemClick, gameState, setGameState }) {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const timeoutRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check for lobby data from navigation
//   useEffect(() => {
//     if (location.state?.lobbyData && setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: location.state.lobbyData,
//         players: location.state.lobbyData.players,
//         showLobbyModal: true
//       });
      
//       // Clear the location state to prevent showing again on refresh
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state, setGameState, gameState]);

//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//   const bottomItems = [
//     { name: "Dark mode", icon: <Moon size={15} /> },
//     { name: "Settings", icon: <Settings size={15} /> },
//     { name: "Support", icon: <LifeBuoy size={15} /> },
//   ];

//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       onItemClick("Settings");
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleMouseEnter = (itemName) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//       timeoutRef.current = null;
//     }
    
//     if (itemName === "Play") {
//       setOpenDropdown("Play");
//     }
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setOpenDropdown(null);
//     }, 200);
//   };

//   const handleDropdownSelect = (action) => {
//     if (action === "create-lobby") {
//       setShowCreateLobby(true);
//     } else if (action === "quick-match") {
//       setShowQuickMatch(true);
//     } else if (action === "vs-computer") {
//       navigate('/time-control', { state: { gameMode: 'vs-computer' } });
//      } else if (action === "tournaments") {
//     // Navigate to tournaments page instead of just calling onItemClick
//     navigate('/tournaments');
//     } else if (action === "custom-settings") {
//       onItemClick("Custom Game Settings");
//     }
//   };

//   const handleCreateLobby = (lobbyData) => {
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: true
//       });
//     }
//     onItemClick("Lobby Created");
//   };

//   const handleMatchFound = (matchData) => {
//     const lobbyData = {
//       lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
//       gameType: 'online',
//       timeControl: '10+0',
//       isPrivate: false,
//       players: [
//         { name: 'You', rating: 1450, ready: true },
//         { name: matchData.opponent.name, rating: matchData.opponent.rating, ready: true }
//       ]
//     };
    
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'playing',
//         gameMode: 'online',
//         timeControl: '10+0',
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: false
//       });
//     }
    
//     // Navigate directly to game
//     navigate(`/game/online/10+0`, { 
//       state: { lobbyData: lobbyData } 
//     });
//   };

//   const handleStartGame = () => {
//     const currentLobby = gameState?.lobbyData;
//     if (currentLobby && setGameState) {
//       const canStart = currentLobby.players.some(p => p.isComputer) 
//         ? true 
//         : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
//       if (canStart) {
//         setGameState({
//           ...gameState,
//           status: 'playing',
//           showLobbyModal: false
//         });
        
//         if (currentLobby.players.some(p => p.isComputer)) {
//           navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
//             state: { lobbyData: currentLobby } 
//           });
//         } else {
//           navigate(`/game/online/${currentLobby.timeControl}`, { 
//             state: { lobbyData: currentLobby } 
//           });
//         }
//       }
//     }
//   };

//   const handleCloseLobby = () => {
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         showLobbyModal: false,
//         lobbyData: null
//       });
//     }
//   };

//   return (
//     <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
//       <div className="flex items-center gap-3 px-6 py-8">
//         <Crown className="text-amber-400" size={28} />
//         <div>
//           <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//           <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//         </div>
//       </div>

//       <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-26">
//         {menuItems.map((item) => {
//           const isActive = activeItem === item.name;
          
//           return (
//             <div
//               key={item.name}
//               className="relative"
//               onMouseEnter={() => handleMouseEnter(item.name)}
//               onMouseLeave={handleMouseLeave}
//             >
//               <button
//                 onClick={() => onItemClick(item.name)}
//                 className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
//                   ${
//                     isActive
//                       ? "bg-[#FFA20026] text-white"
//                       : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
//                   }`}
//               >
//                 <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
//                 {item.name}
//               </button>
              
//               {item.name === "Play" && (
//                 <PlayDropdown 
//                   isOpen={openDropdown === "Play"}
//                   onClose={() => setOpenDropdown(null)}
//                   onSelect={handleDropdownSelect}
//                 />
//               )}
//             </div>
//           );
//         })}
//       </nav>

//       <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm">
//         {bottomItems.map((item) => (
//           <BottomItem 
//             key={item.name}
//             icon={item.icon} 
//             label={item.name}
//             onClick={() => handleBottomItemClick(item.name)}
//           />
//         ))}
//       </div>

//       <CreateLobbyModal 
//         isOpen={showCreateLobby}
//         onClose={() => setShowCreateLobby(false)}
//         onCreateLobby={handleCreateLobby}
//       />

//       <QuickMatchModal
//         isOpen={showQuickMatch}
//         onClose={() => setShowQuickMatch(false)}
//         onMatchFound={handleMatchFound}
//       />

//       {gameState?.showLobbyModal && gameState?.lobbyData && (
//         <LobbyDisplay 
//           lobby={gameState.lobbyData}
//           onStartGame={handleStartGame}
//           onInviteFriend={() => {}}
//           onClose={handleCloseLobby}
//           gameState={gameState}
//           setGameState={setGameState}
//         />
//       )}

//     </div>
//   );
// }






import React, { useState, useRef, useEffect } from "react";
import {
  Gamepad2,
  Puzzle,
  GraduationCap,
  Eye,
  Users,
  MoreHorizontal,
  Moon,
  Settings,
  LifeBuoy,
  Crown,
  Swords,
  Users2,
  Bot,
  Timer,
  Search,
  X,
  Check,
  UserPlus,
  Copy,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// Bottom Item Component
function BottomItem({ icon, label, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center gap-4 px-4 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer transition text-xs"
    >
      <span className="text-gray-400">{icon}</span>
      {label}
    </div>
  );
}

// Lobby Creation Modal
function CreateLobbyModal({ isOpen, onClose, onCreateLobby }) {
  const [lobbySettings, setLobbySettings] = useState({
    gameType: 'standard',
    timeControl: '10+0',
    isPrivate: false,
    maxPlayers: 2
  });

  if (!isOpen) return null;

  const gameTypes = [
    { id: 'standard', name: 'Standard Chess' },
    { id: 'blitz', name: 'Blitz Chess' },
    { id: 'bullet', name: 'Bullet Chess' },
    { id: 'rapid', name: 'Rapid Chess' }
  ];

  const timeControls = [
    { id: '1+0', name: '1+0 • Bullet' },
    { id: '2+1', name: '2+1 • Bullet' },
    { id: '3+0', name: '3+0 • Blitz' },
    { id: '3+2', name: '3+2 • Blitz' },
    { id: '5+0', name: '5+0 • Blitz' },
    { id: '5+3', name: '5+3 • Blitz' },
    { id: '10+0', name: '10+0 • Rapid' },
    { id: '10+5', name: '10+5 • Rapid' },
    { id: '15+10', name: '15+10 • Rapid' },
    { id: '30+0', name: '30+0 • Classical' }
  ];

  const handleCreateLobby = () => {
    const lobbyCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    onCreateLobby({
      ...lobbySettings,
      lobbyCode,
      createdAt: new Date().toISOString(),
      players: [{ 
        id: 'current-user', 
        name: 'You', 
        rating: 1450, 
        ready: true 
      }]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Create Lobby</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-xs mb-2 block">Game Type</label>
            <select 
              className="w-full bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
              value={lobbySettings.gameType}
              onChange={(e) => setLobbySettings({...lobbySettings, gameType: e.target.value})}
            >
              {gameTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-2 block">Time Control</label>
            <select 
              className="w-full bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10"
              value={lobbySettings.timeControl}
              onChange={(e) => setLobbySettings({...lobbySettings, timeControl: e.target.value})}
            >
              {timeControls.map(tc => (
                <option key={tc.id} value={tc.id}>{tc.name}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-300 text-sm">Private Lobby</span>
            <button
              onClick={() => setLobbySettings({...lobbySettings, isPrivate: !lobbySettings.isPrivate})}
              className={`w-12 h-6 rounded-full transition-colors ${
                lobbySettings.isPrivate ? 'bg-amber-500' : 'bg-gray-600'
              }`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transform transition-transform ${
                lobbySettings.isPrivate ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>

          <button
            onClick={handleCreateLobby}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg transition mt-4"
          >
            Create Lobby
          </button>
        </div>
      </div>
    </div>
  );
}

// Quick Match Modal
function QuickMatchModal({ isOpen, onClose, onMatchFound }) {
  const [searching, setSearching] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    if (searching) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [searching]);

  const handleSearch = () => {
    setSearching(true);
    setTimeout(() => {
      setSearching(false);
      setTimeElapsed(0);
      const matchData = {
        opponent: {
          name: 'Player_' + Math.floor(Math.random() * 1000),
          rating: 1200 + Math.floor(Math.random() * 400)
        },
        gameType: 'Standard',
        timeControl: '10+0'
      };
      onMatchFound(matchData);
      onClose();
    }, 3000 + Math.random() * 2000);
  };

  const handleCancel = () => {
    setSearching(false);
    setTimeElapsed(0);
  };

  if (!isOpen) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Quick Match</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {!searching ? (
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">Find an opponent instantly based on your skill level</p>
            <button
              onClick={handleSearch}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Search size={18} />
              Start Searching
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
            </div>
            <p className="text-center text-amber-400">Searching for opponent...</p>
            <p className="text-center text-gray-500 text-sm">Time: {formatTime(timeElapsed)}</p>
            <button
              onClick={handleCancel}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-2 rounded-lg transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Add User Modal
function AddUserModal({ isOpen, onClose, onAddUser }) {
  const [userId, setUserId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    if (!userId.trim()) return;
    
    setSearching(true);
    setTimeout(() => {
      setSearchResult({
        id: userId,
        name: 'Player_' + userId,
        rating: 1300,
        status: 'online'
      });
      setSearching(false);
    }, 1000);
  };

  const handleAddUser = () => {
    if (searchResult) {
      onAddUser(searchResult);
      setUserId('');
      setSearchResult(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
      <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Add Player</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
            >
              {searching ? '...' : 'Search'}
            </button>
          </div>

          {searchResult && (
            <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{searchResult.name}</p>
                  <p className="text-gray-400 text-xs">Rating: {searchResult.rating}</p>
                </div>
                <span className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  {searchResult.status}
                </span>
              </div>
              <button
                onClick={handleAddUser}
                className="w-full mt-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-1 rounded text-sm transition flex items-center justify-center gap-1"
              >
                <UserPlus size={14} />
                Add to Game
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Lobby Display Component
function LobbyDisplay({ lobby, onStartGame, onInviteFriend, onClose, gameState, setGameState }) {
  const [copied, setCopied] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lobby.lobbyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddUser = (user) => {
    if (lobby && setGameState) {
      const updatedLobby = {
        ...lobby,
        players: [...lobby.players, { 
          id: user.id, 
          name: user.name, 
          rating: user.rating,
          ready: true
        }]
      };
      
      setGameState({
        ...gameState,
        lobbyData: updatedLobby,
        players: updatedLobby.players
      });
    }
  };

  const handleToggleReady = () => {
    if (setGameState && lobby) {
      const updatedPlayers = lobby.players.map((player, index) => {
        if (index === 0) {
          return { ...player, ready: !player.ready };
        }
        return player;
      });
      
      setGameState({
        ...gameState,
        lobbyData: {
          ...lobby,
          players: updatedPlayers
        },
        players: updatedPlayers
      });
    }
  };

  const canStartGame = lobby?.players?.some(p => p.isComputer) 
    ? true 
    : lobby?.players?.length === 2 && lobby?.players?.every(p => p.ready);

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
            <span className="text-gray-400 text-sm">Lobby Code:</span>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-mono font-bold">{lobby?.lobbyCode}</span>
              <button
                onClick={handleCopyCode}
                className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
              >
                <Copy size={12} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Game Type:</span>
              <span className="text-white text-sm capitalize">{lobby?.gameType || 'Standard'} Chess</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Time Control:</span>
              <span className="text-white text-sm">{lobby?.timeControl}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Visibility:</span>
              <span className="text-white text-sm">{lobby?.isPrivate ? 'Private' : 'Public'}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-4 mb-4">
            <p className="text-gray-400 text-sm mb-3">Players ({lobby?.players?.length || 0}/2):</p>
            <div className="space-y-2">
              {lobby?.players?.map((player, index) => (
                <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-amber-500/20' : player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
                    }`}>
                      <span className={`text-sm font-bold ${
                        index === 0 ? 'text-amber-400' : player.isComputer ? 'text-gray-400' : 'text-blue-400'
                      }`}>
                        {player.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-white text-sm">{player.name}</span>
                      {index === 0 && (
                        <span className="text-amber-400 text-xs ml-2">(You)</span>
                      )}
                      {player.isComputer && (
                        <span className="text-gray-500 text-xs ml-2">(Computer)</span>
                      )}
                      {!player.isComputer && index > 0 && (
                        <span className="text-blue-400 text-xs ml-2">(Opponent)</span>
                      )}
                    </div>
                  </div>
                  {index === 0 && !player.isComputer ? (
                    <button
                      onClick={handleToggleReady}
                      className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
                        player.ready 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {player.ready ? <Check size={12} /> : <Timer size={12} />}
                      {player.ready ? 'Ready' : 'Not Ready'}
                    </button>
                  ) : (
                    <span className={`flex items-center gap-1 text-xs ${
                      player.ready ? 'text-green-400' : 'text-gray-500'
                    }`}>
                      {player.ready && <Check size={12} />}
                      {player.ready ? 'Ready' : 'Not Ready'}
                    </span>
                  )}
                </div>
              ))}
              
              {lobby?.players?.length < 2 && !lobby?.players?.some(p => p.isComputer) && (
                <div className="bg-[#2a1a13]/50 p-2 rounded-lg border border-dashed border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">?</span>
                    </div>
                    <span className="text-gray-500 text-sm">Waiting for player...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {!lobby?.players?.some(p => p.isComputer) && lobby?.players?.length < 2 && (
              <button
                onClick={() => setShowAddUser(true)}
                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
              >
                <UserPlus size={16} />
                Invite
              </button>
            )}
            <button
              onClick={onStartGame}
              disabled={!canStartGame}
              className={`${
                !lobby?.players?.some(p => p.isComputer) && lobby?.players?.length < 2 ? 'flex-1' : 'w-full'
              } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
            >
              <Swords size={16} />
              {canStartGame ? 'Start Game' : 'Waiting for players...'}
            </button>
          </div>
        </div>
      </div>

      {showAddUser && (
        <AddUserModal
          isOpen={showAddUser}
          onClose={() => setShowAddUser(false)}
          onAddUser={(user) => {
            handleAddUser(user);
            setShowAddUser(false);
          }}
        />
      )}
    </>
  );
}

// Dropdown Menu Component
function PlayDropdown({ isOpen, onClose, onSelect }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const playOptions = [
    { 
      name: "Create Lobby", 
      icon: <Swords size={15} />, 
      description: "Start a new game with custom settings",
      action: "create-lobby"
    },
    { 
      name: "Quick Match", 
      icon: <Timer size={15} />, 
      description: "Find an opponent instantly",
      action: "quick-match"
    },
    { 
      name: "Play vs Computer", 
      icon: <Bot size={15} />, 
      description: "Practice against AI",
      action: "vs-computer"
    },
    { 
      name: "Tournaments", 
      icon: <Users2 size={15} />, 
      description: "Join competitive events",
      action: "tournaments"
    },
  ];

  return (
    <div 
      ref={dropdownRef}
      className="absolute left-0 top-full mt-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
    >
      <div className="py-2">
        {playOptions.map((option) => (
          <button
            key={option.name}
            className="w-full px-4 py-3 flex items-start gap-3 hover:bg-white/5 transition-colors text-left group"
            onClick={() => {
              onSelect(option.action);
              onClose();
            }}
          >
            <span className="text-amber-400 mt-0.5">{option.icon}</span>
            <div className="flex-1">
              <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
                {option.name}
              </div>
              <div className="text-gray-500 text-xs mt-0.5">
                {option.description}
              </div>
            </div>
          </button>
        ))}
        
        <div className="my-2 border-t border-white/5" />
        
        <button
          className="w-full px-4 py-2 flex items-center gap-3 hover:bg-white/5 transition-colors text-left"
          onClick={() => {
            onSelect("custom-settings");
            onClose();
          }}
        >
          <span className="text-gray-400 text-xs">⚙️</span>
          <span className="text-gray-300 text-sm">Custom Game Settings</span>
        </button>
      </div>
    </div>
  );
}

// Main Sidebar Component
export default function Sidebar({ activeItem, onItemClick, gameState, setGameState }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showCreateLobby, setShowCreateLobby] = useState(false);
  const [showQuickMatch, setShowQuickMatch] = useState(false);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for lobby data from navigation
  useEffect(() => {
    if (location.state?.lobbyData && setGameState) {
      setGameState({
        ...gameState,
        status: 'lobby',
        lobbyData: location.state.lobbyData,
        players: location.state.lobbyData.players,
        showLobbyModal: true
      });
      
      // Clear the location state to prevent showing again on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location.state, setGameState, gameState]);

  const menuItems = [
    { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
    { name: "Puzzles", icon: <Puzzle size={15} /> },
    { name: "Learn", icon: <GraduationCap size={15} /> },
    { name: "Watch", icon: <Eye size={15} /> },
    { name: "Social", icon: <Users size={15} /> },
    { name: "More", icon: <MoreHorizontal size={15} /> },
  ];

  const bottomItems = [
    { name: "Dark mode", icon: <Moon size={15} /> },
    { name: "Settings", icon: <Settings size={15} /> },
    { name: "Support", icon: <LifeBuoy size={15} /> },
  ];

  const handleBottomItemClick = (itemName) => {
    if (itemName === "Settings") {
      navigate('/settings');
    } else if (itemName === "Support") {
      navigate('/support');
    }
  };

  const handleMouseEnter = (itemName) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (itemName === "Play") {
      setOpenDropdown("Play");
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  const handleDropdownSelect = (action) => {
    if (action === "create-lobby") {
      setShowCreateLobby(true);
    } else if (action === "quick-match") {
      setShowQuickMatch(true);
    } else if (action === "vs-computer") {
      navigate('/time-control', { state: { gameMode: 'vs-computer' } });
    } else if (action === "tournaments") {
      // Navigate to tournament page (MainPage)
      navigate('/tournament');
    } else if (action === "custom-settings") {
      navigate('/custom-settings');
    }
  };

  const handleMenuItemClick = (itemName) => {
    if (itemName === "Puzzles") {
      navigate('/puzzles');
    } else if (itemName === "Learn") {
      navigate('/chess-learning');
    } else if (itemName === "Watch") {
      navigate('/watch');
    } else if (itemName === "Social") {
      navigate('/social');
    } else if (itemName === "More") {
      navigate('/more');
    } else {
      onItemClick(itemName);
    }
  };

  const handleCreateLobby = (lobbyData) => {
    if (setGameState) {
      setGameState({
        ...gameState,
        status: 'lobby',
        lobbyData: lobbyData,
        players: lobbyData.players,
        showLobbyModal: true
      });
    }
    onItemClick("Lobby Created");
  };

  const handleMatchFound = (matchData) => {
    const lobbyData = {
      lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
      gameType: 'online',
      timeControl: '10+0',
      isPrivate: false,
      players: [
        { name: 'You', rating: 1450, ready: true },
        { name: matchData.opponent.name, rating: matchData.opponent.rating, ready: true }
      ]
    };
    
    if (setGameState) {
      setGameState({
        ...gameState,
        status: 'playing',
        gameMode: 'online',
        timeControl: '10+0',
        lobbyData: lobbyData,
        players: lobbyData.players,
        showLobbyModal: false
      });
    }
    
    // Navigate directly to game
    navigate(`/game/online/10+0`, { 
      state: { lobbyData: lobbyData } 
    });
  };

  const handleStartGame = () => {
    const currentLobby = gameState?.lobbyData;
    if (currentLobby && setGameState) {
      const canStart = currentLobby.players.some(p => p.isComputer) 
        ? true 
        : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
      if (canStart) {
        setGameState({
          ...gameState,
          status: 'playing',
          showLobbyModal: false
        });
        
        if (currentLobby.players.some(p => p.isComputer)) {
          navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
            state: { lobbyData: currentLobby } 
          });
        } else {
          navigate(`/game/online/${currentLobby.timeControl}`, { 
            state: { lobbyData: currentLobby } 
          });
        }
      }
    }
  };

  const handleCloseLobby = () => {
    if (setGameState) {
      setGameState({
        ...gameState,
        showLobbyModal: false,
        lobbyData: null
      });
    }
  };

  return (
    <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
      <div className="flex items-center gap-3 px-6 py-8">
        <Crown className="text-amber-400" size={28} />
        <div>
          <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
          <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
        {menuItems.map((item) => {
          const isActive = activeItem === item.name;
          
          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleMenuItemClick(item.name)}
                className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
                  ${
                    isActive
                      ? "bg-[#FFA20026] text-white"
                      : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
                  }`}
              >
                <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
                {item.name}
              </button>
              
              {item.name === "Play" && (
                <PlayDropdown 
                  isOpen={openDropdown === "Play"}
                  onClose={() => setOpenDropdown(null)}
                  onSelect={handleDropdownSelect}
                />
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm">
        {bottomItems.map((item) => (
          <BottomItem 
            key={item.name}
            icon={item.icon} 
            label={item.name}
            onClick={() => handleBottomItemClick(item.name)}
          />
        ))}
      </div>

      <CreateLobbyModal 
        isOpen={showCreateLobby}
        onClose={() => setShowCreateLobby(false)}
        onCreateLobby={handleCreateLobby}
      />

      <QuickMatchModal
        isOpen={showQuickMatch}
        onClose={() => setShowQuickMatch(false)}
        onMatchFound={handleMatchFound}
      />

      {gameState?.showLobbyModal && gameState?.lobbyData && (
        <LobbyDisplay 
          lobby={gameState.lobbyData}
          onStartGame={handleStartGame}
          onInviteFriend={() => {}}
          onClose={handleCloseLobby}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
    </div>
  );
}