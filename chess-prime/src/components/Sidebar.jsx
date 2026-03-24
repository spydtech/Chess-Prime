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
//           ready: true
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
//         if (index === 0) {
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
//       navigate('/settings');
//     } else if (itemName === "Support") {
//       navigate('/support');
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
//       // Navigate to tournament page (MainPage)
//       navigate('/tournament');
//     } else if (action === "custom-settings") {
//       navigate('/custom-settings');
//     }
//   };

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "Puzzles") {
//       navigate('/puzzles');
//     } else if (itemName === "Learn") {
//       navigate('/chess-learning');
//     } else if (itemName === "Watch") {
//       navigate('/watch');
//     } else if (itemName === "Social") {
//       navigate('/social');
//     } else if (itemName === "More") {
//       navigate('/more');
//     } else {
//       onItemClick(itemName);
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

//       <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
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
//                 onClick={() => handleMenuItemClick(item.name)}
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
//   Volume2,
//   Bot,
//   Timer,
//   Search,
//   User,
//   Bell,  
//   Globe,
//   X,
//   Check,
//   UserPlus,
//   Image,
//   LogOut,
//   UserCircle,
//   Copy,
//   Grid, // Add Grid here
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import QuickMatchModal from './pagescomponents/QuickMatchModal'

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
//           ready: true
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
//         if (index === 0) {
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


// function SettingsDropdown({ isOpen, onClose, onSelect }) {
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

//   const settingsOptions = [
//     { 
//       name: "Language", 
//       icon: <Globe size={15} />, 
//       description: "English, Spanish, French, etc.",
//       action: "language"
//     },
//     { 
//       name: "Sound", 
//       icon: <Volume2 size={15} />, 
//       description: "Effects, music, notifications",
//       action: "sound"
//     },
//     { 
//       name: "Background", 
//       icon: <Image size={15} />, 
//       description: "Theme, colors, appearance",
//       action: "background"
//     },
//     { 
//       name: "Board", 
//       icon: <Grid size={15} />, 
//       description: "Piece style, board theme",
//       action: "board"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Settings</h3>
//         </div>
//         {settingsOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Profile Dropdown Component
// function ProfileDropdown({ isOpen, onClose, onSelect }) {
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

//   const profileOptions = [
//     { 
//       name: "View Profile", 
//       icon: <UserCircle size={15} />, 
//       description: "See your stats and games",
//       action: "view-profile"
//     },
//     { 
//       name: "Sign Out", 
//       icon: <LogOut size={15} />, 
//       description: "Log out of your account",
//       action: "signout"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Profile</h3>
//         </div>
//         {profileOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }
// // Main Sidebar Component
// export default function Sidebar({ activeItem, onItemClick, gameState, setGameState }) {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
//   const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const timeoutRef = useRef(null);
//   const settingsButtonRef = useRef(null);
//   const profileButtonRef = useRef(null);
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


//   // Close settings dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
//         setOpenSettingsDropdown(false);
//       }
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
//         setOpenProfileDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//  const bottomItems = [
//   { name: "Notification", icon: <Bell size={15} /> },
//   { name: "Dark mode", icon: <Moon size={15} /> },
//   { name: "Profile", icon: <UserCircle size={15} /> }, // Add Profile here
//   { name: "Settings", icon: <Settings size={15} /> },
//   { name: "Support", icon: <LifeBuoy size={15} /> },
// ];

//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       setOpenSettingsDropdown(!openSettingsDropdown);
//       setOpenProfileDropdown(false);
//     } else if (itemName === "Profile") {
//       setOpenProfileDropdown(!openProfileDropdown);
//       setOpenSettingsDropdown(false);
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleSettingsSelect = (action) => {
//     if (action === "language") {
//       onItemClick("Language Settings");
//     } else if (action === "sound") {
//       onItemClick("Sound Settings");
//     } else if (action === "background") {
//       onItemClick("Background Settings");
//     } else if (action === "board") {
//       onItemClick("Board Settings");
//       navigate('/board-style');
//     }
//   };
//   const handleProfileSelect = (action) => {
//     if (action === "view-profile") {
//       onItemClick("View Profile");
//       navigate('/profile');
//     } else if (action === "signout") {
//       onItemClick("Sign Out");
//       // Add your sign out logic here
//       localStorage.removeItem('token');
//       navigate('/login');
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
//       navigate('/tournament');
//     } else if (action === "custom-settings") {
//       navigate('/custom-settings');
//     }
//   };

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "Puzzles") {
//       navigate('/puzzles');
//     } else if (itemName === "Learn") {
//       navigate('/chess-learning');
//     } else if (itemName === "Watch") {
//       navigate('/watch');
//     } else if (itemName === "Social") {
//       navigate('/social');
//     } else if (itemName === "More") {
//       navigate('/more');
//     } else {
//       onItemClick(itemName);
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
//       timeControl: matchData.timeControl,
//       isPrivate: false,
//       players: [
//         { 
//           id: 'current-user', 
//           name: 'You', 
//           rating: 1450, 
//           ready: true 
//         },
//         { 
//           id: 'opponent-' + Date.now(), 
//           name: matchData.opponent.name, 
//           rating: matchData.opponent.rating, 
//           ready: true 
//         }
//       ]
//     };
    
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'playing',
//         gameMode: 'online',
//         timeControl: matchData.timeControl,
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: false
//       });
//     }
    
//     // Navigate directly to game with the selected time control
//     navigate(`/game/online/${matchData.timeControl}`, { 
//       state: { 
//         lobbyData: lobbyData,
//         opponent: matchData.opponent 
//       } 
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
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 162, 0, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 162, 0, 0.5);
//         }
//       `}</style>

//       <div className="flex items-center gap-3 px-6 py-8">
//         <Crown className="text-amber-400" size={28} />
//         <div>
//           <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//           <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//         </div>
//       </div>

//       <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
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
//                 onClick={() => handleMenuItemClick(item.name)}
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

//       <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm relative">
//         {bottomItems.map((item) => (
//           <div
//             key={item.name}
//             ref={
//               item.name === "Settings" ? settingsButtonRef : 
//               item.name === "Profile" ? profileButtonRef : 
//               null
//             }
//             className="relative"
//           >
//             <BottomItem 
//               icon={item.icon} 
//               label={item.name}
//               onClick={() => handleBottomItemClick(item.name)}
//             />
            
//             {/* Settings Dropdown */}
//             {item.name === "Settings" && (
//               <SettingsDropdown 
//                 isOpen={openSettingsDropdown}
//                 onClose={() => setOpenSettingsDropdown(false)}
//                 onSelect={handleSettingsSelect}
//               />
//             )}

//             {/* Profile Dropdown */}
//             {item.name === "Profile" && (
//               <ProfileDropdown 
//                 isOpen={openProfileDropdown}
//                 onClose={() => setOpenProfileDropdown(false)}
//                 onSelect={handleProfileSelect}
//               />
//             )}
//           </div>
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



// // components/Sidebar.jsx
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
//   Volume2,
//   Bot,
//   Timer,
//   Bell,  
//   Globe,
//   X,
//   Check,
//   UserPlus,
//   Image,
//   LogOut,
//   UserCircle,
//   Copy,
//   Grid,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import QuickMatchModal from './pagescomponents/QuickMatchModal';
// import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext';
// import { useGame } from '../context/GameContext';

// // Invitation Notification Component
// function InvitationNotification({ isOpen, onClose, invitation, onAccept, onDecline }) {
//   if (!isOpen || !invitation) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Game Invitation</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-[#2a1a13] p-4 rounded-lg">
//             <p className="text-white mb-2">
//               <span className="font-bold">{invitation.inviterName}</span> invited you to join a game
//             </p>
//             <div className="space-y-1 text-sm">
//               <p className="text-gray-400">Game Type: <span className="text-white capitalize">{invitation.gameType} Chess</span></p>
//               <p className="text-gray-400">Time Control: <span className="text-white">{invitation.timeControl}</span></p>
//               <p className="text-gray-400">Lobby Code: <span className="text-amber-400 font-mono">{invitation.lobbyCode}</span></p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={onAccept}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
//             >
//               Accept
//             </button>
//             <button
//               onClick={onDecline}
//               className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add User Modal with Backend Integration - FIXED
// // function AddUserModal({ isOpen, onClose, lobbyCode, onInviteSent }) {
// //   const [userId, setUserId] = useState('');
// //   const [searchResult, setSearchResult] = useState(null);
// //   const [searching, setSearching] = useState(false);
// //   const [inviting, setInviting] = useState(false);
// //   const [error, setError] = useState('');
// //   const { inviteToLobby } = useGame();
// //   const { user } = useAuth();

// //   const handleSearch = async () => {
// //     if (!userId.trim()) return;
    
// //     setSearching(true);
// //     setError('');
    
// //     try {
// //       // Simulate search - in real app, you'd call an API
// //       setTimeout(() => {
// //         setSearchResult({
// //           _id: userId,
// //           name: userId,
// //           isOnline: true,
// //           rating: 1200
// //         });
// //         setSearching(false);
// //       }, 500);
// //     } catch (error) {
// //       console.error('Search error:', error);
// //       setError('Failed to search user');
// //       setSearching(false);
// //     }
// //   };

// //   const handleSendInvitation = async () => {
// //     if (!searchResult) return;
    
// //     setInviting(true);
// //     setError('');
    
// //     try {
// //       console.log(`📤 Sending invitation from ${user?._id} to ${searchResult._id} for lobby ${lobbyCode}`);
      
// //       const result = await inviteToLobby(lobbyCode, searchResult._id);
      
// //       console.log('📥 Invitation result:', result);
      
// //       if (result.success) {
// //         console.log('✅ Invitation sent successfully');
// //         onInviteSent(searchResult);
// //         setUserId('');
// //         setSearchResult(null);
// //         onClose();
// //       } else {
// //         console.error('❌ Invitation failed:', result.message);
// //         setError(result.message || 'Failed to send invitation');
// //       }
// //     } catch (error) {
// //       console.error('❌ Invitation error:', error);
// //       setError(error.message || 'Failed to send invitation');
// //     } finally {
// //       setInviting(false);
// //     }
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
// //       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-white text-lg font-semibold">Invite Player</h2>
// //           <button onClick={onClose} className="text-gray-400 hover:text-white">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {error && (
// //           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
// //             {error}
// //           </div>
// //         )}

// //         <div className="space-y-4">
// //           <div>
// //             <label className="text-gray-400 text-xs mb-2 block">Enter User ID</label>
// //             <div className="flex gap-2">
// //               <input
// //                 type="text"
// //                 placeholder="User ID"
// //                 value={userId}
// //                 onChange={(e) => setUserId(e.target.value)}
// //                 className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
// //               />
// //               <button
// //                 onClick={handleSearch}
// //                 disabled={searching || !userId.trim()}
// //                 className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
// //               >
// //                 {searching ? '...' : 'Search'}
// //               </button>
// //             </div>
// //           </div>

// //           {searchResult && (
// //             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
// //               <div className="flex items-center justify-between mb-2">
// //                 <div>
// //                   <p className="text-white font-medium">{searchResult.name}</p>
// //                   <p className="text-gray-400 text-xs">ID: {searchResult._id}</p>
// //                 </div>
// //               </div>
// //               <button
// //                 onClick={handleSendInvitation}
// //                 disabled={inviting}
// //                 className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
// //               >
// //                 {inviting ? 'Sending...' : 'Send Invitation'}
// //               </button>
// //             </div>
// //           )}

// //           <p className="text-gray-500 text-xs text-center">
// //             Enter the user ID to send an invitation
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// //testing
// // Add User Modal with Backend Integration - FIXED
// function AddUserModal({ isOpen, onClose, lobbyCode, onInviteSent }) {
//   const [userId, setUserId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);
//   const [inviting, setInviting] = useState(false);
//   const [error, setError] = useState('');
//   const { inviteToLobby } = useGame();
//   const { user } = useAuth();

//   const handleSearch = async () => {
//     if (!userId.trim()) return;
    
//     setSearching(true);
//     setError('');
    
//     try {
//       // In a real app, you'd call an API to search for users
//       // For now, we'll simulate a search
//       setTimeout(() => {
//         setSearchResult({
//           _id: userId,
//           name: `User ${userId}`,
//           isOnline: true,
//           rating: 1200
//         });
//         setSearching(false);
//       }, 500);
//     } catch (error) {
//       console.error('Search error:', error);
//       setError('Failed to search user');
//       setSearching(false);
//     }
//   };

//   const handleSendInvitation = async () => {
//     if (!searchResult) return;
    
//     setInviting(true);
//     setError('');
    
//     try {
//       console.log(`📤 Sending invitation from ${user?._id} to ${searchResult._id} for lobby ${lobbyCode}`);
      
//       const result = await inviteToLobby(lobbyCode, searchResult._id);
      
//       console.log('📥 Invitation result:', result);
      
//       if (result.success) {
//         console.log('✅ Invitation sent successfully');
//         onInviteSent(searchResult);
//         setUserId('');
//         setSearchResult(null);
//         onClose();
//       } else {
//         console.error('❌ Invitation failed:', result.message);
//         setError(result.message || 'Failed to send invitation');
//       }
//     } catch (error) {
//       console.error('❌ Invitation error:', error);
//       setError(error.message || 'Failed to send invitation');
//     } finally {
//       setInviting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Invite Player</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Enter User ID</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={searching || !userId.trim()}
//                 className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
//               >
//                 {searching ? '...' : 'Search'}
//               </button>
//             </div>
//           </div>

//           {searchResult && (
//             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
//               <div className="flex items-center justify-between mb-2">
//                 <div>
//                   <p className="text-white font-medium">{searchResult.name}</p>
//                   <p className="text-gray-400 text-xs">ID: {searchResult._id}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSendInvitation}
//                 disabled={inviting}
//                 className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
//               >
//                 {inviting ? 'Sending...' : 'Send Invitation'}
//               </button>
//             </div>
//           )}

//           <p className="text-gray-500 text-xs text-center">
//             Enter the user ID to send an invitation
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Lobby Display Component - FIXED with proper user identification
// // function LobbyDisplay({ lobby, onStartGame, onClose, gameState, setGameState, currentUser }) {
// //   const [copied, setCopied] = useState(false);
// //   const [showAddUser, setShowAddUser] = useState(false);
// //   const [invitationSent, setInvitationSent] = useState(null);
// //   const { toggleReady, getLobby } = useGame();
// //   const { user: authUser } = useAuth();
// //   const { socket, on, off } = useSocket();

// //   // Get the effective user (prioritize prop, then context)
// //   const effectiveUser = currentUser || authUser;
  
// //   // Log user info for debugging
// //   useEffect(() => {
// //     console.log('👤 LobbyDisplay - Effective User:', effectiveUser);
// //     console.log('👤 LobbyDisplay - Current User (prop):', currentUser);
// //     console.log('👤 LobbyDisplay - Auth User:', authUser);
// //     console.log('🏠 LobbyDisplay - Lobby Creator:', lobby.createdBy);
// //     console.log('🏠 LobbyDisplay - Lobby Data:', lobby);
// //   }, [effectiveUser, currentUser, authUser, lobby]);

// //   // Extract user ID from multiple possible locations
// //   const getUserId = (user) => {
// //     if (!user) return null;
// //     return user._id || user.id || user.userId || user.uid || null;
// //   };

// //   // Extract creator ID from multiple possible locations
// //   const getCreatorId = (creator) => {
// //     if (!creator) return null;
// //     // If creator is an object with _id
// //     if (typeof creator === 'object') {
// //       return creator._id || creator.id || creator.userId || creator.uid || null;
// //     }
// //     // If creator is directly the ID string
// //     return creator;
// //   };

// //   const currentUserId = getUserId(effectiveUser);
// //   const lobbyCreatorId = getCreatorId(lobby.createdBy);
  
// //   // Compare as strings to handle different types
// //   const isCreator = currentUserId && lobbyCreatorId && 
// //                    String(currentUserId) === String(lobbyCreatorId);

// //   // Log the comparison
// //   useEffect(() => {
// //     console.log('🔍 User ID comparison:', {
// //       currentUserId,
// //       lobbyCreatorId,
// //       isCreator,
// //       currentUserIdType: typeof currentUserId,
// //       lobbyCreatorIdType: typeof lobbyCreatorId,
// //       equal: currentUserId === lobbyCreatorId,
// //       stringEqual: String(currentUserId) === String(lobbyCreatorId)
// //     });
// //   }, [currentUserId, lobbyCreatorId, isCreator]);

// //   // Listen for lobby updates via socket
// //   useEffect(() => {
// //     if (!socket || !lobby?.lobbyCode) {
// //       console.log('🔌 Socket or lobby not available for LobbyDisplay');
// //       return;
// //     }

// //     console.log('🔌 Setting up socket listeners in LobbyDisplay for lobby:', lobby.lobbyCode);

// //     const handleLobbyUpdate = (data) => {
// //       console.log('🔄 Lobby update received in LobbyDisplay:', data);
      
// //       if (data.lobby?.lobbyCode === lobby.lobbyCode) {
// //         console.log('✅ This update is for our lobby!');
        
// //         if (setGameState) {
// //           setGameState((prevState) => ({
// //             ...prevState,
// //             lobbyData: data.lobby,
// //             players: data.lobby.players
// //           }));
// //         }
// //       }
// //     };

// //     const handlePlayerJoined = (data) => {
// //       console.log('👤 Player joined event in LobbyDisplay:', data);
      
// //       if (data.lobbyCode === lobby.lobbyCode) {
// //         console.log('✅ Player joined our lobby!');
        
// //         // Fetch the latest lobby data
// //         fetchLatestLobbyData();
        
// //         if (setGameState && data.lobby) {
// //           setGameState((prevState) => ({
// //             ...prevState,
// //             lobbyData: data.lobby,
// //             players: data.lobby.players
// //           }));
// //         }
// //       }
// //     };

// //     // Function to fetch the latest lobby data
// //     const fetchLatestLobbyData = async () => {
// //       try {
// //         console.log('📡 Fetching latest lobby data for code:', lobby.lobbyCode);
// //         const result = await getLobby(lobby.lobbyCode);
// //         console.log('📥 getLobby response:', result);
        
// //         if (result.success && result.lobby) {
// //           setGameState((prevState) => ({
// //             ...prevState,
// //             lobbyData: result.lobby,
// //             players: result.lobby.players
// //           }));
// //         }
// //       } catch (error) {
// //         console.error('❌ Error fetching latest lobby:', error);
// //       }
// //     };

// //     const handlePlayerReady = (data) => {
// //       console.log('✅ Player ready event in LobbyDisplay:', data);
      
// //       if (data.lobbyCode === lobby.lobbyCode) {
// //         console.log('✅ Ready status changed in our lobby');
        
// //         if (setGameState) {
// //           setGameState((prevState) => ({
// //             ...prevState,
// //             lobbyData: data.lobby,
// //             players: data.lobby.players
// //           }));
// //         }
// //       }
// //     };

// //     const handleGameStarted = (data) => {
// //       console.log('🎮 Game started event in LobbyDisplay:', data);
      
// //       if (data.lobbyCode === lobby.lobbyCode) {
// //         console.log('✅ Game starting for our lobby! Closing modal...');
// //         if (onClose) {
// //           onClose();
// //         }
// //       }
// //     };

// //     // Register socket listeners
// //     on('lobby-updated', handleLobbyUpdate);
// //     on('player-joined-lobby', handlePlayerJoined);
// //     on('player-ready', handlePlayerReady);
// //     on('game-started', handleGameStarted);

// //     return () => {
// //       console.log('🧹 Cleaning up LobbyDisplay socket listeners');
// //       off('lobby-updated', handleLobbyUpdate);
// //       off('player-joined-lobby', handlePlayerJoined);
// //       off('player-ready', handlePlayerReady);
// //       off('game-started', handleGameStarted);
// //     };
// //   }, [socket, lobby?.lobbyCode, setGameState, on, off, getLobby, onClose]);

// //   // Add periodic refresh as backup
// //   useEffect(() => {
// //     if (!lobby?.lobbyCode) return;
    
// //     console.log('⏰ Setting up periodic lobby data refresh for:', lobby.lobbyCode);
    
// //     const fetchLobbyData = async () => {
// //       try {
// //         console.log('📡 Periodic fetch: Getting latest lobby data');
// //         const result = await getLobby(lobby.lobbyCode);
// //         console.log('📥 Periodic fetch response:', result);
        
// //         if (result.success && result.lobby) {
// //           const oldCount = lobby.players?.length || 0;
// //           const newCount = result.lobby.players?.length || 0;
          
// //           if (newCount > oldCount) {
// //             console.log(`🔄 Player count changed from ${oldCount} to ${newCount}`);
            
// //             setGameState((prevState) => ({
// //               ...prevState,
// //               lobbyData: result.lobby,
// //               players: result.lobby.players
// //             }));
// //           }
// //         }
// //       } catch (error) {
// //         console.error('❌ Error in periodic fetch:', error);
// //       }
// //     };
    
// //     fetchLobbyData();
// //     const interval = setInterval(fetchLobbyData, 3000);
    
// //     return () => {
// //       console.log('🧹 Clearing periodic fetch interval');
// //       clearInterval(interval);
// //     };
// //   }, [lobby?.lobbyCode, getLobby, setGameState]);

// //   const handleCopyCode = () => {
// //     navigator.clipboard.writeText(lobby.lobbyCode);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const handleInviteSent = (user) => {
// //     setInvitationSent(user);
// //     setTimeout(() => setInvitationSent(null), 3000);
// //   };

// //   const handleToggleReady = async () => {
// //     const result = await toggleReady(lobby.lobbyCode);
    
// //     if (result.success && setGameState) {
// //       setGameState({
// //         ...gameState,
// //         lobbyData: result.lobby,
// //         players: result.lobby.players
// //       });
// //     }
// //   };

// //   const hasComputer = lobby.players?.some(p => p.isComputer === true);
// //   const hasSpaceForPlayer = (lobby.players?.length || 0) < 2;
  
// //   // Show invite button if:
// //   // 1. User is the creator
// //   // 2. No computer player in the lobby
// //   // 3. There's space for another player (less than 2 players)
// //   const showInviteButton = isCreator && !hasComputer && hasSpaceForPlayer;

// //   // Log the conditions for invite button
// //   useEffect(() => {
// //     console.log('🔘 Invite button conditions:', {
// //       isCreator,
// //       hasComputer,
// //       hasSpaceForPlayer,
// //       playerCount: lobby.players?.length,
// //       showInviteButton
// //     });
// //   }, [isCreator, hasComputer, hasSpaceForPlayer, lobby.players?.length, showInviteButton]);

// //   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
// //   const canStartGame = hasComputer ? true : allPlayersReady;

// //   return (
// //     <>
// //       <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
// //         <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
// //           <div className="flex justify-between items-center mb-4">
// //             <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
// //             <button onClick={onClose} className="text-gray-400 hover:text-white">
// //               <X size={20} />
// //             </button>
// //           </div>

// //           {/* Debug info - remove in production */}
// //           <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
// //             User: {currentUserId || 'none'} | Creator: {lobbyCreatorId || 'none'} | isCreator: {String(isCreator)}
// //           </div>

// //           {invitationSent && (
// //             <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
// //               Invitation sent to {invitationSent.name}
// //             </div>
// //           )}

// //           <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
// //             <span className="text-gray-400 text-sm">Lobby Code:</span>
// //             <div className="flex items-center gap-2">
// //               <span className="text-amber-400 font-mono font-bold">{lobby?.lobbyCode}</span>
// //               <button
// //                 onClick={handleCopyCode}
// //                 className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
// //               >
// //                 <Copy size={12} />
// //                 {copied ? 'Copied!' : 'Copy'}
// //               </button>
// //             </div>
// //           </div>

// //           <div className="space-y-2 mb-4">
// //             <div className="flex justify-between items-center">
// //               <span className="text-gray-400 text-sm">Game Type:</span>
// //               <span className="text-white text-sm capitalize">{lobby?.gameType || 'Standard'} Chess</span>
// //             </div>
// //             <div className="flex justify-between items-center">
// //               <span className="text-gray-400 text-sm">Time Control:</span>
// //               <span className="text-white text-sm">{lobby?.timeControl}</span>
// //             </div>
// //             <div className="flex justify-between items-center">
// //               <span className="text-gray-400 text-sm">Visibility:</span>
// //               <span className="text-white text-sm">{lobby?.isPrivate ? 'Private' : 'Public'}</span>
// //             </div>
// //           </div>

// //           <div className="border-t border-white/10 pt-4 mb-4">
// //             <p className="text-gray-400 text-sm mb-3">Players ({lobby?.players?.length || 0}/2):</p>
// //             <div className="space-y-2">
// //               {lobby?.players?.map((player, index) => {
// //                 const playerId = player.userId?._id || player.userId || player.id || player._id;
// //                 const isCurrentUser = currentUserId && playerId && 
// //                                      String(playerId) === String(currentUserId);
                
// //                 return (
// //                   <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
// //                     <div className="flex items-center gap-2">
// //                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //                         isCurrentUser ? 'bg-amber-500/20' : 
// //                         player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
// //                       }`}>
// //                         <span className={`text-sm font-bold ${
// //                           isCurrentUser ? 'text-amber-400' : 
// //                           player.isComputer ? 'text-gray-400' : 'text-blue-400'
// //                         }`}>
// //                           {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
// //                         </span>
// //                       </div>
// //                       <div>
// //                         <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
// //                         {isCurrentUser && (
// //                           <span className="text-amber-400 text-xs ml-2">(You)</span>
// //                         )}
// //                         {player.isComputer && (
// //                           <span className="text-gray-500 text-xs ml-2">(Computer)</span>
// //                         )}
// //                       </div>
// //                     </div>
// //                     {isCurrentUser && !player.isComputer ? (
// //                       <button
// //                         onClick={handleToggleReady}
// //                         className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
// //                           player.ready 
// //                             ? 'bg-green-500/20 text-green-400' 
// //                             : 'bg-yellow-500/20 text-yellow-400'
// //                         }`}
// //                       >
// //                         {player.ready ? <Check size={12} /> : <Timer size={12} />}
// //                         {player.ready ? 'Ready' : 'Not Ready'}
// //                       </button>
// //                     ) : (
// //                       <span className={`flex items-center gap-1 text-xs ${
// //                         player.ready ? 'text-green-400' : 'text-gray-500'
// //                       }`}>
// //                         {player.ready && <Check size={12} />}
// //                         {player.ready ? 'Ready' : 'Not Ready'}
// //                       </span>
// //                     )}
// //                   </div>
// //                 );
// //               })}
              
// //               {lobby?.players?.length < 2 && !lobby?.players?.some(p => p.isComputer) && (
// //                 <div className="bg-[#2a1a13]/50 p-2 rounded-lg border border-dashed border-white/10">
// //                   <div className="flex items-center gap-2">
// //                     <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center">
// //                       <span className="text-gray-500 text-sm">?</span>
// //                     </div>
// //                     <span className="text-gray-500 text-sm">Waiting for player...</span>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           <div className="flex gap-2">
// //             {/* Invite button condition */}
// //             {showInviteButton && (
// //               <button
// //                 onClick={() => setShowAddUser(true)}
// //                 className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
// //                 data-testid="invite-button"
// //               >
// //                 <UserPlus size={16} />
// //                 Invite
// //               </button>
// //             )}
            
// //             {/* Start game button width based on invite button presence */}
// //             <button
// //               onClick={onStartGame}
// //               disabled={!canStartGame || (!isCreator && lobby?.players?.length === 2)}
// //               className={`${
// //                 showInviteButton ? 'flex-1' : 'w-full'
// //               } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
// //             >
// //               <Swords size={16} />
// //               {canStartGame ? 'Start Game' : 'Waiting for players...'}
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {showAddUser && (
// //         <AddUserModal
// //           isOpen={showAddUser}
// //           onClose={() => setShowAddUser(false)}
// //           lobbyCode={lobby.lobbyCode}
// //           onInviteSent={handleInviteSent}
// //         />
// //       )}
// //     </>
// //   );
// // }

// //testing
// // Lobby Display Component - FIXED with proper user identification
// function LobbyDisplay({ lobby, onStartGame, onClose, gameState, setGameState, currentUser }) {
//   const [copied, setCopied] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [invitationSent, setInvitationSent] = useState(null);
//   const { toggleReady, getLobby } = useGame();
//   const { user: authUser } = useAuth();
//   const { socket, on, off } = useSocket();

//   // Get the effective user (prioritize prop, then context)
//   const effectiveUser = currentUser || authUser;
  
//   // Log user info for debugging
//   useEffect(() => {
//     console.log('👤 LobbyDisplay - Effective User:', effectiveUser);
//     console.log('👤 LobbyDisplay - Current User (prop):', currentUser);
//     console.log('👤 LobbyDisplay - Auth User:', authUser);
//     console.log('🏠 LobbyDisplay - Lobby Creator:', lobby.createdBy);
//     console.log('🏠 LobbyDisplay - Lobby Data:', lobby);
//   }, [effectiveUser, currentUser, authUser, lobby]);

//   // Extract user ID from multiple possible locations
//   const getUserId = (user) => {
//     if (!user) return null;
//     // Check all possible ID fields
//     return user._id || user.id || user.userId || user.uid || null;
//   };

//   // Extract creator ID from multiple possible locations
//   const getCreatorId = (creator) => {
//     if (!creator) return null;
//     // If creator is an object with _id
//     if (typeof creator === 'object') {
//       return creator._id || creator.id || creator.userId || creator.uid || null;
//     }
//     // If creator is directly the ID string
//     return creator;
//   };

//   const currentUserId = getUserId(effectiveUser);
//   const lobbyCreatorId = getCreatorId(lobby.createdBy);
  
//   // Compare as strings to handle different types
//   const isCreator = currentUserId && lobbyCreatorId && 
//                    String(currentUserId).trim() === String(lobbyCreatorId).trim();

//   // Log the comparison
//   useEffect(() => {
//     console.log('🔍 User ID comparison:', {
//       currentUserId,
//       lobbyCreatorId,
//       isCreator,
//       currentUserIdType: typeof currentUserId,
//       lobbyCreatorIdType: typeof lobbyCreatorId,
//       equal: currentUserId === lobbyCreatorId,
//       stringEqual: String(currentUserId) === String(lobbyCreatorId)
//     });
//   }, [currentUserId, lobbyCreatorId, isCreator]);

//   // Listen for lobby updates via socket
//   useEffect(() => {
//     if (!socket || !lobby?.lobbyCode) {
//       console.log('🔌 Socket or lobby not available for LobbyDisplay');
//       return;
//     }

//     console.log('🔌 Setting up socket listeners in LobbyDisplay for lobby:', lobby.lobbyCode);

//     const handleLobbyUpdate = (data) => {
//       console.log('🔄 Lobby update received in LobbyDisplay:', data);
      
//       if (data.lobby?.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ This update is for our lobby!');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: data.lobby,
//             players: data.lobby.players
//           }));
//         }
//       }
//     };

//     const handlePlayerJoined = (data) => {
//       console.log('👤 Player joined event in LobbyDisplay:', data);
      
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Player joined our lobby!');
        
//         // Fetch the latest lobby data
//         fetchLatestLobbyData();
        
//         if (setGameState && data.lobby) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: data.lobby,
//             players: data.lobby.players
//           }));
//         }
//       }
//     };

//     // Function to fetch the latest lobby data
//     const fetchLatestLobbyData = async () => {
//       try {
//         console.log('📡 Fetching latest lobby data for code:', lobby.lobbyCode);
//         const result = await getLobby(lobby.lobbyCode);
//         console.log('📥 getLobby response:', result);
        
//         if (result.success && result.lobby) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: result.lobby,
//             players: result.lobby.players
//           }));
//         }
//       } catch (error) {
//         console.error('❌ Error fetching latest lobby:', error);
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event in LobbyDisplay:', data);
      
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Ready status changed in our lobby');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: data.lobby,
//             players: data.lobby.players
//           }));
//         }
//       }
//     };

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event in LobbyDisplay:', data);
      
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Game starting for our lobby! Closing modal...');
//         if (onClose) {
//           onClose();
//         }
//       }
//     };

//     // Register socket listeners
//     on('lobby-updated', handleLobbyUpdate);
//     on('player-joined-lobby', handlePlayerJoined);
//     on('player-ready', handlePlayerReady);
//     on('game-started', handleGameStarted);

//     return () => {
//       console.log('🧹 Cleaning up LobbyDisplay socket listeners');
//       off('lobby-updated', handleLobbyUpdate);
//       off('player-joined-lobby', handlePlayerJoined);
//       off('player-ready', handlePlayerReady);
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, lobby?.lobbyCode, setGameState, on, off, getLobby, onClose]);

//   // Add periodic refresh as backup
//   useEffect(() => {
//     if (!lobby?.lobbyCode) return;
    
//     console.log('⏰ Setting up periodic lobby data refresh for:', lobby.lobbyCode);
    
//     const fetchLobbyData = async () => {
//       try {
//         console.log('📡 Periodic fetch: Getting latest lobby data');
//         const result = await getLobby(lobby.lobbyCode);
//         console.log('📥 Periodic fetch response:', result);
        
//         if (result.success && result.lobby) {
//           const oldCount = lobby.players?.length || 0;
//           const newCount = result.lobby.players?.length || 0;
          
//           if (newCount > oldCount) {
//             console.log(`🔄 Player count changed from ${oldCount} to ${newCount}`);
            
//             setGameState((prevState) => ({
//               ...prevState,
//               lobbyData: result.lobby,
//               players: result.lobby.players
//             }));
//           }
//         }
//       } catch (error) {
//         console.error('❌ Error in periodic fetch:', error);
//       }
//     };
    
//     fetchLobbyData();
//     const interval = setInterval(fetchLobbyData, 3000);
    
//     return () => {
//       console.log('🧹 Clearing periodic fetch interval');
//       clearInterval(interval);
//     };
//   }, [lobby?.lobbyCode, getLobby, setGameState]);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleInviteSent = (user) => {
//     setInvitationSent(user);
//     setTimeout(() => setInvitationSent(null), 3000);
//   };

//   const handleToggleReady = async () => {
//     const result = await toggleReady(lobby.lobbyCode);
    
//     if (result.success && setGameState) {
//       setGameState({
//         ...gameState,
//         lobbyData: result.lobby,
//         players: result.lobby.players
//       });
//     }
//   };

//   const hasComputer = lobby.players?.some(p => p.isComputer === true);
//   const hasSpaceForPlayer = (lobby.players?.length || 0) < 2;
  
//   // Show invite button if:
//   // 1. User is the creator
//   // 2. No computer player in the lobby
//   // 3. There's space for another player (less than 2 players)
//   const showInviteButton = isCreator && !hasComputer && hasSpaceForPlayer;

//   // Log the conditions for invite button
//   useEffect(() => {
//     console.log('🔘 Invite button conditions:', {
//       isCreator,
//       hasComputer,
//       hasSpaceForPlayer,
//       playerCount: lobby.players?.length,
//       showInviteButton
//     });
//   }, [isCreator, hasComputer, hasSpaceForPlayer, lobby.players?.length, showInviteButton]);

//   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
//   const canStartGame = hasComputer ? true : allPlayersReady;

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

//           {/* Debug info - remove in production */}
//           <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
//             User: {currentUserId || 'none'} | Creator: {lobbyCreatorId || 'none'} | isCreator: {String(isCreator)}
//           </div>

//           {invitationSent && (
//             <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
//               Invitation sent to {invitationSent.name}
//             </div>
//           )}

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
//               {lobby?.players?.map((player, index) => {
//                 const playerId = player.userId?._id || player.userId || player.id || player._id;
//                 const isCurrentUser = currentUserId && playerId && 
//                                      String(playerId).trim() === String(currentUserId).trim();
                
//                 return (
//                   <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         isCurrentUser ? 'bg-amber-500/20' : 
//                         player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
//                       }`}>
//                         <span className={`text-sm font-bold ${
//                           isCurrentUser ? 'text-amber-400' : 
//                           player.isComputer ? 'text-gray-400' : 'text-blue-400'
//                         }`}>
//                           {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
//                         {isCurrentUser && (
//                           <span className="text-amber-400 text-xs ml-2">(You)</span>
//                         )}
//                         {player.isComputer && (
//                           <span className="text-gray-500 text-xs ml-2">(Computer)</span>
//                         )}
//                       </div>
//                     </div>
//                     {isCurrentUser && !player.isComputer ? (
//                       <button
//                         onClick={handleToggleReady}
//                         className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
//                           player.ready 
//                             ? 'bg-green-500/20 text-green-400' 
//                             : 'bg-yellow-500/20 text-yellow-400'
//                         }`}
//                       >
//                         {player.ready ? <Check size={12} /> : <Timer size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </button>
//                     ) : (
//                       <span className={`flex items-center gap-1 text-xs ${
//                         player.ready ? 'text-green-400' : 'text-gray-500'
//                       }`}>
//                         {player.ready && <Check size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
              
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
//             {/* Invite button condition */}
//             {showInviteButton && (
//               <button
//                 onClick={() => setShowAddUser(true)}
//                 className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//                 data-testid="invite-button"
//               >
//                 <UserPlus size={16} />
//                 Invite
//               </button>
//             )}
            
//             {/* Start game button width based on invite button presence */}
//             <button
//               onClick={onStartGame}
//               disabled={!canStartGame || (!isCreator && lobby?.players?.length === 2)}
//               className={`${
//                 showInviteButton ? 'flex-1' : 'w-full'
//               } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
//             >
//               <Swords size={16} />
//               {canStartGame ? 'Start Game' : 'Waiting for players...'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAddUser && (
//         <AddUserModal
//           isOpen={showAddUser}
//           onClose={() => setShowAddUser(false)}
//           lobbyCode={lobby.lobbyCode}
//           onInviteSent={handleInviteSent}
//         />
//       )}
//     </>
//   );
// }
// // Create Lobby Modal
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
//     onCreateLobby(lobbySettings);
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

// // Play Dropdown Component
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

// // Settings Dropdown Component
// function SettingsDropdown({ isOpen, onClose, onSelect }) {
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

//   const settingsOptions = [
//     { 
//       name: "Language", 
//       icon: <Globe size={15} />, 
//       description: "English, Spanish, French, etc.",
//       action: "language"
//     },
//     { 
//       name: "Sound", 
//       icon: <Volume2 size={15} />, 
//       description: "Effects, music, notifications",
//       action: "sound"
//     },
//     { 
//       name: "Background", 
//       icon: <Image size={15} />, 
//       description: "Theme, colors, appearance",
//       action: "background"
//     },
//     { 
//       name: "Board", 
//       icon: <Grid size={15} />, 
//       description: "Piece style, board theme",
//       action: "board"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Settings</h3>
//         </div>
//         {settingsOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Profile Dropdown Component
// function ProfileDropdown({ isOpen, onClose, onSelect }) {
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

//   const profileOptions = [
//     { 
//       name: "View Profile", 
//       icon: <UserCircle size={15} />, 
//       description: "See your stats and games",
//       action: "view-profile"
//     },
//     { 
//       name: "Sign Out", 
//       icon: <LogOut size={15} />, 
//       description: "Log out of your account",
//       action: "signout"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Profile</h3>
//         </div>
//         {profileOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Main Sidebar Component
// export default function Sidebar({ 
//   activeItem = '', 
//   onItemClick = () => {}, 
//   gameState = { status: null, lobbyData: null, players: [], showLobbyModal: false }, 
//   setGameState = () => {} 
// }) {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
//   const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const [showInvitation, setShowInvitation] = useState(false);
//   const [currentInvitation, setCurrentInvitation] = useState(null);
  
//   const timeoutRef = useRef(null);
//   const settingsButtonRef = useRef(null);
//   const profileButtonRef = useRef(null);
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout } = useAuth();
//   const { socket, on, off } = useSocket();
//   const { 
//     createLobby: createLobbyAPI, 
//     joinLobby, 
//     startGameFromLobby,
//     pendingInvitations,
//     acceptInvitation,
//     declineInvitation,
//     lobby: contextLobby,
//     getLobby
//   } = useGame();

//   // Log user for debugging
//   useEffect(() => {
//     console.log('👤 Sidebar - Current User:', user);
//   }, [user]);

//   // Sync with context lobby
//   useEffect(() => {
//     if (contextLobby && setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: contextLobby,
//         players: contextLobby.players,
//         showLobbyModal: true
//       });
//     }
//   }, [contextLobby]);

//   // Listen for socket events
//   useEffect(() => {
//     if (!socket) {
//       console.log('🔌 Socket not available yet');
//       return;
//     }

//     console.log('🔌 Setting up socket listeners in Sidebar');

//     const handleInvitation = (data) => {
//       console.log('📨 Received invitation event:', data);
//       setCurrentInvitation(data);
//       setShowInvitation(true);
//     };

//     const handlePlayerJoined = (data) => {
//       console.log('👤 Player joined lobby event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('🔄 Updating lobby with player data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleLobbyUpdated = (data) => {
//       console.log('🔄 Lobby updated event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobby?.lobbyCode) {
//         console.log('🔄 Updating lobby with new data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event in sidebar:', data);
      
//       if (gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('✅ Game starting for our lobby! Redirecting player to game...');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             showLobbyModal: false,
//             lobbyData: null,
//             status: 'playing'
//           }));
//         }
        
//         navigate(`/game/online/${data.game.timeControl}`, { 
//           state: { 
//             gameData: data.game,
//             gameId: data.game.gameId
//           } 
//         });
//       }
//     };

//     on('lobby-invitation', handleInvitation);
//     on('player-joined-lobby', handlePlayerJoined);
//     on('lobby-updated', handleLobbyUpdated);
//     on('player-ready', handlePlayerReady);
//     on('game-started', handleGameStarted);

//     return () => {
//       console.log('🧹 Cleaning up socket listeners');
//       off('lobby-invitation', handleInvitation);
//       off('player-joined-lobby', handlePlayerJoined);
//       off('lobby-updated', handleLobbyUpdated);
//       off('player-ready', handlePlayerReady);
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, on, off, gameState?.lobbyData?.lobbyCode, setGameState, navigate]);

//   // Check for pending invitations
//   useEffect(() => {
//     if (pendingInvitations.length > 0) {
//       const latestInvitation = pendingInvitations[pendingInvitations.length - 1];
//       setCurrentInvitation(latestInvitation);
//       setShowInvitation(true);
//     }
//   }, [pendingInvitations]);

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
      
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state, setGameState, gameState]);

//   // Close settings dropdown when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
//         setOpenSettingsDropdown(false);
//       }
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
//         setOpenProfileDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//   const bottomItems = [
//     { name: "Notification", icon: <Bell size={15} /> },
//     { name: "Dark mode", icon: <Moon size={15} /> },
//     { name: "Profile", icon: <UserCircle size={15} /> },
//     { name: "Settings", icon: <Settings size={15} /> },
//     { name: "Support", icon: <LifeBuoy size={15} /> },
//   ];

//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       setOpenSettingsDropdown(!openSettingsDropdown);
//       setOpenProfileDropdown(false);
//     } else if (itemName === "Profile") {
//       setOpenProfileDropdown(!openProfileDropdown);
//       setOpenSettingsDropdown(false);
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleSettingsSelect = (action) => {
//     if (action === "language") {
//       onItemClick("Language Settings");
//     } else if (action === "sound") {
//       onItemClick("Sound Settings");
//     } else if (action === "background") {
//       onItemClick("Background Settings");
//     } else if (action === "board") {
//       onItemClick("Board Settings");
//       navigate('/board-style');
//     }
//   };

//   const handleProfileSelect = (action) => {
//     if (action === "view-profile") {
//       onItemClick("View Profile");
//       navigate('/profile');
//     } else if (action === "signout") {
//       logout();
//       navigate('/login');
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
//       navigate('/tournament');
//     } else if (action === "custom-settings") {
//       navigate('/custom-settings');
//     }
//   };

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "Puzzles") {
//       navigate('/puzzles');
//     } else if (itemName === "Learn") {
//       navigate('/chess-learning');
//     } else if (itemName === "Watch") {
//       navigate('/watch');
//     } else if (itemName === "Social") {
//       navigate('/social');
//     } else if (itemName === "More") {
//       navigate('/more');
//     } else {
//       if (onItemClick) {
//         onItemClick(itemName);
//       }
//     }
//   };

//   const handleCreateLobby = async (lobbySettings) => {
//     const result = await createLobbyAPI(lobbySettings);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       if (onItemClick) {
//         onItemClick("Lobby Created");
//       }
//       setShowCreateLobby(false);
//     }
//   };

//   const handleMatchFound = (matchData) => {
//     const lobbyData = {
//       lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
//       gameType: 'online',
//       timeControl: matchData.timeControl,
//       isPrivate: false,
//       players: [
//         { 
//           id: 'current-user', 
//           name: 'You', 
//           rating: 1450, 
//           ready: true 
//         },
//         { 
//           id: 'opponent-' + Date.now(), 
//           name: matchData.opponent.name, 
//           rating: matchData.opponent.rating, 
//           ready: true 
//         }
//       ]
//     };
    
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'playing',
//         gameMode: 'online',
//         timeControl: matchData.timeControl,
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: false
//       });
//     }
    
//     navigate(`/game/online/${matchData.timeControl}`, { 
//       state: { 
//         lobbyData: lobbyData,
//         opponent: matchData.opponent 
//       } 
//     });
//   };

//   const handleStartGame = async () => {
//     const currentLobby = gameState?.lobbyData;
//     if (currentLobby && setGameState) {
//       const canStart = currentLobby.players.some(p => p.isComputer) 
//         ? true 
//         : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
//       if (canStart) {
//         if (!currentLobby.players.some(p => p.isComputer)) {
//           console.log('🚀 Starting game for lobby:', currentLobby.lobbyCode);
//           const result = await startGameFromLobby(currentLobby.lobbyCode);
//           console.log('📥 Start game result:', result);
          
//           if (result.success) {
//             console.log('✅ Game started successfully:', result.game);
            
//             setGameState({
//               ...gameState,
//               status: 'playing',
//               showLobbyModal: false
//             });
            
//             navigate(`/game/online/${currentLobby.timeControl}`, { 
//               state: { 
//                 gameData: result.game,
//                 gameId: result.game.gameId
//               } 
//             });
//           } else {
//             console.error('❌ Failed to start game:', result.message);
//           }
//         } else {
//           setGameState({
//             ...gameState,
//             status: 'playing',
//             showLobbyModal: false
//           });
//           navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
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

//   const handleAcceptInvitation = async () => {
//     const result = await joinLobby(currentInvitation.lobbyCode);
    
//     const lobbyResult = await getLobby(currentInvitation.lobbyCode);
//     console.log("📥 getLobby response after accepting invitation:", lobbyResult);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       acceptInvitation(currentInvitation.id);
//       setShowInvitation(false);
//       setCurrentInvitation(null);
//     }
//   };

//   const handleDeclineInvitation = () => {
//     declineInvitation(currentInvitation.id);
//     setShowInvitation(false);
//     setCurrentInvitation(null);
//   };

//   return (
//     <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 162, 0, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 162, 0, 0.5);
//         }
//       `}</style>

//       <div className="flex items-center gap-3 px-6 py-8">
//         <Crown className="text-amber-400" size={28} />
//         <div>
//           <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//           <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//         </div>
//       </div>

//       <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
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
//                 onClick={() => handleMenuItemClick(item.name)}
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

//       <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm relative">
//         {bottomItems.map((item) => (
//           <div
//             key={item.name}
//             ref={
//               item.name === "Settings" ? settingsButtonRef : 
//               item.name === "Profile" ? profileButtonRef : 
//               null
//             }
//             className="relative"
//           >
//             <BottomItem 
//               icon={item.icon} 
//               label={item.name}
//               onClick={() => handleBottomItemClick(item.name)}
//             />
            
//             {item.name === "Settings" && (
//               <SettingsDropdown 
//                 isOpen={openSettingsDropdown}
//                 onClose={() => setOpenSettingsDropdown(false)}
//                 onSelect={handleSettingsSelect}
//               />
//             )}

//             {item.name === "Profile" && (
//               <ProfileDropdown 
//                 isOpen={openProfileDropdown}
//                 onClose={() => setOpenProfileDropdown(false)}
//                 onSelect={handleProfileSelect}
//               />
//             )}
//           </div>
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
//           onClose={handleCloseLobby}
//           gameState={gameState}
//           setGameState={setGameState}
//           currentUser={user}
//         />
//       )}

//       <InvitationNotification
//         isOpen={showInvitation}
//         onClose={() => setShowInvitation(false)}
//         invitation={currentInvitation}
//         onAccept={handleAcceptInvitation}
//         onDecline={handleDeclineInvitation}
//       />
//     </div>
//   );
// }




//testing

// components/Sidebar.jsx
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
//   Volume2,
//   Bot,
//   Timer,
//   Bell,  
//   Globe,
//   X,
//   Check,
//   UserPlus,
//   Image,
//   LogOut,
//   UserCircle,
//   Copy,
//   Grid,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import QuickMatchModal from './pagescomponents/QuickMatchModal';
// import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext';
// import { useGame } from '../context/GameContext';

// // Invitation Notification Component
// function InvitationNotification({ isOpen, onClose, invitation, onAccept, onDecline }) {
//   if (!isOpen || !invitation) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Game Invitation</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-[#2a1a13] p-4 rounded-lg">
//             <p className="text-white mb-2">
//               <span className="font-bold">{invitation.inviterName}</span> invited you to join a game
//             </p>
//             <div className="space-y-1 text-sm">
//               <p className="text-gray-400">Game Type: <span className="text-white capitalize">{invitation.gameType} Chess</span></p>
//               <p className="text-gray-400">Time Control: <span className="text-white">{invitation.timeControl}</span></p>
//               <p className="text-gray-400">Lobby Code: <span className="text-amber-400 font-mono">{invitation.lobbyCode}</span></p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={onAccept}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
//             >
//               Accept
//             </button>
//             <button
//               onClick={onDecline}
//               className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add User Modal
// function AddUserModal({ isOpen, onClose, lobbyCode, onInviteSent }) {
//   const [userId, setUserId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);
//   const [inviting, setInviting] = useState(false);
//   const [error, setError] = useState('');
//   const { inviteToLobby } = useGame();
//   const { user } = useAuth();

//   const handleSearch = async () => {
//     if (!userId.trim()) return;
    
//     setSearching(true);
//     setError('');
    
//     try {
//       // In a real app, you'd call an API to search for users
//       setTimeout(() => {
//         setSearchResult({
//           _id: userId,
//           name: `User ${userId}`,
//           isOnline: true,
//           rating: 1200
//         });
//         setSearching(false);
//       }, 500);
//     } catch (error) {
//       console.error('Search error:', error);
//       setError('Failed to search user');
//       setSearching(false);
//     }
//   };

//   const handleSendInvitation = async () => {
//     if (!searchResult) return;
    
//     setInviting(true);
//     setError('');
    
//     try {
//       console.log(`📤 Sending invitation from ${user?._id} to ${searchResult._id} for lobby ${lobbyCode}`);
      
//       const result = await inviteToLobby(lobbyCode, searchResult._id);
      
//       console.log('📥 Invitation result:', result);
      
//       if (result.success) {
//         console.log('✅ Invitation sent successfully');
//         onInviteSent(searchResult);
//         setUserId('');
//         setSearchResult(null);
//         onClose();
//       } else {
//         console.error('❌ Invitation failed:', result.message);
//         setError(result.message || 'Failed to send invitation');
//       }
//     } catch (error) {
//       console.error('❌ Invitation error:', error);
//       setError(error.message || 'Failed to send invitation');
//     } finally {
//       setInviting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Invite Player</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Enter User ID</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={searching || !userId.trim()}
//                 className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
//               >
//                 {searching ? '...' : 'Search'}
//               </button>
//             </div>
//           </div>

//           {searchResult && (
//             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
//               <div className="flex items-center justify-between mb-2">
//                 <div>
//                   <p className="text-white font-medium">{searchResult.name}</p>
//                   <p className="text-gray-400 text-xs">ID: {searchResult._id}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSendInvitation}
//                 disabled={inviting}
//                 className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
//               >
//                 {inviting ? 'Sending...' : 'Send Invitation'}
//               </button>
//             </div>
//           )}

//           <p className="text-gray-500 text-xs text-center">
//             Enter the user ID to send an invitation
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Lobby Display Component
// function LobbyDisplay({ lobby, onStartGame, onClose, gameState, setGameState, currentUser }) {
//   const [copied, setCopied] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [invitationSent, setInvitationSent] = useState(null);
//   const { toggleReady, getLobby } = useGame();
//   const { user: authUser } = useAuth();
//   const { socket, on, off } = useSocket();

//   // Get the effective user (prioritize prop, then context)
//   const effectiveUser = currentUser || authUser;
  
//   // Log user info for debugging
//   useEffect(() => {
//     console.log('👤 LobbyDisplay - Effective User:', effectiveUser);
//     console.log('👤 LobbyDisplay - Current User (prop):', currentUser);
//     console.log('👤 LobbyDisplay - Auth User:', authUser);
//     console.log('🏠 LobbyDisplay - Lobby Creator:', lobby.createdBy);
//     console.log('🏠 LobbyDisplay - Lobby Data:', lobby);
//   }, [effectiveUser, currentUser, authUser, lobby]);

//   // Extract user ID from multiple possible locations
//   const getUserId = (user) => {
//     if (!user) return null;
//     // Check all possible ID fields
//     return user._id || user.id || user.userId || user.uid || null;
//   };

//   // Extract creator ID from multiple possible locations
//   const getCreatorId = (creator) => {
//     if (!creator) return null;
//     // If creator is an object with _id
//     if (typeof creator === 'object') {
//       return creator._id || creator.id || creator.userId || creator.uid || null;
//     }
//     // If creator is directly the ID string
//     return creator;
//   };

//   const currentUserId = getUserId(effectiveUser);
//   const lobbyCreatorId = getCreatorId(lobby.createdBy);
  
//   // Compare as strings to handle different types
//   const isCreator = currentUserId && lobbyCreatorId && 
//                    String(currentUserId).trim() === String(lobbyCreatorId).trim();

//   // Log the comparison
//   useEffect(() => {
//     console.log('🔍 User ID comparison:', {
//       currentUserId,
//       lobbyCreatorId,
//       isCreator,
//       currentUserIdType: typeof currentUserId,
//       lobbyCreatorIdType: typeof lobbyCreatorId,
//       equal: currentUserId === lobbyCreatorId,
//       stringEqual: String(currentUserId) === String(lobbyCreatorId)
//     });
//   }, [currentUserId, lobbyCreatorId, isCreator]);

//   // Listen for lobby updates via socket
//   useEffect(() => {
//     if (!socket || !lobby?.lobbyCode) {
//       console.log('🔌 Socket or lobby not available for LobbyDisplay');
//       return;
//     }

//     console.log('🔌 Setting up socket listeners in LobbyDisplay for lobby:', lobby.lobbyCode);

//     const handleLobbyUpdate = (data) => {
//       console.log('🔄 Lobby update received in LobbyDisplay:', data);
      
//       if (data.lobby?.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ This update is for our lobby!');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: data.lobby,
//             players: data.lobby.players
//           }));
//         }
//       }
//     };

//     const handlePlayerJoined = (data) => {
//       console.log('👤 Player joined event in LobbyDisplay:', data);
      
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Player joined our lobby!');
        
//         // Fetch the latest lobby data
//         fetchLatestLobbyData();
        
//         if (setGameState && data.lobby) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: data.lobby,
//             players: data.lobby.players
//           }));
//         }
//       }
//     };

//     // Function to fetch the latest lobby data
//     const fetchLatestLobbyData = async () => {
//       try {
//         console.log('📡 Fetching latest lobby data for code:', lobby.lobbyCode);
//         const result = await getLobby(lobby.lobbyCode);
//         console.log('📥 getLobby response:', result);
        
//         if (result.success && result.lobby) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: result.lobby,
//             players: result.lobby.players
//           }));
//         }
//       } catch (error) {
//         console.error('❌ Error fetching latest lobby:', error);
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event in LobbyDisplay:', data);
      
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Ready status changed in our lobby');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             lobbyData: data.lobby,
//             players: data.lobby.players
//           }));
//         }
//       }
//     };

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event in LobbyDisplay:', data);
      
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Game starting for our lobby! Closing modal...');
//         if (onClose) {
//           onClose();
//         }
//       }
//     };

//     // Register socket listeners
//     on('lobby-updated', handleLobbyUpdate);
//     on('player-joined-lobby', handlePlayerJoined);
//     on('player-ready', handlePlayerReady);
//     on('game-started', handleGameStarted);

//     return () => {
//       console.log('🧹 Cleaning up LobbyDisplay socket listeners');
//       off('lobby-updated', handleLobbyUpdate);
//       off('player-joined-lobby', handlePlayerJoined);
//       off('player-ready', handlePlayerReady);
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, lobby?.lobbyCode, setGameState, on, off, getLobby, onClose]);

//   // Add periodic refresh as backup
//   useEffect(() => {
//     if (!lobby?.lobbyCode) return;
    
//     console.log('⏰ Setting up periodic lobby data refresh for:', lobby.lobbyCode);
    
//     const fetchLobbyData = async () => {
//       try {
//         console.log('📡 Periodic fetch: Getting latest lobby data');
//         const result = await getLobby(lobby.lobbyCode);
//         console.log('📥 Periodic fetch response:', result);
        
//         if (result.success && result.lobby) {
//           const oldCount = lobby.players?.length || 0;
//           const newCount = result.lobby.players?.length || 0;
          
//           if (newCount > oldCount) {
//             console.log(`🔄 Player count changed from ${oldCount} to ${newCount}`);
            
//             setGameState((prevState) => ({
//               ...prevState,
//               lobbyData: result.lobby,
//               players: result.lobby.players
//             }));
//           }
//         }
//       } catch (error) {
//         console.error('❌ Error in periodic fetch:', error);
//       }
//     };
    
//     fetchLobbyData();
//     const interval = setInterval(fetchLobbyData, 3000);
    
//     return () => {
//       console.log('🧹 Clearing periodic fetch interval');
//       clearInterval(interval);
//     };
//   }, [lobby?.lobbyCode, getLobby, setGameState]);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleInviteSent = (user) => {
//     setInvitationSent(user);
//     setTimeout(() => setInvitationSent(null), 3000);
//   };

//   const handleToggleReady = async () => {
//     const result = await toggleReady(lobby.lobbyCode);
    
//     if (result.success && setGameState) {
//       setGameState({
//         ...gameState,
//         lobbyData: result.lobby,
//         players: result.lobby.players
//       });
//     }
//   };

//   const hasComputer = lobby.players?.some(p => p.isComputer === true);
//   const hasSpaceForPlayer = (lobby.players?.length || 0) < 2;
  
//   // Show invite button if:
//   // 1. User is the creator
//   // 2. No computer player in the lobby
//   // 3. There's space for another player (less than 2 players)
//   const showInviteButton = isCreator && !hasComputer && hasSpaceForPlayer;

//   // Log the conditions for invite button
//   useEffect(() => {
//     console.log('🔘 Invite button conditions:', {
//       isCreator,
//       hasComputer,
//       hasSpaceForPlayer,
//       playerCount: lobby.players?.length,
//       showInviteButton
//     });
//   }, [isCreator, hasComputer, hasSpaceForPlayer, lobby.players?.length, showInviteButton]);

//   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
//   const canStartGame = hasComputer ? true : allPlayersReady;

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

//           {/* Debug info - remove in production */}
//           <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
//             User: {currentUserId || 'none'} | Creator: {lobbyCreatorId || 'none'} | isCreator: {String(isCreator)}
//           </div>

//           {invitationSent && (
//             <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
//               Invitation sent to {invitationSent.name}
//             </div>
//           )}

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
//               {lobby?.players?.map((player, index) => {
//                 const playerId = player.userId?._id || player.userId || player.id || player._id;
//                 const isCurrentUser = currentUserId && playerId && 
//                                      String(playerId).trim() === String(currentUserId).trim();
                
//                 return (
//                   <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         isCurrentUser ? 'bg-amber-500/20' : 
//                         player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
//                       }`}>
//                         <span className={`text-sm font-bold ${
//                           isCurrentUser ? 'text-amber-400' : 
//                           player.isComputer ? 'text-gray-400' : 'text-blue-400'
//                         }`}>
//                           {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
//                         {isCurrentUser && (
//                           <span className="text-amber-400 text-xs ml-2">(You)</span>
//                         )}
//                         {player.isComputer && (
//                           <span className="text-gray-500 text-xs ml-2">(Computer)</span>
//                         )}
//                       </div>
//                     </div>
//                     {isCurrentUser && !player.isComputer ? (
//                       <button
//                         onClick={handleToggleReady}
//                         className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
//                           player.ready 
//                             ? 'bg-green-500/20 text-green-400' 
//                             : 'bg-yellow-500/20 text-yellow-400'
//                         }`}
//                       >
//                         {player.ready ? <Check size={12} /> : <Timer size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </button>
//                     ) : (
//                       <span className={`flex items-center gap-1 text-xs ${
//                         player.ready ? 'text-green-400' : 'text-gray-500'
//                       }`}>
//                         {player.ready && <Check size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
              
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
//             {/* Invite button condition */}
//             {showInviteButton && (
//               <button
//                 onClick={() => setShowAddUser(true)}
//                 className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//                 data-testid="invite-button"
//               >
//                 <UserPlus size={16} />
//                 Invite
//               </button>
//             )}
            
//             {/* Start game button width based on invite button presence */}
//             <button
//               onClick={onStartGame}
//               disabled={!canStartGame || (!isCreator && lobby?.players?.length === 2)}
//               className={`${
//                 showInviteButton ? 'flex-1' : 'w-full'
//               } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
//             >
//               <Swords size={16} />
//               {canStartGame ? 'Start Game' : 'Waiting for players...'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAddUser && (
//         <AddUserModal
//           isOpen={showAddUser}
//           onClose={() => setShowAddUser(false)}
//           lobbyCode={lobby.lobbyCode}
//           onInviteSent={handleInviteSent}
//         />
//       )}
//     </>
//   );
// }

// // Create Lobby Modal
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
//     onCreateLobby(lobbySettings);
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

// // Play Dropdown Component
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

// // Settings Dropdown Component
// function SettingsDropdown({ isOpen, onClose, onSelect }) {
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

//   const settingsOptions = [
//     { 
//       name: "Language", 
//       icon: <Globe size={15} />, 
//       description: "English, Spanish, French, etc.",
//       action: "language"
//     },
//     { 
//       name: "Sound", 
//       icon: <Volume2 size={15} />, 
//       description: "Effects, music, notifications",
//       action: "sound"
//     },
//     { 
//       name: "Background", 
//       icon: <Image size={15} />, 
//       description: "Theme, colors, appearance",
//       action: "background"
//     },
//     { 
//       name: "Board", 
//       icon: <Grid size={15} />, 
//       description: "Piece style, board theme",
//       action: "board"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Settings</h3>
//         </div>
//         {settingsOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Profile Dropdown Component
// function ProfileDropdown({ isOpen, onClose, onSelect }) {
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

//   const profileOptions = [
//     { 
//       name: "View Profile", 
//       icon: <UserCircle size={15} />, 
//       description: "See your stats and games",
//       action: "view-profile"
//     },
//     { 
//       name: "Sign Out", 
//       icon: <LogOut size={15} />, 
//       description: "Log out of your account",
//       action: "signout"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Profile</h3>
//         </div>
//         {profileOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Main Sidebar Component
// // Main Sidebar Component - COMPLETELY FIXED
// export default function Sidebar({ 
//   activeItem = '', 
//   onItemClick = () => {}, 
//   gameState = { status: null, lobbyData: null, players: [], showLobbyModal: false }, 
//   setGameState = () => {} 
// }) {
//   // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
//   const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const [showInvitation, setShowInvitation] = useState(false);
//   const [currentInvitation, setCurrentInvitation] = useState(null);
  
//   const timeoutRef = useRef(null);
//   const settingsButtonRef = useRef(null);
//   const profileButtonRef = useRef(null);
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, loading: authLoading } = useAuth();
//   const { socket, on, off } = useSocket();
//   const { 
//     createLobby: createLobbyAPI, 
//     joinLobby, 
//     startGameFromLobby,
//     pendingInvitations,
//     acceptInvitation,
//     declineInvitation,
//     lobby: contextLobby,
//     getLobby
//   } = useGame();

//   // DEFINE MENU ITEMS HERE (THIS WAS MISSING)
//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//   // DEFINE BOTTOM ITEMS HERE (THIS WAS MISSING)
//   const bottomItems = [
//     { name: "Notification", icon: <Bell size={15} /> },
//     { name: "Dark mode", icon: <Moon size={15} /> },
//     { name: "Profile", icon: <UserCircle size={15} /> },
//     { name: "Settings", icon: <Settings size={15} /> },
//     { name: "Support", icon: <LifeBuoy size={15} /> },
//   ];

//   // ALL OTHER HOOKS (useEffect, useCallback, etc.) GO HERE
//   useEffect(() => {
//     console.log('👤 Sidebar - Current User:', user);
//   }, [user]);

//   useEffect(() => {
//     if (contextLobby && setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: contextLobby,
//         players: contextLobby.players,
//         showLobbyModal: true
//       });
//     }
//   }, [contextLobby]);

//   useEffect(() => {
//     if (!socket) {
//       console.log('🔌 Socket not available yet');
//       return;
//     }

//     console.log('🔌 Setting up socket listeners in Sidebar');

//     const handleInvitation = (data) => {
//       console.log('📨 Received invitation event:', data);
//       setCurrentInvitation(data);
//       setShowInvitation(true);
//     };

//     const handlePlayerJoined = (data) => {
//       console.log('👤 Player joined lobby event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('🔄 Updating lobby with player data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleLobbyUpdated = (data) => {
//       console.log('🔄 Lobby updated event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobby?.lobbyCode) {
//         console.log('🔄 Updating lobby with new data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event in sidebar:', data);
      
//       if (gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('✅ Game starting for our lobby! Redirecting player to game...');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             showLobbyModal: false,
//             lobbyData: null,
//             status: 'playing'
//           }));
//         }
        
//         navigate(`/game/online/${data.game.timeControl}`, { 
//           state: { 
//             gameData: data.game,
//             gameId: data.game.gameId
//           } 
//         });
//       }
//     };

//     on('lobby-invitation', handleInvitation);
//     on('player-joined-lobby', handlePlayerJoined);
//     on('lobby-updated', handleLobbyUpdated);
//     on('player-ready', handlePlayerReady);
//     on('game-started', handleGameStarted);

//     return () => {
//       console.log('🧹 Cleaning up socket listeners');
//       off('lobby-invitation', handleInvitation);
//       off('player-joined-lobby', handlePlayerJoined);
//       off('lobby-updated', handleLobbyUpdated);
//       off('player-ready', handlePlayerReady);
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, on, off, gameState?.lobbyData?.lobbyCode, setGameState, navigate]);

//   useEffect(() => {
//     if (pendingInvitations.length > 0) {
//       const latestInvitation = pendingInvitations[pendingInvitations.length - 1];
//       setCurrentInvitation(latestInvitation);
//       setShowInvitation(true);
//     }
//   }, [pendingInvitations]);

//   useEffect(() => {
//     if (location.state?.lobbyData && setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: location.state.lobbyData,
//         players: location.state.lobbyData.players,
//         showLobbyModal: true
//       });
      
//       window.history.replaceState({}, document.title);
//     }
//   }, [location.state, setGameState, gameState]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
//         setOpenSettingsDropdown(false);
//       }
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
//         setOpenProfileDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // HANDLERS AND OTHER FUNCTIONS
//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       setOpenSettingsDropdown(!openSettingsDropdown);
//       setOpenProfileDropdown(false);
//     } else if (itemName === "Profile") {
//       setOpenProfileDropdown(!openProfileDropdown);
//       setOpenSettingsDropdown(false);
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleSettingsSelect = (action) => {
//     if (action === "language") {
//       onItemClick("Language Settings");
//     } else if (action === "sound") {
//       onItemClick("Sound Settings");
//     } else if (action === "background") {
//       onItemClick("Background Settings");
//     } else if (action === "board") {
//       onItemClick("Board Settings");
//       navigate('/board-style');
//     }
//   };

//   const handleProfileSelect = (action) => {
//     if (action === "view-profile") {
//       onItemClick("View Profile");
//       navigate('/profile');
//     } else if (action === "signout") {
//       logout();
//       navigate('/login');
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
//       navigate('/tournament');
//     } else if (action === "custom-settings") {
//       navigate('/custom-settings');
//     }
//   };

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "Puzzles") {
//       navigate('/puzzles');
//     } else if (itemName === "Learn") {
//       navigate('/chess-learning');
//     } else if (itemName === "Watch") {
//       navigate('/watch');
//     } else if (itemName === "Social") {
//       navigate('/social');
//     } else if (itemName === "More") {
//       navigate('/more');
//     } else {
//       if (onItemClick) {
//         onItemClick(itemName);
//       }
//     }
//   };

//   const handleCreateLobby = async (lobbySettings) => {
//     const result = await createLobbyAPI(lobbySettings);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       if (onItemClick) {
//         onItemClick("Lobby Created");
//       }
//       setShowCreateLobby(false);
//     }
//   };

//   const handleMatchFound = (matchData) => {
//     const lobbyData = {
//       lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
//       gameType: 'online',
//       timeControl: matchData.timeControl,
//       isPrivate: false,
//       players: [
//         { 
//           id: 'current-user', 
//           name: 'You', 
//           rating: 1450, 
//           ready: true 
//         },
//         { 
//           id: 'opponent-' + Date.now(), 
//           name: matchData.opponent.name, 
//           rating: matchData.opponent.rating, 
//           ready: true 
//         }
//       ]
//     };
    
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'playing',
//         gameMode: 'online',
//         timeControl: matchData.timeControl,
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: false
//       });
//     }
    
//     navigate(`/game/online/${matchData.timeControl}`, { 
//       state: { 
//         lobbyData: lobbyData,
//         opponent: matchData.opponent 
//       } 
//     });
//   };

//   const handleStartGame = async () => {
//     const currentLobby = gameState?.lobbyData;
//     if (currentLobby && setGameState) {
//       const canStart = currentLobby.players.some(p => p.isComputer) 
//         ? true 
//         : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
//       if (canStart) {
//         if (!currentLobby.players.some(p => p.isComputer)) {
//           console.log('🚀 Starting game for lobby:', currentLobby.lobbyCode);
//           const result = await startGameFromLobby(currentLobby.lobbyCode);
//           console.log('📥 Start game result:', result);
          
//           if (result.success) {
//             console.log('✅ Game started successfully:', result.game);
            
//             setGameState({
//               ...gameState,
//               status: 'playing',
//               showLobbyModal: false
//             });
            
//             navigate(`/game/online/${currentLobby.timeControl}`, { 
//               state: { 
//                 gameData: result.game,
//                 gameId: result.game.gameId
//               } 
//             });
//           } else {
//             console.error('❌ Failed to start game:', result.message);
//           }
//         } else {
//           setGameState({
//             ...gameState,
//             status: 'playing',
//             showLobbyModal: false
//           });
//           navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
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

//   const handleAcceptInvitation = async () => {
//     const result = await joinLobby(currentInvitation.lobbyCode);
    
//     const lobbyResult = await getLobby(currentInvitation.lobbyCode);
//     console.log("📥 getLobby response after accepting invitation:", lobbyResult);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       acceptInvitation(currentInvitation.id);
//       setShowInvitation(false);
//       setCurrentInvitation(null);
//     }
//   };

//   const handleDeclineInvitation = () => {
//     declineInvitation(currentInvitation.id);
//     setShowInvitation(false);
//     setCurrentInvitation(null);
//   };

//   // RETURN JSX - with loading state INSIDE the JSX
//   return (
//     <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 162, 0, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 162, 0, 0.5);
//         }
//       `}</style>

//       {authLoading ? (
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-gray-400">Loading...</div>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-center gap-3 px-6 py-8">
//             <Crown className="text-amber-400" size={28} />
//             <div>
//               <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//               <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//             </div>
//           </div>

//           <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
//             {menuItems.map((item) => {
//               const isActive = activeItem === item.name;
              
//               return (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => handleMouseEnter(item.name)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button
//                     onClick={() => handleMenuItemClick(item.name)}
//                     className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
//                       ${
//                         isActive
//                           ? "bg-[#FFA20026] text-white"
//                           : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
//                       }`}
//                   >
//                     <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
//                     {item.name}
//                   </button>
                  
//                   {item.name === "Play" && (
//                     <PlayDropdown 
//                       isOpen={openDropdown === "Play"}
//                       onClose={() => setOpenDropdown(null)}
//                       onSelect={handleDropdownSelect}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm relative">
//             {bottomItems.map((item) => (
//               <div
//                 key={item.name}
//                 ref={
//                   item.name === "Settings" ? settingsButtonRef : 
//                   item.name === "Profile" ? profileButtonRef : 
//                   null
//                 }
//                 className="relative"
//               >
//                 <BottomItem 
//                   icon={item.icon} 
//                   label={item.name}
//                   onClick={() => handleBottomItemClick(item.name)}
//                 />
                
//                 {item.name === "Settings" && (
//                   <SettingsDropdown 
//                     isOpen={openSettingsDropdown}
//                     onClose={() => setOpenSettingsDropdown(false)}
//                     onSelect={handleSettingsSelect}
//                   />
//                 )}

//                 {item.name === "Profile" && (
//                   <ProfileDropdown 
//                     isOpen={openProfileDropdown}
//                     onClose={() => setOpenProfileDropdown(false)}
//                     onSelect={handleProfileSelect}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <CreateLobbyModal 
//             isOpen={showCreateLobby}
//             onClose={() => setShowCreateLobby(false)}
//             onCreateLobby={handleCreateLobby}
//           />

//           <QuickMatchModal
//             isOpen={showQuickMatch}
//             onClose={() => setShowQuickMatch(false)}
//             onMatchFound={handleMatchFound}
//           />

//           {gameState?.showLobbyModal && gameState?.lobbyData && (
//             <LobbyDisplay 
//               lobby={gameState.lobbyData}
//               onStartGame={handleStartGame}
//               onClose={handleCloseLobby}
//               gameState={gameState}
//               setGameState={setGameState}
//               currentUser={user}
//             />
//           )}

//           <InvitationNotification
//             isOpen={showInvitation}
//             onClose={() => setShowInvitation(false)}
//             invitation={currentInvitation}
//             onAccept={handleAcceptInvitation}
//             onDecline={handleDeclineInvitation}
//           />
//         </>
//       )}
//     </div>
//   );
// }





// //testing 2

// // components/Sidebar.jsx
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
//   Volume2,
//   Bot,
//   Timer,
//   Bell,  
//   Globe,
//   X,
//   Check,
//   UserPlus,
//   Image,
//   LogOut,
//   UserCircle,
//   Copy,
//   Grid,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import QuickMatchModal from './pagescomponents/QuickMatchModal';
// import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext';
// import { useGame } from '../context/GameContext';

// // Invitation Notification Component
// function InvitationNotification({ isOpen, onClose, invitation, onAccept, onDecline }) {
//   if (!isOpen || !invitation) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Game Invitation</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-[#2a1a13] p-4 rounded-lg">
//             <p className="text-white mb-2">
//               <span className="font-bold">{invitation.inviterName}</span> invited you to join a game
//             </p>
//             <div className="space-y-1 text-sm">
//               <p className="text-gray-400">Game Type: <span className="text-white capitalize">{invitation.gameType} Chess</span></p>
//               <p className="text-gray-400">Time Control: <span className="text-white">{invitation.timeControl}</span></p>
//               <p className="text-gray-400">Lobby Code: <span className="text-amber-400 font-mono">{invitation.lobbyCode}</span></p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={onAccept}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
//             >
//               Accept
//             </button>
//             <button
//               onClick={onDecline}
//               className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add User Modal
// function AddUserModal({ isOpen, onClose, lobbyCode, onInviteSent }) {
//   const [userId, setUserId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);
//   const [inviting, setInviting] = useState(false);
//   const [error, setError] = useState('');
//   const { inviteToLobby } = useGame();
//   const { user } = useAuth();

//   const handleSearch = async () => {
//     if (!userId.trim()) return;
    
//     setSearching(true);
//     setError('');
    
//     try {
//       // In a real app, you'd call an API to search for users
//       setTimeout(() => {
//         setSearchResult({
//           _id: userId,
//           name: `User ${userId}`,
//           isOnline: true,
//           rating: 1200
//         });
//         setSearching(false);
//       }, 500);
//     } catch (error) {
//       console.error('Search error:', error);
//       setError('Failed to search user');
//       setSearching(false);
//     }
//   };

//   const handleSendInvitation = async () => {
//     if (!searchResult) return;
    
//     setInviting(true);
//     setError('');
    
//     try {
//       console.log(`📤 Sending invitation from ${user?._id} to ${searchResult._id} for lobby ${lobbyCode}`);
      
//       const result = await inviteToLobby(lobbyCode, searchResult._id);
      
//       console.log('📥 Invitation result:', result);
      
//       if (result.success) {
//         console.log('✅ Invitation sent successfully');
//         onInviteSent(searchResult);
//         setUserId('');
//         setSearchResult(null);
//         onClose();
//       } else {
//         console.error('❌ Invitation failed:', result.message);
//         setError(result.message || 'Failed to send invitation');
//       }
//     } catch (error) {
//       console.error('❌ Invitation error:', error);
//       setError(error.message || 'Failed to send invitation');
//     } finally {
//       setInviting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Invite Player</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Enter User ID</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={searching || !userId.trim()}
//                 className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
//               >
//                 {searching ? '...' : 'Search'}
//               </button>
//             </div>
//           </div>

//           {searchResult && (
//             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
//               <div className="flex items-center justify-between mb-2">
//                 <div>
//                   <p className="text-white font-medium">{searchResult.name}</p>
//                   <p className="text-gray-400 text-xs">ID: {searchResult._id}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSendInvitation}
//                 disabled={inviting}
//                 className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
//               >
//                 {inviting ? 'Sending...' : 'Send Invitation'}
//               </button>
//             </div>
//           )}

//           <p className="text-gray-500 text-xs text-center">
//             Enter the user ID to send an invitation
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Lobby Display Component
// function LobbyDisplay({ lobby, onStartGame, onClose, gameState, setGameState, currentUser }) {
//   const [copied, setCopied] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [invitationSent, setInvitationSent] = useState(null);
//   const [socketReady, setSocketReady] = useState(false);
//   const { toggleReady, getLobby, startGameFromLobby } = useGame();
//   const { user: authUser } = useAuth();
//   const { socket, connected, on, off, reconnect } = useSocket();
//   const navigate = useNavigate();

//   // Get the effective user (prioritize prop, then context)
//   const effectiveUser = currentUser || authUser;
  
//   // Log user info for debugging
//   useEffect(() => {
//     console.log('👤 LobbyDisplay - Effective User:', effectiveUser);
//     console.log('👤 LobbyDisplay - Current User (prop):', currentUser);
//     console.log('👤 LobbyDisplay - Auth User:', authUser);
//     console.log('🏠 LobbyDisplay - Lobby Creator:', lobby.createdBy);
//     console.log('🏠 LobbyDisplay - Lobby Data:', lobby);
//   }, [effectiveUser, currentUser, authUser, lobby]);

//   // Extract user ID from multiple possible locations
//   const getUserId = (user) => {
//     if (!user) return null;
//     // Check all possible ID fields
//     return user._id || user.id || user.userId || user.uid || null;
//   };

//   // Extract creator ID from multiple possible locations
//   const getCreatorId = (creator) => {
//     if (!creator) return null;
//     // If creator is an object with _id
//     if (typeof creator === 'object') {
//       return creator._id || creator.id || creator.userId || creator.uid || null;
//     }
//     // If creator is directly the ID string
//     return creator;
//   };

//   const currentUserId = getUserId(effectiveUser);
//   const lobbyCreatorId = getCreatorId(lobby.createdBy);
  
//   // Compare as strings to handle different types
//   const isCreator = currentUserId && lobbyCreatorId && 
//                    String(currentUserId).trim() === String(lobbyCreatorId).trim();

//   // Check socket connection status and attempt to reconnect if needed
//   useEffect(() => {
//     console.log('🔄 LobbyDisplay - Checking socket connection:', { 
//       socket: !!socket, 
//       connected,
//       lobbyCode: lobby.lobbyCode
//     });
    
//     if (socket && connected) {
//       console.log('✅ Socket is connected and ready in LobbyDisplay');
//       setSocketReady(true);
      
//       // Ensure we're in the lobby room
//       socket.emit('join-lobby', { lobbyCode: lobby.lobbyCode });
//     } else {
//       console.log('❌ Socket not ready in LobbyDisplay:', { socket: !!socket, connected });
//       setSocketReady(false);
      
//       // Attempt to reconnect if socket exists but not connected
//       if (socket && !connected && reconnect) {
//         console.log('🔄 Attempting to reconnect socket...');
//         reconnect();
//       }
//     }
//   }, [socket, connected, lobby.lobbyCode, reconnect]);

//   // Listen for game start
//   useEffect(() => {
//     if (!socket || !connected) {
//       console.log('Socket not available in LobbyDisplay, waiting for connection...');
//       return;
//     }

//     console.log('Setting up game-started listener in LobbyDisplay for lobby:', lobby.lobbyCode);

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event received in lobby display:', data);
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Game started for our lobby! Navigating to game page...');
//         onClose();
        
//         // Navigate to game page with the game data
//         navigate(`/game/online/${lobby.timeControl}`, {
//           state: {
//             gameData: data.game,
//             gameId: data.game.gameId
//           }
//         });
//       }
//     };

//     const handleLobbyUpdate = (data) => {
//       console.log('🔄 Lobby update received:', data);
//       if (data.lobby?.lobbyCode === lobby.lobbyCode && setGameState) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players
//         }));
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event:', data);
//       if (data.lobbyCode === lobby.lobbyCode && setGameState) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players
//         }));
//       }
//     };

//     on('game-started', handleGameStarted);
//     on('lobby-updated', handleLobbyUpdate);
//     on('player-ready', handlePlayerReady);

//     return () => {
//       console.log('Cleaning up game-started listener in LobbyDisplay');
//       off('game-started', handleGameStarted);
//       off('lobby-updated', handleLobbyUpdate);
//       off('player-ready', handlePlayerReady);
//     };
//   }, [socket, connected, lobby.lobbyCode, lobby.timeControl, on, off, navigate, onClose, setGameState]);

//   // Add periodic refresh as backup
//   useEffect(() => {
//     if (!lobby?.lobbyCode) return;
    
//     console.log('⏰ Setting up periodic lobby data refresh for:', lobby.lobbyCode);
    
//     const fetchLobbyData = async () => {
//       try {
//         console.log('📡 Periodic fetch: Getting latest lobby data');
//         const result = await getLobby(lobby.lobbyCode);
//         console.log('📥 Periodic fetch response:', result);
        
//         if (result.success && result.lobby && setGameState) {
//           const oldCount = lobby.players?.length || 0;
//           const newCount = result.lobby.players?.length || 0;
          
//           if (newCount > oldCount) {
//             console.log(`🔄 Player count changed from ${oldCount} to ${newCount}`);
            
//             setGameState((prevState) => ({
//               ...prevState,
//               lobbyData: result.lobby,
//               players: result.lobby.players
//             }));
//           }
//         }
//       } catch (error) {
//         console.error('❌ Error in periodic fetch:', error);
//       }
//     };
    
//     fetchLobbyData();
//     const interval = setInterval(fetchLobbyData, 3000);
    
//     return () => {
//       console.log('🧹 Clearing periodic fetch interval');
//       clearInterval(interval);
//     };
//   }, [lobby?.lobbyCode, getLobby, setGameState]);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleInviteSent = (user) => {
//     setInvitationSent(user);
//     setTimeout(() => setInvitationSent(null), 3000);
//   };

//   const handleToggleReady = async () => {
//     const result = await toggleReady(lobby.lobbyCode);
    
//     if (result.success && setGameState) {
//       setGameState({
//         ...gameState,
//         lobbyData: result.lobby,
//         players: result.lobby.players
//       });
//     }
//   };

//   const handleStartGameClick = async () => {
//     try {
//       console.log('Starting game for lobby:', lobby.lobbyCode);
      
//       // Ensure socket is connected before starting
//       if (!socketReady) {
//         console.log('Socket not ready, attempting to reconnect...');
//         if (reconnect) {
//           reconnect();
//           // Wait a moment for connection
//           await new Promise(resolve => setTimeout(resolve, 1000));
//         }
//       }
      
//       const result = await startGameFromLobby(lobby.lobbyCode);
//       console.log('Start game result:', result);
      
//       if (result.success) {
//         console.log('Game started successfully, waiting for socket event to navigate...');
//         // Don't navigate immediately - wait for the socket event
//       } else {
//         console.error('Failed to start game:', result.message);
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error('Error starting game:', error);
//       alert('Failed to start game');
//     }
//   };

//   const hasComputer = lobby.players?.some(p => p.isComputer === true);
//   const hasSpaceForPlayer = (lobby.players?.length || 0) < 2;
  
//   // Show invite button if:
//   // 1. User is the creator
//   // 2. No computer player in the lobby
//   // 3. There's space for another player (less than 2 players)
//   const showInviteButton = isCreator && !hasComputer && hasSpaceForPlayer;

//   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
//   const canStartGame = hasComputer ? true : allPlayersReady;

//   // Show socket status for debugging (remove in production)
//   const socketStatus = socketReady ? '✅ Connected' : '❌ Disconnected';

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

//           {/* Debug info - remove in production */}
//           <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
//             Socket: {socketStatus}
//           </div>

//           {invitationSent && (
//             <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
//               Invitation sent to {invitationSent.name}
//             </div>
//           )}

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
//               {lobby?.players?.map((player, index) => {
//                 const playerId = player.userId?._id || player.userId || player.id || player._id;
//                 const isCurrentUser = currentUserId && playerId && 
//                                      String(playerId).trim() === String(currentUserId).trim();
                
//                 return (
//                   <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         isCurrentUser ? 'bg-amber-500/20' : 
//                         player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
//                       }`}>
//                         <span className={`text-sm font-bold ${
//                           isCurrentUser ? 'text-amber-400' : 
//                           player.isComputer ? 'text-gray-400' : 'text-blue-400'
//                         }`}>
//                           {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
//                         {isCurrentUser && (
//                           <span className="text-amber-400 text-xs ml-2">(You)</span>
//                         )}
//                         {player.isComputer && (
//                           <span className="text-gray-500 text-xs ml-2">(Computer)</span>
//                         )}
//                       </div>
//                     </div>
//                     {isCurrentUser && !player.isComputer ? (
//                       <button
//                         onClick={handleToggleReady}
//                         className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
//                           player.ready 
//                             ? 'bg-green-500/20 text-green-400' 
//                             : 'bg-yellow-500/20 text-yellow-400'
//                         }`}
//                       >
//                         {player.ready ? <Check size={12} /> : <Timer size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </button>
//                     ) : (
//                       <span className={`flex items-center gap-1 text-xs ${
//                         player.ready ? 'text-green-400' : 'text-gray-500'
//                       }`}>
//                         {player.ready && <Check size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
              
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
//             {/* Invite button condition */}
//             {showInviteButton && (
//               <button
//                 onClick={() => setShowAddUser(true)}
//                 className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//                 data-testid="invite-button"
//               >
//                 <UserPlus size={16} />
//                 Invite
//               </button>
//             )}
            
//             {/* Start game button width based on invite button presence */}
//             <button
//               onClick={handleStartGameClick}
//               disabled={!canStartGame || (!isCreator && lobby?.players?.length === 2)}
//               className={`${
//                 showInviteButton ? 'flex-1' : 'w-full'
//               } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
//             >
//               <Swords size={16} />
//               {canStartGame ? 'Start Game' : 'Waiting for players...'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAddUser && (
//         <AddUserModal
//           isOpen={showAddUser}
//           onClose={() => setShowAddUser(false)}
//           lobbyCode={lobby.lobbyCode}
//           onInviteSent={handleInviteSent}
//         />
//       )}
//     </>
//   );
// }

// // Create Lobby Modal
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
//     onCreateLobby(lobbySettings);
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

// // Play Dropdown Component
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

// // Settings Dropdown Component
// function SettingsDropdown({ isOpen, onClose, onSelect }) {
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

//   const settingsOptions = [
//     { 
//       name: "Language", 
//       icon: <Globe size={15} />, 
//       description: "English, Spanish, French, etc.",
//       action: "language"
//     },
//     { 
//       name: "Sound", 
//       icon: <Volume2 size={15} />, 
//       description: "Effects, music, notifications",
//       action: "sound"
//     },
//     { 
//       name: "Background", 
//       icon: <Image size={15} />, 
//       description: "Theme, colors, appearance",
//       action: "background"
//     },
//     { 
//       name: "Board", 
//       icon: <Grid size={15} />, 
//       description: "Piece style, board theme",
//       action: "board"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Settings</h3>
//         </div>
//         {settingsOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Profile Dropdown Component
// function ProfileDropdown({ isOpen, onClose, onSelect }) {
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

//   const profileOptions = [
//     { 
//       name: "View Profile", 
//       icon: <UserCircle size={15} />, 
//       description: "See your stats and games",
//       action: "view-profile"
//     },
//     { 
//       name: "Sign Out", 
//       icon: <LogOut size={15} />, 
//       description: "Log out of your account",
//       action: "signout"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Profile</h3>
//         </div>
//         {profileOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Main Sidebar Component
// export default function Sidebar({ 
//   activeItem = '', 
//   onItemClick = () => {}, 
//   gameState = { status: null, lobbyData: null, players: [], showLobbyModal: false }, 
//   setGameState = () => {} 
// }) {
//   // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
//   const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const [showInvitation, setShowInvitation] = useState(false);
//   const [currentInvitation, setCurrentInvitation] = useState(null);
  
//   const timeoutRef = useRef(null);
//   const settingsButtonRef = useRef(null);
//   const profileButtonRef = useRef(null);
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, loading: authLoading } = useAuth();
//   const { socket, on, off } = useSocket();
//   const { 
//     createLobby: createLobbyAPI, 
//     joinLobby, 
//     startGameFromLobby,
//     pendingInvitations,
//     acceptInvitation,
//     declineInvitation,
//     lobby: contextLobby,
//     getLobby
//   } = useGame();

//   // DEFINE MENU ITEMS
//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//   // DEFINE BOTTOM ITEMS
//   const bottomItems = [
//     { name: "Notification", icon: <Bell size={15} /> },
//     { name: "Dark mode", icon: <Moon size={15} /> },
//     { name: "Profile", icon: <UserCircle size={15} /> },
//     { name: "Settings", icon: <Settings size={15} /> },
//     { name: "Support", icon: <LifeBuoy size={15} /> },
//   ];

//   // ALL OTHER HOOKS
//   useEffect(() => {
//     console.log('👤 Sidebar - Current User:', user);
//   }, [user]);

//   // Watch for lobby from context
//   useEffect(() => {
//     if (contextLobby && setGameState) {
//       console.log('🏠 Lobby from context detected in Sidebar:', contextLobby);
//       setGameState({
//         ...gameState,
//         status: 'lobby',
//         lobbyData: contextLobby,
//         players: contextLobby.players,
//         showLobbyModal: true
//       });
//     }
//   }, [contextLobby, setGameState, gameState]);

//   useEffect(() => {
//     if (!socket) {
//       console.log('🔌 Socket not available yet');
//       return;
//     }

//     console.log('🔌 Setting up socket listeners in Sidebar');

//     const handleInvitation = (data) => {
//       console.log('📨 Received invitation event:', data);
//       setCurrentInvitation(data);
//       setShowInvitation(true);
//     };

//     const handlePlayerJoined = (data) => {
//       console.log('👤 Player joined lobby event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('🔄 Updating lobby with player data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleLobbyUpdated = (data) => {
//       console.log('🔄 Lobby updated event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobby?.lobbyCode) {
//         console.log('🔄 Updating lobby with new data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event in sidebar:', data);
      
//       if (gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('✅ Game starting for our lobby! Redirecting player to game...');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             showLobbyModal: false,
//             lobbyData: null,
//             status: 'playing'
//           }));
//         }
        
//         navigate(`/game/online/${data.game.timeControl}`, { 
//           state: { 
//             gameData: data.game,
//             gameId: data.game.gameId
//           } 
//         });
//       }
//     };

//     on('lobby-invitation', handleInvitation);
//     on('player-joined-lobby', handlePlayerJoined);
//     on('lobby-updated', handleLobbyUpdated);
//     on('player-ready', handlePlayerReady);
//     on('game-started', handleGameStarted);

//     return () => {
//       console.log('🧹 Cleaning up socket listeners');
//       off('lobby-invitation', handleInvitation);
//       off('player-joined-lobby', handlePlayerJoined);
//       off('lobby-updated', handleLobbyUpdated);
//       off('player-ready', handlePlayerReady);
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, on, off, gameState?.lobbyData?.lobbyCode, setGameState, navigate]);

//   useEffect(() => {
//     if (pendingInvitations.length > 0) {
//       const latestInvitation = pendingInvitations[pendingInvitations.length - 1];
//       setCurrentInvitation(latestInvitation);
//       setShowInvitation(true);
//     }
//   }, [pendingInvitations]);

//   // useEffect(() => {
//   //   if (location.state?.lobbyData && setGameState) {
//   //     setGameState({
//   //       ...gameState,
//   //       status: 'lobby',
//   //       lobbyData: location.state.lobbyData,
//   //       players: location.state.lobbyData.players,
//   //       showLobbyModal: true
//   //     });
      
//   //     window.history.replaceState({}, document.title);
//   //   }
//   // }, [location.state, setGameState, gameState]);

//   useEffect(() => {
//   if (contextLobby && setGameState) {
//     console.log('🏠 Lobby from context detected in Sidebar:', contextLobby);
//     setGameState({
//       ...gameState,
//       status: 'lobby',
//       lobbyData: contextLobby,
//       players: contextLobby.players,
//       showLobbyModal: true
//     });
//   }
// }, [contextLobby, setGameState, gameState]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
//         setOpenSettingsDropdown(false);
//       }
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
//         setOpenProfileDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // HANDLERS
//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       setOpenSettingsDropdown(!openSettingsDropdown);
//       setOpenProfileDropdown(false);
//     } else if (itemName === "Profile") {
//       setOpenProfileDropdown(!openProfileDropdown);
//       setOpenSettingsDropdown(false);
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleSettingsSelect = (action) => {
//     if (action === "language") {
//       onItemClick("Language Settings");
//     } else if (action === "sound") {
//       onItemClick("Sound Settings");
//     } else if (action === "background") {
//       onItemClick("Background Settings");
//     } else if (action === "board") {
//       onItemClick("Board Settings");
//       navigate('/board-style');
//     }
//   };

//   const handleProfileSelect = (action) => {
//     if (action === "view-profile") {
//       onItemClick("View Profile");
//       navigate('/profile');
//     } else if (action === "signout") {
//       logout();
//       navigate('/login');
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
//       navigate('/tournament');
//     } else if (action === "custom-settings") {
//       navigate('/custom-settings');
//     }
//   };

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "Puzzles") {
//       navigate('/puzzles');
//     } else if (itemName === "Learn") {
//       navigate('/chess-learning');
//     } else if (itemName === "Watch") {
//       navigate('/watch');
//     } else if (itemName === "Social") {
//       navigate('/social');
//     } else if (itemName === "More") {
//       navigate('/more');
//     } else {
//       if (onItemClick) {
//         onItemClick(itemName);
//       }
//     }
//   };

//   const handleCreateLobby = async (lobbySettings) => {
//     const result = await createLobbyAPI(lobbySettings);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       if (onItemClick) {
//         onItemClick("Lobby Created");
//       }
//       setShowCreateLobby(false);
//     }
//   };

//   const handleMatchFound = (matchData) => {
//     const lobbyData = {
//       lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
//       gameType: 'online',
//       timeControl: matchData.timeControl,
//       isPrivate: false,
//       players: [
//         { 
//           id: 'current-user', 
//           name: 'You', 
//           rating: 1450, 
//           ready: true 
//         },
//         { 
//           id: 'opponent-' + Date.now(), 
//           name: matchData.opponent.name, 
//           rating: matchData.opponent.rating, 
//           ready: true 
//         }
//       ]
//     };
    
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'playing',
//         gameMode: 'online',
//         timeControl: matchData.timeControl,
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: false
//       });
//     }
    
//     navigate(`/game/online/${matchData.timeControl}`, { 
//       state: { 
//         lobbyData: lobbyData,
//         opponent: matchData.opponent 
//       } 
//     });
//   };

//   const handleStartGame = async () => {
//     const currentLobby = gameState?.lobbyData;
//     if (currentLobby && setGameState) {
//       const canStart = currentLobby.players.some(p => p.isComputer) 
//         ? true 
//         : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
//       if (canStart) {
//         if (!currentLobby.players.some(p => p.isComputer)) {
//           console.log('🚀 Starting game for lobby:', currentLobby.lobbyCode);
//           const result = await startGameFromLobby(currentLobby.lobbyCode);
//           console.log('📥 Start game result:', result);
          
//           if (result.success) {
//             console.log('✅ Game started successfully:', result.game);
            
//             setGameState({
//               ...gameState,
//               status: 'playing',
//               showLobbyModal: false
//             });
            
//             navigate(`/game/online/${currentLobby.timeControl}`, { 
//               state: { 
//                 gameData: result.game,
//                 gameId: result.game.gameId
//               } 
//             });
//           } else {
//             console.error('❌ Failed to start game:', result.message);
//           }
//         } else {
//           setGameState({
//             ...gameState,
//             status: 'playing',
//             showLobbyModal: false
//           });
//           navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
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

//   const handleAcceptInvitation = async () => {
//     const result = await joinLobby(currentInvitation.lobbyCode);
    
//     const lobbyResult = await getLobby(currentInvitation.lobbyCode);
//     console.log("📥 getLobby response after accepting invitation:", lobbyResult);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       acceptInvitation(currentInvitation.id);
//       setShowInvitation(false);
//       setCurrentInvitation(null);
//     }
//   };

//   const handleDeclineInvitation = () => {
//     declineInvitation(currentInvitation.id);
//     setShowInvitation(false);
//     setCurrentInvitation(null);
//   };

//   // RETURN JSX
//   return (
//     <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 162, 0, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 162, 0, 0.5);
//         }
//       `}</style>

//       {authLoading ? (
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-gray-400">Loading...</div>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-center gap-3 px-6 py-8">
//             <Crown className="text-amber-400" size={28} />
//             <div>
//               <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//               <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//             </div>
//           </div>

//           <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
//             {menuItems.map((item) => {
//               const isActive = activeItem === item.name;
              
//               return (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => handleMouseEnter(item.name)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button
//                     onClick={() => handleMenuItemClick(item.name)}
//                     className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
//                       ${
//                         isActive
//                           ? "bg-[#FFA20026] text-white"
//                           : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
//                       }`}
//                   >
//                     <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
//                     {item.name}
//                   </button>
                  
//                   {item.name === "Play" && (
//                     <PlayDropdown 
//                       isOpen={openDropdown === "Play"}
//                       onClose={() => setOpenDropdown(null)}
//                       onSelect={handleDropdownSelect}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm relative">
//             {bottomItems.map((item) => (
//               <div
//                 key={item.name}
//                 ref={
//                   item.name === "Settings" ? settingsButtonRef : 
//                   item.name === "Profile" ? profileButtonRef : 
//                   null
//                 }
//                 className="relative"
//               >
//                 <BottomItem 
//                   icon={item.icon} 
//                   label={item.name}
//                   onClick={() => handleBottomItemClick(item.name)}
//                 />
                
//                 {item.name === "Settings" && (
//                   <SettingsDropdown 
//                     isOpen={openSettingsDropdown}
//                     onClose={() => setOpenSettingsDropdown(false)}
//                     onSelect={handleSettingsSelect}
//                   />
//                 )}

//                 {item.name === "Profile" && (
//                   <ProfileDropdown 
//                     isOpen={openProfileDropdown}
//                     onClose={() => setOpenProfileDropdown(false)}
//                     onSelect={handleProfileSelect}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <CreateLobbyModal 
//             isOpen={showCreateLobby}
//             onClose={() => setShowCreateLobby(false)}
//             onCreateLobby={handleCreateLobby}
//           />

//           <QuickMatchModal
//             isOpen={showQuickMatch}
//             onClose={() => setShowQuickMatch(false)}
//             onMatchFound={handleMatchFound}
//           />

//           {gameState?.showLobbyModal && gameState?.lobbyData && (
//             <LobbyDisplay 
//               lobby={gameState.lobbyData}
//               onStartGame={handleStartGame}
//               onClose={handleCloseLobby}
//               gameState={gameState}
//               setGameState={setGameState}
//               currentUser={user}
//             />
//           )}

//           <InvitationNotification
//             isOpen={showInvitation}
//             onClose={() => setShowInvitation(false)}
//             invitation={currentInvitation}
//             onAccept={handleAcceptInvitation}
//             onDecline={handleDeclineInvitation}
//           />
//         </>
//       )}
//     </div>
//   );
// }


// //testing 3
// // components/Sidebar.jsx - COMPLETE FIXED VERSION
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
//   Volume2,
//   Bot,
//   Timer,
//   Bell,  
//   Globe,
//   X,
//   Check,
//   UserPlus,
//   Image,
//   LogOut,
//   UserCircle,
//   Copy,
//   Grid,
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import QuickMatchModal from './pagescomponents/QuickMatchModal';
// import { useAuth } from '../context/AuthContext';
// import { useSocket } from '../context/SocketContext';
// import { useGame } from '../context/GameContext';

// // Invitation Notification Component
// function InvitationNotification({ isOpen, onClose, invitation, onAccept, onDecline }) {
//   if (!isOpen || !invitation) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Game Invitation</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-[#2a1a13] p-4 rounded-lg">
//             <p className="text-white mb-2">
//               <span className="font-bold">{invitation.inviterName}</span> invited you to join a game
//             </p>
//             <div className="space-y-1 text-sm">
//               <p className="text-gray-400">Game Type: <span className="text-white capitalize">{invitation.gameType} Chess</span></p>
//               <p className="text-gray-400">Time Control: <span className="text-white">{invitation.timeControl}</span></p>
//               <p className="text-gray-400">Lobby Code: <span className="text-amber-400 font-mono">{invitation.lobbyCode}</span></p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={onAccept}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
//             >
//               Accept
//             </button>
//             <button
//               onClick={onDecline}
//               className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition"
//             >
//               Decline
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Add User Modal
// function AddUserModal({ isOpen, onClose, lobbyCode, onInviteSent }) {
//   const [userId, setUserId] = useState('');
//   const [searchResult, setSearchResult] = useState(null);
//   const [searching, setSearching] = useState(false);
//   const [inviting, setInviting] = useState(false);
//   const [error, setError] = useState('');
//   const { inviteToLobby } = useGame();
//   const { user } = useAuth();

//   const handleSearch = async () => {
//     if (!userId.trim()) return;
    
//     setSearching(true);
//     setError('');
    
//     try {
//       // In a real app, you'd call an API to search for users
//       setTimeout(() => {
//         setSearchResult({
//           _id: userId,
//           name: `User ${userId}`,
//           isOnline: true,
//           rating: 1200
//         });
//         setSearching(false);
//       }, 500);
//     } catch (error) {
//       console.error('Search error:', error);
//       setError('Failed to search user');
//       setSearching(false);
//     }
//   };

//   const handleSendInvitation = async () => {
//     if (!searchResult) return;
    
//     setInviting(true);
//     setError('');
    
//     try {
//       console.log(`📤 Sending invitation from ${user?._id} to ${searchResult._id} for lobby ${lobbyCode}`);
      
//       const result = await inviteToLobby(lobbyCode, searchResult._id);
      
//       console.log('📥 Invitation result:', result);
      
//       if (result.success) {
//         console.log('✅ Invitation sent successfully');
//         onInviteSent(searchResult);
//         setUserId('');
//         setSearchResult(null);
//         onClose();
//       } else {
//         console.error('❌ Invitation failed:', result.message);
//         setError(result.message || 'Failed to send invitation');
//       }
//     } catch (error) {
//       console.error('❌ Invitation error:', error);
//       setError(error.message || 'Failed to send invitation');
//     } finally {
//       setInviting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60]">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Invite Player</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="text-gray-400 text-xs mb-2 block">Enter User ID</label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="User ID"
//                 value={userId}
//                 onChange={(e) => setUserId(e.target.value)}
//                 className="flex-1 bg-[#2a1a13] text-white rounded-lg px-3 py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
//               />
//               <button
//                 onClick={handleSearch}
//                 disabled={searching || !userId.trim()}
//                 className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-lg transition disabled:opacity-50"
//               >
//                 {searching ? '...' : 'Search'}
//               </button>
//             </div>
//           </div>

//           {searchResult && (
//             <div className="bg-[#2a1a13] rounded-lg p-3 border border-white/10">
//               <div className="flex items-center justify-between mb-2">
//                 <div>
//                   <p className="text-white font-medium">{searchResult.name}</p>
//                   <p className="text-gray-400 text-xs">ID: {searchResult._id}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={handleSendInvitation}
//                 disabled={inviting}
//                 className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2 rounded text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
//               >
//                 {inviting ? 'Sending...' : 'Send Invitation'}
//               </button>
//             </div>
//           )}

//           <p className="text-gray-500 text-xs text-center">
//             Enter the user ID to send an invitation
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Lobby Display Component - FIXED VERSION
// function LobbyDisplay({ lobby, onStartGame, onClose, gameState, setGameState, currentUser }) {
//   const [copied, setCopied] = useState(false);
//   const [showAddUser, setShowAddUser] = useState(false);
//   const [invitationSent, setInvitationSent] = useState(null);
//   const [socketReady, setSocketReady] = useState(false);
//   const { toggleReady, getLobby, startGameFromLobby } = useGame();
//   const { user: authUser } = useAuth();
//   const { socket, connected, on, off, reconnect } = useSocket();
//   const navigate = useNavigate();
  
//   // Add refs to prevent infinite loops
//   const lastFetchRef = useRef(null);
//   const fetchAttemptsRef = useRef(0);
//   const initialFetchDoneRef = useRef(false);

//   // Get the effective user (prioritize prop, then context)
//   const effectiveUser = currentUser || authUser;

//   // Extract user ID from multiple possible locations
//   const getUserId = (user) => {
//     if (!user) return null;
//     return user._id || user.id || user.userId || user.uid || null;
//   };

//   // Extract creator ID from multiple possible locations
//   const getCreatorId = (creator) => {
//     if (!creator) return null;
//     if (typeof creator === 'object') {
//       return creator._id || creator.id || creator.userId || creator.uid || null;
//     }
//     return creator;
//   };

//   const currentUserId = getUserId(effectiveUser);
//   const lobbyCreatorId = getCreatorId(lobby.createdBy);
  
//   // Compare as strings to handle different types
//   const isCreator = currentUserId && lobbyCreatorId && 
//                    String(currentUserId).trim() === String(lobbyCreatorId).trim();

//   // Check socket connection status and attempt to reconnect if needed
//   useEffect(() => {
//     console.log('🔄 LobbyDisplay - Checking socket connection:', { 
//       socket: !!socket, 
//       connected,
//       lobbyCode: lobby.lobbyCode
//     });
    
//     if (socket && connected) {
//       console.log('✅ Socket is connected and ready in LobbyDisplay');
//       setSocketReady(true);
      
//       // Ensure we're in the lobby room - only emit once
//       if (!initialFetchDoneRef.current) {
//         socket.emit('join-lobby', { lobbyCode: lobby.lobbyCode });
//         initialFetchDoneRef.current = true;
//       }
//     } else {
//       console.log('❌ Socket not ready in LobbyDisplay:', { socket: !!socket, connected });
//       setSocketReady(false);
      
//       // Attempt to reconnect if socket exists but not connected
//       if (socket && !connected && reconnect) {
//         console.log('🔄 Attempting to reconnect socket...');
//         reconnect();
//       }
//     }
//   }, [socket, connected, lobby.lobbyCode, reconnect]);

//   // Listen for game start
//   useEffect(() => {
//     if (!socket || !connected) {
//       console.log('Socket not available in LobbyDisplay, waiting for connection...');
//       return;
//     }

//     console.log('Setting up game-started listener in LobbyDisplay for lobby:', lobby.lobbyCode);

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event received in lobby display:', data);
//       if (data.lobbyCode === lobby.lobbyCode) {
//         console.log('✅ Game started for our lobby! Navigating to game page...');
//         onClose();
        
//         // Navigate to game page with the game data
//         navigate(`/game/online/${lobby.timeControl}`, {
//           state: {
//             gameData: data.game,
//             gameId: data.game.gameId
//           }
//         });
//       }
//     };

//     const handleLobbyUpdate = (data) => {
//       console.log('🔄 Lobby update received:', data);
//       if (data.lobby?.lobbyCode === lobby.lobbyCode && setGameState) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players
//         }));
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event:', data);
//       if (data.lobbyCode === lobby.lobbyCode && setGameState) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players
//         }));
//       }
//     };

//     on('game-started', handleGameStarted);
//     on('lobby-updated', handleLobbyUpdate);
//     on('player-ready', handlePlayerReady);

//     return () => {
//       console.log('Cleaning up game-started listener in LobbyDisplay');
//       off('game-started', handleGameStarted);
//       off('lobby-updated', handleLobbyUpdate);
//       off('player-ready', handlePlayerReady);
//     };
//   }, [socket, connected, lobby.lobbyCode, lobby.timeControl, on, off, navigate, onClose, setGameState]);

//   // Add periodic refresh as backup - FIXED to prevent infinite loops
//   useEffect(() => {
//     if (!lobby?.lobbyCode) return;
    
//     console.log('⏰ Setting up periodic lobby data refresh for:', lobby.lobbyCode);
    
//     // Reset fetch attempts when lobby changes
//     fetchAttemptsRef.current = 0;
    
//     const fetchLobbyData = async () => {
//       try {
//         // Don't fetch if we've already fetched in the last 3 seconds
//         const now = Date.now();
//         if (lastFetchRef.current && now - lastFetchRef.current < 3000) {
//           return;
//         }
        
//         // Limit fetch attempts to prevent infinite loops
//         fetchAttemptsRef.current += 1;
//         if (fetchAttemptsRef.current > 20) {
//           console.log('⚠️ Too many fetch attempts, stopping periodic refresh');
//           return;
//         }
        
//         console.log('📡 Periodic fetch: Getting latest lobby data');
//         lastFetchRef.current = now;
        
//         const result = await getLobby(lobby.lobbyCode);
//         console.log('📥 Periodic fetch response:', result);
        
//         if (result.success && result.lobby && setGameState) {
//           // Only update if there are actual changes
//           const currentPlayerCount = lobby.players?.length || 0;
//           const newPlayerCount = result.lobby.players?.length || 0;
          
//           // Check if ready states changed
//           const currentReadyState = lobby.players?.map(p => p.ready).join(',') || '';
//           const newReadyState = result.lobby.players?.map(p => p.ready).join(',') || '';
          
//           if (newPlayerCount !== currentPlayerCount || currentReadyState !== newReadyState) {
//             console.log(`🔄 Lobby state changed, updating...`);
            
//             setGameState((prevState) => ({
//               ...prevState,
//               lobbyData: result.lobby,
//               players: result.lobby.players
//             }));
//           }
//         }
//       } catch (error) {
//         console.error('❌ Error in periodic fetch:', error);
//       }
//     };
    
//     // Don't fetch immediately if we already have data
//     if (!initialFetchDoneRef.current) {
//       fetchLobbyData();
//       initialFetchDoneRef.current = true;
//     }
    
//     // Set up interval with longer delay
//     const interval = setInterval(fetchLobbyData, 5000); // Changed from 3000 to 5000ms
    
//     return () => {
//       console.log('🧹 Clearing periodic fetch interval');
//       clearInterval(interval);
//       lastFetchRef.current = null;
//       fetchAttemptsRef.current = 0;
//       initialFetchDoneRef.current = false;
//     };
//   }, [lobby?.lobbyCode]); // Only depend on lobbyCode

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleInviteSent = (user) => {
//     setInvitationSent(user);
//     setTimeout(() => setInvitationSent(null), 3000);
//   };

//   const handleToggleReady = async () => {
//     const result = await toggleReady(lobby.lobbyCode);
    
//     if (result.success && setGameState) {
//       setGameState({
//         ...gameState,
//         lobbyData: result.lobby,
//         players: result.lobby.players
//       });
//     }
//   };

//   const handleStartGameClick = async () => {
//     try {
//       console.log('Starting game for lobby:', lobby.lobbyCode);
      
//       // Ensure socket is connected before starting
//       if (!socketReady) {
//         console.log('Socket not ready, attempting to reconnect...');
//         if (reconnect) {
//           reconnect();
//           // Wait a moment for connection
//           await new Promise(resolve => setTimeout(resolve, 1000));
//         }
//       }
      
//       const result = await startGameFromLobby(lobby.lobbyCode);
//       console.log('Start game result:', result);
      
//       if (result.success) {
//         console.log('Game started successfully, waiting for socket event to navigate...');
//         // Don't navigate immediately - wait for the socket event
//       } else {
//         console.error('Failed to start game:', result.message);
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error('Error starting game:', error);
//       alert('Failed to start game');
//     }
//   };

//   const hasComputer = lobby.players?.some(p => p.isComputer === true);
//   const hasSpaceForPlayer = (lobby.players?.length || 0) < 2;
  
//   // Show invite button if:
//   // 1. User is the creator
//   // 2. No computer player in the lobby
//   // 3. There's space for another player (less than 2 players)
//   const showInviteButton = isCreator && !hasComputer && hasSpaceForPlayer;

//   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
//   const canStartGame = hasComputer ? true : allPlayersReady;

//   // Show socket status for debugging (remove in production)
//   const socketStatus = socketReady ? '✅ Connected' : '❌ Disconnected';

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

//           {/* Debug info - remove in production */}
//           <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
//             Socket: {socketStatus}
//           </div>

//           {invitationSent && (
//             <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
//               Invitation sent to {invitationSent.name}
//             </div>
//           )}

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
//               {lobby?.players?.map((player, index) => {
//                 const playerId = player.userId?._id || player.userId || player.id || player._id;
//                 const isCurrentUser = currentUserId && playerId && 
//                                      String(playerId).trim() === String(currentUserId).trim();
                
//                 return (
//                   <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                     <div className="flex items-center gap-2">
//                       <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                         isCurrentUser ? 'bg-amber-500/20' : 
//                         player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
//                       }`}>
//                         <span className={`text-sm font-bold ${
//                           isCurrentUser ? 'text-amber-400' : 
//                           player.isComputer ? 'text-gray-400' : 'text-blue-400'
//                         }`}>
//                           {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
//                         {isCurrentUser && (
//                           <span className="text-amber-400 text-xs ml-2">(You)</span>
//                         )}
//                         {player.isComputer && (
//                           <span className="text-gray-500 text-xs ml-2">(Computer)</span>
//                         )}
//                       </div>
//                     </div>
//                     {isCurrentUser && !player.isComputer ? (
//                       <button
//                         onClick={handleToggleReady}
//                         className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
//                           player.ready 
//                             ? 'bg-green-500/20 text-green-400' 
//                             : 'bg-yellow-500/20 text-yellow-400'
//                         }`}
//                       >
//                         {player.ready ? <Check size={12} /> : <Timer size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </button>
//                     ) : (
//                       <span className={`flex items-center gap-1 text-xs ${
//                         player.ready ? 'text-green-400' : 'text-gray-500'
//                       }`}>
//                         {player.ready && <Check size={12} />}
//                         {player.ready ? 'Ready' : 'Not Ready'}
//                       </span>
//                     )}
//                   </div>
//                 );
//               })}
              
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
//             {/* Invite button condition */}
//             {showInviteButton && (
//               <button
//                 onClick={() => setShowAddUser(true)}
//                 className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
//                 data-testid="invite-button"
//               >
//                 <UserPlus size={16} />
//                 Invite
//               </button>
//             )}
            
//             {/* Start game button width based on invite button presence */}
//             <button
//               onClick={handleStartGameClick}
//               disabled={!canStartGame || (!isCreator && lobby?.players?.length === 2)}
//               className={`${
//                 showInviteButton ? 'flex-1' : 'w-full'
//               } bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
//             >
//               <Swords size={16} />
//               {canStartGame ? 'Start Game' : 'Waiting for players...'}
//             </button>
//           </div>
//         </div>
//       </div>

//       {showAddUser && (
//         <AddUserModal
//           isOpen={showAddUser}
//           onClose={() => setShowAddUser(false)}
//           lobbyCode={lobby.lobbyCode}
//           onInviteSent={handleInviteSent}
//         />
//       )}
//     </>
//   );
// }

// // Create Lobby Modal
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
//     onCreateLobby(lobbySettings);
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

// // Play Dropdown Component
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

// // Settings Dropdown Component
// function SettingsDropdown({ isOpen, onClose, onSelect }) {
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

//   const settingsOptions = [
//     { 
//       name: "Language", 
//       icon: <Globe size={15} />, 
//       description: "English, Spanish, French, etc.",
//       action: "language"
//     },
//     { 
//       name: "Sound", 
//       icon: <Volume2 size={15} />, 
//       description: "Effects, music, notifications",
//       action: "sound"
//     },
//     { 
//       name: "Background", 
//       icon: <Image size={15} />, 
//       description: "Theme, colors, appearance",
//       action: "background"
//     },
//     { 
//       name: "Board", 
//       icon: <Grid size={15} />, 
//       description: "Piece style, board theme",
//       action: "board"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Settings</h3>
//         </div>
//         {settingsOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Profile Dropdown Component
// function ProfileDropdown({ isOpen, onClose, onSelect }) {
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

//   const profileOptions = [
//     { 
//       name: "View Profile", 
//       icon: <UserCircle size={15} />, 
//       description: "See your stats and games",
//       action: "view-profile"
//     },
//     { 
//       name: "Sign Out", 
//       icon: <LogOut size={15} />, 
//       description: "Log out of your account",
//       action: "signout"
//     },
//   ];

//   return (
//     <div 
//       ref={dropdownRef}
//       className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
//     >
//       <div className="py-2">
//         <div className="px-4 py-2 border-b border-white/10">
//           <h3 className="text-white text-sm font-semibold">Profile</h3>
//         </div>
//         {profileOptions.map((option) => (
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
//       </div>
//     </div>
//   );
// }

// // Main Sidebar Component - FIXED
// export default function Sidebar({ 
//   activeItem = '', 
//   onItemClick = () => {}, 
//   gameState = { status: null, lobbyData: null, players: [], showLobbyModal: false }, 
//   setGameState = () => {} 
// }) {
//   // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
//   const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
//   const [showCreateLobby, setShowCreateLobby] = useState(false);
//   const [showQuickMatch, setShowQuickMatch] = useState(false);
//   const [showInvitation, setShowInvitation] = useState(false);
//   const [currentInvitation, setCurrentInvitation] = useState(null);
  
//   const timeoutRef = useRef(null);
//   const settingsButtonRef = useRef(null);
//   const profileButtonRef = useRef(null);
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, loading: authLoading } = useAuth();
//   // FIX: Add 'connected' to the destructuring
//   const { socket, connected, on, off } = useSocket();
//   const { 
//     createLobby: createLobbyAPI, 
//     joinLobby, 
//     startGameFromLobby,
//     pendingInvitations,
//     declineInvitation,
//     lobby: contextLobby,
//     getLobby
//   } = useGame();

//   // DEFINE MENU ITEMS
//   const menuItems = [
//     { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
//     { name: "Puzzles", icon: <Puzzle size={15} /> },
//     { name: "Learn", icon: <GraduationCap size={15} /> },
//     { name: "Watch", icon: <Eye size={15} /> },
//     { name: "Social", icon: <Users size={15} /> },
//     { name: "More", icon: <MoreHorizontal size={15} /> },
//   ];

//   // DEFINE BOTTOM ITEMS
//   const bottomItems = [
//     { name: "Notification", icon: <Bell size={15} /> },
//     { name: "Dark mode", icon: <Moon size={15} /> },
//     { name: "Profile", icon: <UserCircle size={15} /> },
//     { name: "Settings", icon: <Settings size={15} /> },
//     { name: "Support", icon: <LifeBuoy size={15} /> },
//   ];

//   // ALL OTHER HOOKS
//   useEffect(() => {
//     console.log('👤 Sidebar - Current User:', user);
//   }, [user]);

//   // Monitor socket connection status - FIX: Now 'connected' is defined
//   useEffect(() => {
//     console.log('🔌 Sidebar - Socket status:', { 
//       exists: !!socket, 
//       connected,
//       userId: user?._id || user?.id 
//     });
    
//     // If socket exists but not connected, try to reconnect
//     if (socket && !connected) {
//       console.log('🔌 Sidebar - Socket exists but not connected, will rely on SocketContext reconnection');
//     }
    
//     // If no socket, check if user exists
//     if (!socket && user) {
//       console.log('🔌 Sidebar - No socket but user exists, SocketContext should be initializing...');
//     }
//   }, [socket, connected, user]);

//   // Watch for lobby from context - FIXED with additional check
//   useEffect(() => {
//     if (contextLobby && setGameState) {
//       console.log('🏠 Lobby from context detected in Sidebar:', contextLobby);
      
//       // Check if this lobby is already being displayed to prevent loops
//       if (gameState?.lobbyData?.lobbyCode === contextLobby.lobbyCode) {
//         console.log('Lobby already displayed, updating data only');
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: contextLobby,
//           players: contextLobby.players
//         }));
//       } else {
//         console.log('Showing new lobby modal');
//         setGameState({
//           status: 'lobby',
//           lobbyData: contextLobby,
//           players: contextLobby.players,
//           showLobbyModal: true
//         });
//       }
//     }
//   }, [contextLobby, setGameState]);

//   useEffect(() => {
//     if (!socket) {
//       console.log('🔌 Socket not available yet');
//       return;
//     }

//     console.log('🔌 Setting up socket listeners in Sidebar');

//     const handleInvitation = (data) => {
//       console.log('📨 Received invitation event:', data);
//       setCurrentInvitation(data);
//       setShowInvitation(true);
//     };

//     const handlePlayerJoined = (data) => {
//       console.log('👤 Player joined lobby event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('🔄 Updating lobby with player data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleLobbyUpdated = (data) => {
//       console.log('🔄 Lobby updated event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobby?.lobbyCode) {
//         console.log('🔄 Updating lobby with new data:', data.lobby);
        
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handlePlayerReady = (data) => {
//       console.log('✅ Player ready event in sidebar:', data);
      
//       if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         setGameState((prevState) => ({
//           ...prevState,
//           lobbyData: data.lobby,
//           players: data.lobby.players,
//           showLobbyModal: true
//         }));
//       }
//     };

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event in sidebar:', data);
      
//       if (gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
//         console.log('✅ Game starting for our lobby! Redirecting player to game...');
        
//         if (setGameState) {
//           setGameState((prevState) => ({
//             ...prevState,
//             showLobbyModal: false,
//             lobbyData: null,
//             status: 'playing'
//           }));
//         }
        
//         navigate(`/game/online/${data.game.timeControl}`, { 
//           state: { 
//             gameData: data.game,
//             gameId: data.game.gameId
//           } 
//         });
//       }
//     };

//     on('lobby-invitation', handleInvitation);
//     on('player-joined-lobby', handlePlayerJoined);
//     on('lobby-updated', handleLobbyUpdated);
//     on('player-ready', handlePlayerReady);
//     on('game-started', handleGameStarted);

//     return () => {
//       console.log('🧹 Cleaning up socket listeners');
//       off('lobby-invitation', handleInvitation);
//       off('player-joined-lobby', handlePlayerJoined);
//       off('lobby-updated', handleLobbyUpdated);
//       off('player-ready', handlePlayerReady);
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, on, off, gameState?.lobbyData?.lobbyCode, setGameState, navigate]);

//   useEffect(() => {
//     if (pendingInvitations.length > 0) {
//       const latestInvitation = pendingInvitations[pendingInvitations.length - 1];
//       setCurrentInvitation(latestInvitation);
//       setShowInvitation(true);
//     }
//   }, [pendingInvitations]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
//         setOpenSettingsDropdown(false);
//       }
//       if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
//         setOpenProfileDropdown(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // HANDLERS
//   const handleBottomItemClick = (itemName) => {
//     if (itemName === "Settings") {
//       setOpenSettingsDropdown(!openSettingsDropdown);
//       setOpenProfileDropdown(false);
//     } else if (itemName === "Profile") {
//       setOpenProfileDropdown(!openProfileDropdown);
//       setOpenSettingsDropdown(false);
//     } else if (itemName === "Support") {
//       onItemClick("Support");
//     }
//   };

//   const handleSettingsSelect = (action) => {
//     if (action === "language") {
//       onItemClick("Language Settings");
//     } else if (action === "sound") {
//       onItemClick("Sound Settings");
//     } else if (action === "background") {
//       onItemClick("Background Settings");
//     } else if (action === "board") {
//       onItemClick("Board Settings");
//       navigate('/board-style');
//     }
//   };

//   const handleProfileSelect = (action) => {
//     if (action === "view-profile") {
//       onItemClick("View Profile");
//       navigate('/profile');
//     } else if (action === "signout") {
//       logout();
//       navigate('/login');
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
//       navigate('/tournament');
//     } else if (action === "custom-settings") {
//       navigate('/custom-settings');
//     }
//   };

//   const handleMenuItemClick = (itemName) => {
//     if (itemName === "Puzzles") {
//       navigate('/puzzles');
//     } else if (itemName === "Learn") {
//       navigate('/chess-learning');
//     } else if (itemName === "Watch") {
//       navigate('/watch');
//     } else if (itemName === "Social") {
//       navigate('/social');
//     } else if (itemName === "More") {
//       navigate('/more');
//     } else {
//       if (onItemClick) {
//         onItemClick(itemName);
//       }
//     }
//   };

//   const handleCreateLobby = async (lobbySettings) => {
//     const result = await createLobbyAPI(lobbySettings);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       if (onItemClick) {
//         onItemClick("Lobby Created");
//       }
//       setShowCreateLobby(false);
//     }
//   };

//   const handleMatchFound = (matchData) => {
//     const lobbyData = {
//       lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
//       gameType: 'online',
//       timeControl: matchData.timeControl,
//       isPrivate: false,
//       players: [
//         { 
//           id: 'current-user', 
//           name: 'You', 
//           rating: 1450, 
//           ready: true 
//         },
//         { 
//           id: 'opponent-' + Date.now(), 
//           name: matchData.opponent.name, 
//           rating: matchData.opponent.rating, 
//           ready: true 
//         }
//       ]
//     };
    
//     if (setGameState) {
//       setGameState({
//         ...gameState,
//         status: 'playing',
//         gameMode: 'online',
//         timeControl: matchData.timeControl,
//         lobbyData: lobbyData,
//         players: lobbyData.players,
//         showLobbyModal: false
//       });
//     }
    
//     navigate(`/game/online/${matchData.timeControl}`, { 
//       state: { 
//         lobbyData: lobbyData,
//         opponent: matchData.opponent 
//       } 
//     });
//   };

//   const handleStartGame = async () => {
//     const currentLobby = gameState?.lobbyData;
//     if (currentLobby && setGameState) {
//       const canStart = currentLobby.players.some(p => p.isComputer) 
//         ? true 
//         : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
//       if (canStart) {
//         if (!currentLobby.players.some(p => p.isComputer)) {
//           console.log('🚀 Starting game for lobby:', currentLobby.lobbyCode);
//           const result = await startGameFromLobby(currentLobby.lobbyCode);
//           console.log('📥 Start game result:', result);
          
//           if (result.success) {
//             console.log('✅ Game started successfully:', result.game);
            
//             setGameState({
//               ...gameState,
//               status: 'playing',
//               showLobbyModal: false
//             });
            
//             navigate(`/game/online/${currentLobby.timeControl}`, { 
//               state: { 
//                 gameData: result.game,
//                 gameId: result.game.gameId
//               } 
//             });
//           } else {
//             console.error('❌ Failed to start game:', result.message);
//           }
//         } else {
//           setGameState({
//             ...gameState,
//             status: 'playing',
//             showLobbyModal: false
//           });
//           navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
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

//   const handleAcceptInvitation = async () => {
//     const result = await joinLobby(currentInvitation.lobbyCode);
    
//     const lobbyResult = await getLobby(currentInvitation.lobbyCode);
//     console.log("📥 getLobby response after accepting invitation:", lobbyResult);
    
//     if (result.success) {
//       if (setGameState) {
//         setGameState({
//           ...gameState,
//           status: 'lobby',
//           lobbyData: result.lobby,
//           players: result.lobby.players,
//           showLobbyModal: true
//         });
//       }
//       declineInvitation(currentInvitation.id);
//       setShowInvitation(false);
//       setCurrentInvitation(null);
//     }
//   };

//   const handleDeclineInvitation = () => {
//     declineInvitation(currentInvitation.id);
//     setShowInvitation(false);
//     setCurrentInvitation(null);
//   };

//   // RETURN JSX
//   return (
//     <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: rgba(255, 162, 0, 0.3);
//           border-radius: 10px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: rgba(255, 162, 0, 0.5);
//         }
//       `}</style>

//       {authLoading ? (
//         <div className="flex-1 flex items-center justify-center">
//           <div className="text-gray-400">Loading...</div>
//         </div>
//       ) : (
//         <>
//           <div className="flex items-center gap-3 px-6 py-8">
//             <Crown className="text-amber-400" size={28} />
//             <div>
//               <h1 className="text-white font-semibold text-xl tracking-wide">Chess</h1>
//               <h2 className="text-amber-400 font-semibold -mt-1 text-xl tracking-wide">Verse</h2>
//             </div>
//           </div>

//           <nav className="flex-1 overflow-y-auto px-4 space-y-0 custom-scrollbar mt-28">
//             {menuItems.map((item) => {
//               const isActive = activeItem === item.name;
              
//               return (
//                 <div
//                   key={item.name}
//                   className="relative"
//                   onMouseEnter={() => handleMouseEnter(item.name)}
//                   onMouseLeave={handleMouseLeave}
//                 >
//                   <button
//                     onClick={() => handleMenuItemClick(item.name)}
//                     className={`w-full flex items-center gap-4 px-4 py-2 rounded-full transition text-xs
//                       ${
//                         isActive
//                           ? "bg-[#FFA20026] text-white"
//                           : "text-gray-400 hover:bg-white/5 hover:text-[#FFA20026]"
//                       }`}
//                   >
//                     <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
//                     {item.name}
//                   </button>
                  
//                   {item.name === "Play" && (
//                     <PlayDropdown 
//                       isOpen={openDropdown === "Play"}
//                       onClose={() => setOpenDropdown(null)}
//                       onSelect={handleDropdownSelect}
//                     />
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm relative">
//             {bottomItems.map((item) => (
//               <div
//                 key={item.name}
//                 ref={
//                   item.name === "Settings" ? settingsButtonRef : 
//                   item.name === "Profile" ? profileButtonRef : 
//                   null
//                 }
//                 className="relative"
//               >
//                 <BottomItem 
//                   icon={item.icon} 
//                   label={item.name}
//                   onClick={() => handleBottomItemClick(item.name)}
//                 />
                
//                 {item.name === "Settings" && (
//                   <SettingsDropdown 
//                     isOpen={openSettingsDropdown}
//                     onClose={() => setOpenSettingsDropdown(false)}
//                     onSelect={handleSettingsSelect}
//                   />
//                 )}

//                 {item.name === "Profile" && (
//                   <ProfileDropdown 
//                     isOpen={openProfileDropdown}
//                     onClose={() => setOpenProfileDropdown(false)}
//                     onSelect={handleProfileSelect}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           <CreateLobbyModal 
//             isOpen={showCreateLobby}
//             onClose={() => setShowCreateLobby(false)}
//             onCreateLobby={handleCreateLobby}
//           />

//           <QuickMatchModal
//             isOpen={showQuickMatch}
//             onClose={() => setShowQuickMatch(false)}
//             onMatchFound={handleMatchFound}
//           />

//           {gameState?.showLobbyModal && gameState?.lobbyData && (
//             <LobbyDisplay 
//               lobby={gameState.lobbyData}
//               onStartGame={handleStartGame}
//               onClose={handleCloseLobby}
//               gameState={gameState}
//               setGameState={setGameState}
//               currentUser={user}
//             />
//           )}

//           <InvitationNotification
//             isOpen={showInvitation}
//             onClose={() => setShowInvitation(false)}
//             invitation={currentInvitation}
//             onAccept={handleAcceptInvitation}
//             onDecline={handleDeclineInvitation}
//           />
//         </>
//       )}
//     </div>
//   );
// }


//testing 4

// components/Sidebar.jsx - COMPLETE FIXED VERSION
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
  Volume2,
  Bot,
  Timer,
  Bell,  
  Globe,
  X,
  Check,
  UserPlus,
  Image,
  LogOut,
  UserCircle,
  Copy,
  Grid,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import QuickMatchModal from './pagescomponents/QuickMatchModal';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { useGame } from '../context/GameContext';

// Invitation Notification Component
function InvitationNotification({ isOpen, onClose, invitation, onAccept, onDecline }) {
  if (!isOpen || !invitation) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[70] p-4">
      <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-lg font-semibold">Game Invitation</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-[#2a1a13] p-4 rounded-lg">
            <p className="text-white mb-2">
              <span className="font-bold">{invitation.inviterName}</span> invited you to join a game
            </p>
            <div className="space-y-1 text-sm">
              <p className="text-gray-400">Game Type: <span className="text-white capitalize">{invitation.gameType} Chess</span></p>
              <p className="text-gray-400">Time Control: <span className="text-white">{invitation.timeControl}</span></p>
              <p className="text-gray-400">Lobby Code: <span className="text-amber-400 font-mono">{invitation.lobbyCode}</span></p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onAccept}
              className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 rounded-lg transition"
            >
              Accept
            </button>
            <button
              onClick={onDecline}
              className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 rounded-lg transition"
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add User Modal
function AddUserModal({ isOpen, onClose, lobbyCode, onInviteSent }) {
  const [userId, setUserId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState('');
  const { inviteToLobby, searchUsers } = useGame(); // Added searchUsers here
  const { user } = useAuth();

  const handleSearch = async () => {
    if (!userId.trim()) return;
    
    setSearching(true);
    setError('');
    setSearchResult(null);
    
    try {
      console.log('🔍 Searching for user:', userId.trim());
      
      // Use the searchUsers function from GameContext
      const result = await searchUsers(userId.trim());
      
      console.log('📥 Search result:', result);
      
      if (result.success && result.users && result.users.length > 0) {
        // Take the first user from search results
        const foundUser = result.users[0];
        setSearchResult({
          _id: foundUser._id,
          name: foundUser.displayName || foundUser.name,
          username: foundUser.name,
          isOnline: foundUser.isOnline,
          rating: foundUser.rating || 1200
        });
      } else {
        setError('No user found with that name or email');
      }
    } catch (error) {
      console.error('❌ Search error:', error);
      setError(error.message || 'Failed to search user');
    } finally {
      setSearching(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSendInvitation = async () => {
    if (!searchResult) return;
    
    setInviting(true);
    setError('');
    
    try {
      console.log(`📤 Sending invitation from ${user?._id} to ${searchResult._id} for lobby ${lobbyCode}`);
      
      const result = await inviteToLobby(lobbyCode, searchResult._id);
      
      console.log('📥 Invitation result:', result);
      
      if (result.success) {
        console.log('✅ Invitation sent successfully');
        onInviteSent(searchResult);
        setUserId('');
        setSearchResult(null);
        onClose();
      } else {
        console.error('❌ Invitation failed:', result.message);
        setError(result.message || 'Failed to send invitation');
      }
    } catch (error) {
      console.error('❌ Invitation error:', error);
      setError(error.message || 'Failed to send invitation');
    } finally {
      setInviting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] p-4 sm:p-6">
  <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-full max-w-[95%] sm:max-w-md md:max-w-lg mx-auto p-4 sm:p-5 md:p-6 max-h-[90vh] overflow-y-auto">
    <div className="flex justify-between items-center mb-3 sm:mb-4 sticky top-0 bg-[#1a0f0a] pt-1">
      <h2 className="text-white text-base sm:text-lg md:text-xl font-semibold">Invite Player</h2>
      <button onClick={onClose} className="text-gray-400 hover:text-white p-1">
        <X size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>

    {error && (
      <div className="mb-3 sm:mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm">
        {error}
      </div>
    )}

    <div className="space-y-3 sm:space-y-4">
      <div>
        <label className="text-gray-400 text-xs sm:text-sm mb-1.5 sm:mb-2 block">Enter username or email</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="Username or email"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full sm:flex-1 bg-[#2a1a13] text-white rounded-lg px-3 sm:px-4 py-2.5 sm:py-2 text-sm border border-white/10 focus:outline-none focus:border-amber-500"
            autoFocus
          />
          <button
            onClick={handleSearch}
            disabled={searching || !userId.trim()}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg transition disabled:opacity-50 text-sm sm:text-base"
          >
            {searching ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </span>
            ) : 'Search'}
          </button>
        </div>
      </div>

      {searchResult && (
        <div className="bg-[#2a1a13] rounded-lg p-3 sm:p-4 border border-white/10">
          <div className="flex items-center gap-2 sm:gap-3 mb-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              searchResult.isOnline ? 'bg-green-500/20' : 'bg-gray-600/20'
            }`}>
              <span className={`text-xs sm:text-sm font-bold ${
                searchResult.isOnline ? 'text-green-400' : 'text-gray-400'
              }`}>
                {searchResult.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm sm:text-base font-medium truncate">{searchResult.name}</p>
              <p className="text-gray-400 text-xs">
                Rating: {searchResult.rating} • {searchResult.isOnline ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>
          <button
            onClick={handleSendInvitation}
            disabled={inviting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black py-2.5 sm:py-2 rounded text-sm transition flex items-center justify-center gap-1 disabled:opacity-50"
          >
            {inviting ? (
              <>
                <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </>
            ) : 'Send Invitation'}
          </button>
        </div>
      )}

      <p className="text-gray-500 text-xs text-center">
        Search by username or email address
      </p>
    </div>
  </div>
</div>
  );
}
// Lobby Display Component - FIXED VERSION
function LobbyDisplay({ lobby, onStartGame, onClose, gameState, setGameState, currentUser }) {
  const [copied, setCopied] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [invitationSent, setInvitationSent] = useState(null);
  const [socketReady, setSocketReady] = useState(false);
  const { toggleReady, getLobby, startGameFromLobby } = useGame();
  const { user: authUser } = useAuth();
  const { socket, connected, on, off, reconnect } = useSocket();
  const navigate = useNavigate();
  
  // Add refs to prevent infinite loops
  const lastFetchRef = useRef(null);
  const fetchAttemptsRef = useRef(0);
  const initialFetchDoneRef = useRef(false);
  const gameStartedRef = useRef(false); // Add this to prevent multiple navigations

  // Get the effective user (prioritize prop, then context)
  const effectiveUser = currentUser || authUser;

  // Extract user ID from multiple possible locations
  const getUserId = (user) => {
    if (!user) return null;
    return user._id || user.id || user.userId || user.uid || null;
  };

  // Extract creator ID from multiple possible locations
  const getCreatorId = (creator) => {
    if (!creator) return null;
    if (typeof creator === 'object') {
      return creator._id || creator.id || creator.userId || creator.uid || null;
    }
    return creator;
  };

  const currentUserId = getUserId(effectiveUser);
  const lobbyCreatorId = getCreatorId(lobby.createdBy);
  
  // Compare as strings to handle different types
  const isCreator = currentUserId && lobbyCreatorId && 
                   String(currentUserId).trim() === String(lobbyCreatorId).trim();

  // Check socket connection status and attempt to reconnect if needed
  useEffect(() => {
    console.log('🔄 LobbyDisplay - Checking socket connection:', { 
      socket: !!socket, 
      connected,
      lobbyCode: lobby.lobbyCode
    });
    
    if (socket && connected) {
      console.log('✅ Socket is connected and ready in LobbyDisplay');
      setSocketReady(true);
      
      // Ensure we're in the lobby room - only emit once
      if (!initialFetchDoneRef.current) {
        socket.emit('join-lobby', { lobbyCode: lobby.lobbyCode });
        initialFetchDoneRef.current = true;
      }
    } else {
      console.log('❌ Socket not ready in LobbyDisplay:', { socket: !!socket, connected });
      setSocketReady(false);
      
      // Attempt to reconnect if socket exists but not connected
      if (socket && !connected && reconnect) {
        console.log('🔄 Attempting to reconnect socket...');
        reconnect();
      }
    }
  }, [socket, connected, lobby.lobbyCode, reconnect]);

  // Listen for game start - FIXED VERSION
  useEffect(() => {
    if (!socket || !connected) {
      console.log('Socket not available in LobbyDisplay, waiting for connection...');
      return;
    }

    console.log('Setting up game-started listener in LobbyDisplay for lobby:', lobby.lobbyCode);

    const handleGameStarted = (data) => {
      console.log('🎮 Game started event received in lobby display:', data);
      
      // Check if this is for our lobby
      if (data.lobbyCode === lobby.lobbyCode || data.game?.lobbyCode === lobby.lobbyCode) {
        console.log('✅ Game started for our lobby! Navigating to game page...');
        
        // Prevent multiple navigations
        if (gameStartedRef.current) return;
        gameStartedRef.current = true;
        
        // Close the lobby modal
        onClose();
        
        // Get the game data
        const gameData = data.game || data;
        const gameId = gameData.gameId || gameData._id;
        const timeControl = gameData.timeControl || lobby.timeControl || '10+0';
        
        console.log('Navigating with game data:', { gameData, gameId, timeControl });
        
        // Navigate to game page
        navigate(`/game/online/${timeControl}`, {
          state: {
            gameData: gameData,
            gameId: gameId,
            fromLobby: true
          },
          replace: true // Use replace to prevent back navigation to lobby
        });
      }
    };

    const handleLobbyUpdate = (data) => {
      console.log('🔄 Lobby update received:', data);
      if (data.lobby?.lobbyCode === lobby.lobbyCode && setGameState) {
        setGameState((prevState) => ({
          ...prevState,
          lobbyData: data.lobby,
          players: data.lobby.players
        }));
      }
    };

    const handlePlayerReady = (data) => {
      console.log('✅ Player ready event:', data);
      if (data.lobbyCode === lobby.lobbyCode && setGameState) {
        setGameState((prevState) => ({
          ...prevState,
          lobbyData: data.lobby,
          players: data.lobby.players
        }));
      }
    };

    on('game-started', handleGameStarted);
    on('lobby-updated', handleLobbyUpdate);
    on('player-ready', handlePlayerReady);

    return () => {
      console.log('Cleaning up game-started listener in LobbyDisplay');
      off('game-started', handleGameStarted);
      off('lobby-updated', handleLobbyUpdate);
      off('player-ready', handlePlayerReady);
      gameStartedRef.current = false; // Reset on cleanup
    };
  }, [socket, connected, lobby.lobbyCode, lobby.timeControl, on, off, navigate, onClose, setGameState]);

  // Add periodic refresh as backup - FIXED to prevent infinite loops
  useEffect(() => {
    if (!lobby?.lobbyCode) return;
    
    console.log('⏰ Setting up periodic lobby data refresh for:', lobby.lobbyCode);
    
    // Reset fetch attempts when lobby changes
    fetchAttemptsRef.current = 0;
    
    const fetchLobbyData = async () => {
      try {
        // Don't fetch if we've already fetched in the last 3 seconds
        const now = Date.now();
        if (lastFetchRef.current && now - lastFetchRef.current < 3000) {
          return;
        }
        
        // Limit fetch attempts to prevent infinite loops
        fetchAttemptsRef.current += 1;
        if (fetchAttemptsRef.current > 20) {
          console.log('⚠️ Too many fetch attempts, stopping periodic refresh');
          return;
        }
        
        console.log('📡 Periodic fetch: Getting latest lobby data');
        lastFetchRef.current = now;
        
        const result = await getLobby(lobby.lobbyCode);
        console.log('📥 Periodic fetch response:', result);
        
        if (result.success && result.lobby && setGameState) {
          // Only update if there are actual changes
          const currentPlayerCount = lobby.players?.length || 0;
          const newPlayerCount = result.lobby.players?.length || 0;
          
          // Check if ready states changed
          const currentReadyState = lobby.players?.map(p => p.ready).join(',') || '';
          const newReadyState = result.lobby.players?.map(p => p.ready).join(',') || '';
          
          if (newPlayerCount !== currentPlayerCount || currentReadyState !== newReadyState) {
            console.log(`🔄 Lobby state changed, updating...`);
            
            setGameState((prevState) => ({
              ...prevState,
              lobbyData: result.lobby,
              players: result.lobby.players
            }));
          }
        }
      } catch (error) {
        console.error('❌ Error in periodic fetch:', error);
      }
    };
    
    // Don't fetch immediately if we already have data
    if (!initialFetchDoneRef.current) {
      fetchLobbyData();
      initialFetchDoneRef.current = true;
    }
    
    // Set up interval with longer delay
    const interval = setInterval(fetchLobbyData, 5000); // Changed from 3000 to 5000ms
    
    return () => {
      console.log('🧹 Clearing periodic fetch interval');
      clearInterval(interval);
      lastFetchRef.current = null;
      fetchAttemptsRef.current = 0;
      initialFetchDoneRef.current = false;
    };
  }, [lobby?.lobbyCode, lobby?.players, getLobby, setGameState]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lobby.lobbyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInviteSent = (user) => {
    setInvitationSent(user);
    setTimeout(() => setInvitationSent(null), 3000);
  };

  const handleToggleReady = async () => {
    const result = await toggleReady(lobby.lobbyCode);
    
    if (result.success && setGameState) {
      setGameState((prevState) => ({
        ...prevState,
        lobbyData: result.lobby,
        players: result.lobby.players
      }));
    }
  };

  const handleStartGameClick = async () => {
    try {
      console.log('Starting game for lobby:', lobby.lobbyCode);
      
      // Ensure socket is connected before starting
      if (!socketReady) {
        console.log('Socket not ready, attempting to reconnect...');
        if (reconnect) {
          reconnect();
          // Wait a moment for connection
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
      
      const result = await startGameFromLobby(lobby.lobbyCode);
      console.log('Start game result:', result);
      
      if (result.success) {
        console.log('Game started successfully, waiting for socket event to navigate...');
        // Don't navigate immediately - wait for the socket event
        // The socket event handler will navigate
      } else {
        console.error('Failed to start game:', result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error('Error starting game:', error);
      alert('Failed to start game');
    }
  };

  const hasComputer = lobby.players?.some(p => p.isComputer === true);
  const hasSpaceForPlayer = (lobby.players?.length || 0) < 2;
  
  // Show invite button if:
  // 1. User is the creator
  // 2. No computer player in the lobby
  // 3. There's space for another player (less than 2 players)
  const showInviteButton = isCreator && !hasComputer && hasSpaceForPlayer;

  const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
  const canStartGame = hasComputer ? true : allPlayersReady;

  // Show socket status for debugging (remove in production)
  const socketStatus = socketReady ? '✅ Connected' : '❌ Disconnected';

  return (
    <>
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Debug info - remove in production */}
          <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
            Socket: {socketStatus}
          </div>

          {invitationSent && (
            <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-400 px-4 py-2 rounded-lg text-sm">
              Invitation sent to {invitationSent.name}
            </div>
          )}

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
              {lobby?.players?.map((player, index) => {
                const playerId = player.userId?._id || player.userId || player.id || player._id;
                const isCurrentUser = currentUserId && playerId && 
                                     String(playerId).trim() === String(currentUserId).trim();
                
                return (
                  <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCurrentUser ? 'bg-amber-500/20' : 
                        player.isComputer ? 'bg-gray-600/20' : 'bg-blue-500/20'
                      }`}>
                        <span className={`text-sm font-bold ${
                          isCurrentUser ? 'text-amber-400' : 
                          player.isComputer ? 'text-gray-400' : 'text-blue-400'
                        }`}>
                          {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
                        {isCurrentUser && (
                          <span className="text-amber-400 text-xs ml-2">(You)</span>
                        )}
                        {player.isComputer && (
                          <span className="text-gray-500 text-xs ml-2">(Computer)</span>
                        )}
                      </div>
                    </div>
                    {isCurrentUser && !player.isComputer ? (
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
                );
              })}
              
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
            {/* Invite button condition */}
            {showInviteButton && (
              <button
                onClick={() => setShowAddUser(true)}
                className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2"
                data-testid="invite-button"
              >
                <UserPlus size={16} />
                Invite
              </button>
            )}
            
            {/* Start game button width based on invite button presence */}
            <button
              onClick={handleStartGameClick}
              disabled={!canStartGame || (!isCreator && lobby?.players?.length === 2)}
              className={`${
                showInviteButton ? 'flex-1' : 'w-full'
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
          lobbyCode={lobby.lobbyCode}
          onInviteSent={handleInviteSent}
        />
      )}
    </>
  );
}

// Create Lobby Modal
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
    onCreateLobby(lobbySettings);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
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

// Play Dropdown Component
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

// Settings Dropdown Component
function SettingsDropdown({ isOpen, onClose, onSelect }) {
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

  const settingsOptions = [
    { 
      name: "Language", 
      icon: <Globe size={15} />, 
      description: "English, Spanish, French, etc.",
      action: "language"
    },
    { 
      name: "Sound", 
      icon: <Volume2 size={15} />, 
      description: "Effects, music, notifications",
      action: "sound"
    },
    { 
      name: "Background", 
      icon: <Image size={15} />, 
      description: "Theme, colors, appearance",
      action: "background"
    },
    { 
      name: "Board", 
      icon: <Grid size={15} />, 
      description: "Piece style, board theme",
      action: "board"
    },
  ];

  return (
    <div 
      ref={dropdownRef}
      className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
    >
      <div className="py-2">
        <div className="px-4 py-2 border-b border-white/10">
          <h3 className="text-white text-sm font-semibold">Settings</h3>
        </div>
        {settingsOptions.map((option) => (
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
      </div>
    </div>
  );
}

// Profile Dropdown Component
function ProfileDropdown({ isOpen, onClose, onSelect }) {
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

  const profileOptions = [
    { 
      name: "View Profile", 
      icon: <UserCircle size={15} />, 
      description: "See your stats and games",
      action: "view-profile"
    },
    { 
      name: "Sign Out", 
      icon: <LogOut size={15} />, 
      description: "Log out of your account",
      action: "signout"
    },
  ];

  return (
    <div 
      ref={dropdownRef}
      className="absolute left-0 bottom-full mb-1 w-64 bg-[#1a0f0a] rounded-lg border border-white/10 shadow-xl z-50 overflow-hidden"
    >
      <div className="py-2">
        <div className="px-4 py-2 border-b border-white/10">
          <h3 className="text-white text-sm font-semibold">Profile</h3>
        </div>
        {profileOptions.map((option) => (
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
      </div>
    </div>
  );
}

// Main Sidebar Component - FIXED
export default function Sidebar({ 
  activeItem = '', 
  onItemClick = () => {}, 
  gameState = { status: null, lobbyData: null, players: [], showLobbyModal: false }, 
  setGameState = () => {} 
}) {
  // ALL HOOKS MUST BE CALLED BEFORE ANY CONDITIONAL RETURNS
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
  const [openProfileDropdown, setOpenProfileDropdown] = useState(false);
  const [showCreateLobby, setShowCreateLobby] = useState(false);
  const [showQuickMatch, setShowQuickMatch] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [currentInvitation, setCurrentInvitation] = useState(null);
  
  const timeoutRef = useRef(null);
  const settingsButtonRef = useRef(null);
  const profileButtonRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, loading: authLoading } = useAuth();
  const { socket, connected, on, off } = useSocket();
  const { 
    createLobby: createLobbyAPI, 
    joinLobby, 
    startGameFromLobby,
    pendingInvitations,
    declineInvitation,
    lobby: contextLobby,
    getLobby
  } = useGame();

  // DEFINE MENU ITEMS
  const menuItems = [
    { name: "Play", icon: <Gamepad2 size={15} />, hasDropdown: true },
    { name: "Puzzles", icon: <Puzzle size={15} /> },
    { name: "Learn", icon: <GraduationCap size={15} /> },
    // { name: "Watch", icon: <Eye size={15} /> },
     { name: "Social", icon: <Users size={15} /> },
    { name: "More", icon: <MoreHorizontal size={15} /> },
  ];

  // DEFINE BOTTOM ITEMS
  const bottomItems = [
    { name: "Notification", icon: <Bell size={15} /> },
    { name: "Dark mode", icon: <Moon size={15} /> },
    { name: "Profile", icon: <UserCircle size={15} /> },
    { name: "Settings", icon: <Settings size={15} /> },
    { name: "Support", icon: <LifeBuoy size={15} /> },
  ];

  // ALL OTHER HOOKS
  useEffect(() => {
    console.log('👤 Sidebar - Current User:', user);
  }, [user]);

  // Monitor socket connection status
  useEffect(() => {
    console.log('🔌 Sidebar - Socket status:', { 
      exists: !!socket, 
      connected,
      userId: user?._id || user?.id 
    });
    
    // If socket exists but not connected, try to reconnect
    if (socket && !connected) {
      console.log('🔌 Sidebar - Socket exists but not connected, will rely on SocketContext reconnection');
    }
    
    // If no socket, check if user exists
    if (!socket && user) {
      console.log('🔌 Sidebar - No socket but user exists, SocketContext should be initializing...');
    }
  }, [socket, connected, user]);

  // Watch for lobby from context - FIXED with additional check
  useEffect(() => {
    if (contextLobby && setGameState) {
      console.log('🏠 Lobby from context detected in Sidebar:', contextLobby);
      
      // Check if this lobby is already being displayed to prevent loops
      if (gameState?.lobbyData?.lobbyCode === contextLobby.lobbyCode) {
        console.log('Lobby already displayed, updating data only');
        setGameState((prevState) => ({
          ...prevState,
          lobbyData: contextLobby,
          players: contextLobby.players
        }));
      } else {
        console.log('Showing new lobby modal');
        setGameState({
          status: 'lobby',
          lobbyData: contextLobby,
          players: contextLobby.players,
          showLobbyModal: true
        });
      }
    }
  }, [contextLobby, setGameState]);

  useEffect(() => {
    if (!socket) {
      console.log('🔌 Socket not available yet');
      return;
    }

    console.log('🔌 Setting up socket listeners in Sidebar');

    const handleInvitation = (data) => {
      console.log('📨 Received invitation event:', data);
      setCurrentInvitation(data);
      setShowInvitation(true);
    };

    const handlePlayerJoined = (data) => {
      console.log('👤 Player joined lobby event in sidebar:', data);
      
      if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
        console.log('🔄 Updating lobby with player data:', data.lobby);
        
        setGameState((prevState) => ({
          ...prevState,
          lobbyData: data.lobby,
          players: data.lobby.players,
          showLobbyModal: true
        }));
      }
    };

    const handleLobbyUpdated = (data) => {
      console.log('🔄 Lobby updated event in sidebar:', data);
      
      if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobby?.lobbyCode) {
        console.log('🔄 Updating lobby with new data:', data.lobby);
        
        setGameState((prevState) => ({
          ...prevState,
          lobbyData: data.lobby,
          players: data.lobby.players,
          showLobbyModal: true
        }));
      }
    };

    const handlePlayerReady = (data) => {
      console.log('✅ Player ready event in sidebar:', data);
      
      if (setGameState && gameState?.lobbyData?.lobbyCode === data.lobbyCode) {
        setGameState((prevState) => ({
          ...prevState,
          lobbyData: data.lobby,
          players: data.lobby.players,
          showLobbyModal: true
        }));
      }
    };

    // FIXED: Game started handler
    const handleGameStarted = (data) => {
      console.log('🎮 Game started event in sidebar:', data);
      
      // Check if this is for our current lobby
      if (gameState?.lobbyData?.lobbyCode === data.lobbyCode || 
          gameState?.lobbyData?.lobbyCode === data.game?.lobbyCode) {
        console.log('✅ Game starting for our lobby! Redirecting player to game...');
        
        if (setGameState) {
          setGameState((prevState) => ({
            ...prevState,
            showLobbyModal: false,
            lobbyData: null,
            status: 'playing'
          }));
        }
        
        // Get game data
        const gameData = data.game || data;
        const gameId = gameData.gameId || gameData._id;
        const timeControl = gameData.timeControl || gameState?.lobbyData?.timeControl || '10+0';
        
        console.log('Navigating to game with:', { gameData, gameId, timeControl });
        
        // Navigate to game page
        navigate(`/game/online/${timeControl}`, { 
          state: { 
            gameData: gameData,
            gameId: gameId,
            fromLobby: true
          },
          replace: true
        });
      }
    };

    on('lobby-invitation', handleInvitation);
    on('player-joined-lobby', handlePlayerJoined);
    on('lobby-updated', handleLobbyUpdated);
    on('player-ready', handlePlayerReady);
    on('game-started', handleGameStarted);

    return () => {
      console.log('🧹 Cleaning up socket listeners');
      off('lobby-invitation', handleInvitation);
      off('player-joined-lobby', handlePlayerJoined);
      off('lobby-updated', handleLobbyUpdated);
      off('player-ready', handlePlayerReady);
      off('game-started', handleGameStarted);
    };
  }, [socket, on, off, gameState?.lobbyData?.lobbyCode, gameState?.lobbyData?.timeControl, setGameState, navigate]);

  useEffect(() => {
    if (pendingInvitations.length > 0) {
      const latestInvitation = pendingInvitations[pendingInvitations.length - 1];
      setCurrentInvitation(latestInvitation);
      setShowInvitation(true);
    }
  }, [pendingInvitations]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsButtonRef.current && !settingsButtonRef.current.contains(event.target)) {
        setOpenSettingsDropdown(false);
      }
      if (profileButtonRef.current && !profileButtonRef.current.contains(event.target)) {
        setOpenProfileDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // HANDLERS
  const handleBottomItemClick = (itemName) => {
    if (itemName === "Settings") {
      setOpenSettingsDropdown(!openSettingsDropdown);
      setOpenProfileDropdown(false);
    } else if (itemName === "Profile") {
      setOpenProfileDropdown(!openProfileDropdown);
      setOpenSettingsDropdown(false);
    } else if (itemName === "Support") {
      onItemClick("Support");
    }
  };

  const handleSettingsSelect = (action) => {
    if (action === "language") {
      onItemClick("Language Settings");
    } else if (action === "sound") {
      onItemClick("Sound Settings");
    } else if (action === "background") {
      onItemClick("Background Settings");
    } else if (action === "board") {
      onItemClick("Board Settings");
      navigate('/board-style');
    }
  };

  const handleProfileSelect = (action) => {
    if (action === "view-profile") {
      onItemClick("View Profile");
      navigate('/profile');
    } else if (action === "signout") {
      logout();
      navigate('/login');
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
      if (onItemClick) {
        onItemClick(itemName);
      }
    }
  };

  const handleCreateLobby = async (lobbySettings) => {
    const result = await createLobbyAPI(lobbySettings);
    
    if (result.success) {
      if (setGameState) {
        setGameState({
          ...gameState,
          status: 'lobby',
          lobbyData: result.lobby,
          players: result.lobby.players,
          showLobbyModal: true
        });
      }
      if (onItemClick) {
        onItemClick("Lobby Created");
      }
      setShowCreateLobby(false);
    }
  };

  const handleMatchFound = (matchData) => {
    const lobbyData = {
      lobbyCode: 'QUICK' + Math.random().toString(36).substring(2, 5).toUpperCase(),
      gameType: 'online',
      timeControl: matchData.timeControl,
      isPrivate: false,
      players: [
        { 
          id: 'current-user', 
          name: 'You', 
          rating: 1450, 
          ready: true 
        },
        { 
          id: 'opponent-' + Date.now(), 
          name: matchData.opponent.name, 
          rating: matchData.opponent.rating, 
          ready: true 
        }
      ]
    };
    
    if (setGameState) {
      setGameState({
        ...gameState,
        status: 'playing',
        gameMode: 'online',
        timeControl: matchData.timeControl,
        lobbyData: lobbyData,
        players: lobbyData.players,
        showLobbyModal: false
      });
    }
    
    navigate(`/game/online/${matchData.timeControl}`, { 
      state: { 
        lobbyData: lobbyData,
        opponent: matchData.opponent 
      } 
    });
  };

  const handleStartGame = async () => {
    const currentLobby = gameState?.lobbyData;
    if (currentLobby && setGameState) {
      const canStart = currentLobby.players.some(p => p.isComputer) 
        ? true 
        : currentLobby.players.length === 2 && currentLobby.players.every(p => p.ready);
      
      if (canStart) {
        if (!currentLobby.players.some(p => p.isComputer)) {
          console.log('🚀 Starting game for lobby:', currentLobby.lobbyCode);
          const result = await startGameFromLobby(currentLobby.lobbyCode);
          console.log('📥 Start game result:', result);
          
          if (result.success) {
            console.log('✅ Game started successfully:', result.game);
            
            setGameState({
              ...gameState,
              status: 'playing',
              showLobbyModal: false
            });
            
            navigate(`/game/online/${currentLobby.timeControl}`, { 
              state: { 
                gameData: result.game,
                gameId: result.game.gameId
              } 
            });
          } else {
            console.error('❌ Failed to start game:', result.message);
          }
        } else {
          setGameState({
            ...gameState,
            status: 'playing',
            showLobbyModal: false
          });
          navigate(`/game/vs-computer/${currentLobby.timeControl}`, { 
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

  const handleAcceptInvitation = async () => {
    const result = await joinLobby(currentInvitation.lobbyCode);
    
    const lobbyResult = await getLobby(currentInvitation.lobbyCode);
    console.log("📥 getLobby response after accepting invitation:", lobbyResult);
    
    if (result.success) {
      if (setGameState) {
        setGameState({
          ...gameState,
          status: 'lobby',
          lobbyData: result.lobby,
          players: result.lobby.players,
          showLobbyModal: true
        });
      }
      declineInvitation(currentInvitation.id);
      setShowInvitation(false);
      setCurrentInvitation(null);
    }
  };

  const handleDeclineInvitation = () => {
    declineInvitation(currentInvitation.id);
    setShowInvitation(false);
    setCurrentInvitation(null);
  };

  // RETURN JSX
  return (
    <div className="w-64 bg-[#0f0703] flex flex-col h-full border-r border-white/5">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 162, 0, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 162, 0, 0.5);
        }
      `}</style>

      {authLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      ) : (
        <>
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

          <div className="px-4 pb-8 space-y-0 pt-4 mt-4 text-sm relative">
            {bottomItems.map((item) => (
              <div
                key={item.name}
                ref={
                  item.name === "Settings" ? settingsButtonRef : 
                  item.name === "Profile" ? profileButtonRef : 
                  null
                }
                className="relative"
              >
                <BottomItem 
                  icon={item.icon} 
                  label={item.name}
                  onClick={() => handleBottomItemClick(item.name)}
                />
                
                {item.name === "Settings" && (
                  <SettingsDropdown 
                    isOpen={openSettingsDropdown}
                    onClose={() => setOpenSettingsDropdown(false)}
                    onSelect={handleSettingsSelect}
                  />
                )}

                {item.name === "Profile" && (
                  <ProfileDropdown 
                    isOpen={openProfileDropdown}
                    onClose={() => setOpenProfileDropdown(false)}
                    onSelect={handleProfileSelect}
                  />
                )}
              </div>
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
              onClose={handleCloseLobby}
              gameState={gameState}
              setGameState={setGameState}
              currentUser={user}
            />
          )}

          <InvitationNotification
            isOpen={showInvitation}
            onClose={() => setShowInvitation(false)}
            invitation={currentInvitation}
            onAccept={handleAcceptInvitation}
            onDecline={handleDeclineInvitation}
          />
        </>
      )}
    </div>
  );
}