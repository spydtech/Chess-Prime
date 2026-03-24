// import React from "react";
// import { useNavigate } from "react-router-dom"; // Add this import

// export default function Profile() {
//   const navigate = useNavigate(); // Add this line

//   return (
//     <div className="flex-1 bg-[#140A05] min-h-screen p-6 h-full overflow-auto">
//       <div className="w-full bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5]">

//         {/* Username Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#5A3A1A]">
//           <div className="flex items-center gap-3">
//             <div className="w-4 h-4 bg-green-600 rounded-full"></div>
//             <h1 className="text-2xl font-normal text-[#F5F5F5]">
//               User123
//             </h1>
//           </div>

//           <div className="flex gap-3 text-sm">
//             <button 
//               onClick={() => navigate('/edit-profile')} // Add this
//               className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]"
//             >
//               ⚙ Edit profile
//             </button>
//             {/* <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
//               📖 Opening explorer
//             </button> */}
//             {/* <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
//               ⬇ Export games
//             </button> */}
//             <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
//               👤 Friends
//             </button>
//             <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
//               More ▾
//             </button>
//           </div>
//         </div>

//         {/* Stats Row */}
//         <div className="flex gap-10 px-6 py-4 border-b border-[#5A3A1A] text-sm text-[#A1A1AA]">
//           <div>0 Tournament Points</div>
//           <div>0 Studies</div>
//           <div>0 Forum Posts</div>
//           {/* <div>0 Blog Posts</div> */}
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 py-28 w-full">

//           {/* Left */}
//           <div>
//             <h2 className="text-xl font-normal mb-4 text-[#F5F5F5]">
//               Welcome to ChessVerse!
//             </h2>

//             <p className="mb-2">This is your profile page.</p>

//             <p className="mb-4">
//               Will a child use this account? You might want to enable{" "}
//               <span className="text-[#F5A524] hover:underline cursor-pointer">
//                 Kid mode
//               </span>.
//             </p>

//             <p className="mb-3">What now? Here are a few suggestions:</p>

//             <ul className="list-disc pl-5 space-y-1 text-[#F5A524]">
//               <li className="hover:underline cursor-pointer">
//                 Learn chess rules
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Improve with chess tactics puzzles.
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Play the Artificial Intelligence.
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Play opponents from around the world.
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Follow your friends on Lichess.
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Play in tournaments.
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Learn from Study and Videos.
//               </li>
//               <li className="hover:underline cursor-pointer">
//                 Configure ChessVerse to your liking.
//               </li>
//               <li className="text-[#F5F5F5]">Explore the site and have fun :)</li>
//             </ul>
//           </div>

//           {/* Right */}
//           <div className="text-sm text-[#F5F5F5] space-y-2">
//             <p>
//               <span className="font-medium">Member since</span> 26 Feb 2026
//             </p>
//             <p>
//               <span className="font-medium">Active</span> 2 minutes ago
//             </p>
//             <p>
//               <span className="text-[#F5A524] hover:underline cursor-pointer">
//                 Profile completion: 0%
//               </span>
//             </p>
//             <p>
//               <span className="font-medium">
//                 Time spent playing:
//               </span>{" "}
//               0 minutes
//             </p>
//           </div>

//         </div>

//         {/* Bottom Tabs */}
//         <div className="flex border-t border-[#5A3A1A]">
//           <div className="px-6 py-3 border-r border-[#5A3A1A] bg-[#1A0D06] font-medium">
//             Activity
//           </div>
//           <div className="px-6 py-3 text-[#A1A1AA]">
//             0 Games
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// components/Profile.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useGame } from "../context/GameContext";
// import profileService from "../services/profileService";
 
// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, profileCompletion, refreshProfileCompletion } = useAuth();
//   const {
//     getLobbyInvites,
//     acceptInvite,
//     loading: gameLoading
//   } = useGame();
 
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [memberSince, setMemberSince] = useState("");
//   const [lastActive, setLastActive] = useState("");
 
//   const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
//   const [invites, setInvites] = useState([]);
//   const [loadingInvites, setLoadingInvites] = useState(false);
//   const [showLobbyModal, setShowLobbyModal] = useState(false);
//   const [currentLobby, setCurrentLobby] = useState(null);
 
//   useEffect(() => {
//     fetchProfileData();
//   }, []);
 
//   const fetchProfileData = async () => {
//     try {
//       setLoading(true);
//       const data = await profileService.getMyProfile();
//       setProfileData(data);
     
//       if (data.memberSince) {
//         const date = new Date(data.memberSince);
//         setMemberSince(date.toLocaleDateString('en-US', {
//           day: 'numeric',
//           month: 'short',
//           year: 'numeric'
//         }));
//       }
     
//       if (data.lastSeen) {
//         const lastSeen = new Date(data.lastSeen);
//         const now = new Date();
//         const diffMs = now - lastSeen;
//         const diffMins = Math.floor(diffMs / 60000);
       
//         if (diffMins < 1) {
//           setLastActive('Just now');
//         } else if (diffMins < 60) {
//           setLastActive(`${diffMins} minute${diffMins > 1 ? 's' : ''} ago`);
//         } else {
//           setLastActive(lastSeen.toLocaleDateString());
//         }
//       }
     
//       await refreshProfileCompletion();
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const fetchInvites = async () => {
//     try {
//       setLoadingInvites(true);
     
//       console.log("Fetching invites...");
//       const result = await getLobbyInvites();
//       console.log("Fetched invites result:", result);
     
//       if (result.success) {
//         setInvites(result.invites || []);
//       } else {
//         console.warn("Could not load invites:", result.message);
//         setInvites([]);
//       }
//     } catch (error) {
//       console.error("Error fetching invites:", error);
//       setInvites([]);
//     } finally {
//       setLoadingInvites(false);
//     }
//   };
  
//   const handleAcceptInvite = async (lobbyCode) => {
//     try {
//       const result = await acceptInvite(lobbyCode);
      
//       if (result.success) {
//         if (result.gameStarting) {
//           // Game is starting automatically - navigate directly to game page
//           navigate(`/game/${result.gameId}`);
//         } else {
//           // Set the lobby data and show the modal
//           setCurrentLobby(result.lobby);
//           setShowLobbyModal(true);
          
//           // Refresh invites after accepting
//           setInvites(prev => prev.filter(inv => inv.lobbyCode !== lobbyCode));
//           await fetchInvites();
//         }
//       } else {
//         console.error("Error accepting invite:", result.message);
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error("Error accepting invite:", error);
//       alert("Failed to accept invitation");
//     }
//   };
  
//   const handleCloseLobby = () => {
//     setShowLobbyModal(false);
//     setCurrentLobby(null);
//   };
  
//   const handleStartGame = () => {
//     // This will be called when the creator starts the game
//     // The game start will be handled by socket events
//     setShowLobbyModal(false);
//     setCurrentLobby(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-[#140A05] min-h-screen p-6 h-full overflow-auto flex items-center justify-center">
//         <div className="text-[#F5F5F5]">Loading profile...</div>
//       </div>
//     );
//   }
 
//   const displayData = profileData || user;
 
//   return (
//     <div className="flex-1 bg-[#140A05] min-h-screen p-6 h-full overflow-auto">
//       <div className="w-full bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5]">
 
//         {/* Username Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#5A3A1A]">
//           <div className="flex items-center gap-3">
//             <div className={`w-4 h-4 ${displayData?.isOnline ? 'bg-green-600' : 'bg-gray-600'} rounded-full`}></div>
//             <h1 className="text-2xl font-normal text-[#F5F5F5]">
//               {displayData?.displayName || displayData?.name || 'User'}
//             </h1>
//           </div>
 
//           <div className="flex gap-3 text-sm">
//             <button
//               onClick={() => navigate('/edit-profile')}
//               className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]"
//             >
//               ⚙ Edit profile
//             </button>
 
//             {/* FRIENDS DROPDOWN */}
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setShowFriendsDropdown(!showFriendsDropdown);
//                   fetchInvites();
//                 }}
//                 className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]"
//                 disabled={gameLoading}
//               >
//                 👤 Friends {gameLoading ? '...' : '▾'}
//               </button>
 
//               {showFriendsDropdown && (
//                 <div className="absolute right-0 mt-2 w-72 bg-[#1A0D06] border border-[#5A3A1A] rounded shadow-lg z-50">
 
//                   <div className="p-3 border-b border-[#5A3A1A] font-medium">
//                     Received Invitations
//                   </div>
 
//                   {loadingInvites || gameLoading ? (
//                     <div className="p-3 text-gray-400 text-sm">
//                       Loading invites...
//                     </div>
//                   ) : invites.length === 0 ? (
//                     <div className="p-3 text-gray-400 text-sm">
//                       No invitations
//                     </div>
//                   ) : (
//                     invites.map((invite) => (
//                       <div
//                         key={invite.lobbyCode}
//                         className="flex justify-between items-center p-3 border-b border-[#5A3A1A]"
//                       >
//                         <div>
//                           <p className="text-sm text-[#F5F5F5]">
//                             Lobby {invite.lobbyCode}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             From {invite.createdBy?.name || "Player"}
//                           </p>
//                         </div>
 
//                         <button
//                           onClick={() => handleAcceptInvite(invite.lobbyCode)}
//                           className="px-2 py-1 text-xs bg-green-600 rounded hover:bg-green-700"
//                           disabled={gameLoading}
//                         >
//                           {gameLoading ? 'Joining...' : 'Accept'}
//                         </button>
//                       </div>
//                     ))
//                   )}
 
//                 </div>
//               )}
//             </div>
 
//             <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
//               More ▾
//             </button>
//           </div>
//         </div>
 
//         {/* Stats Row */}
//         <div className="flex gap-10 px-6 py-4 border-b border-[#5A3A1A] text-sm text-[#A1A1AA]">
//           <div>{displayData?.tournamentPoints || 0} Tournament Points</div>
//           <div>{displayData?.studies || 0} Studies</div>
//           <div>{displayData?.forumPosts || 0} Forum Posts</div>
//         </div>
 
//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 py-28 w-full">
 
//           {/* Left */}
//           <div>
//             <h2 className="text-xl font-normal mb-4 text-[#F5F5F5]">
//               Welcome to ChessVerse, {displayData?.displayName || displayData?.name}!
//             </h2>
 
//             {displayData?.bio ? (
//               <p className="mb-4">{displayData.bio}</p>
//             ) : (
//               <>
//                 <p className="mb-2">This is your profile page.</p>
//                 <p className="mb-4">
//                   Complete your profile to get started. You might want to enable{" "}
//                   <span
//                     onClick={() => navigate('/edit-profile')}
//                     className="text-[#F5A524] hover:underline cursor-pointer"
//                   >
//                     Kid mode
//                   </span>.
//                 </p>
//               </>
//             )}
 
//             <p className="mb-3">What now? Here are a few suggestions:</p>
 
//             <ul className="list-disc pl-5 space-y-1 text-[#F5A524]">
//               <li className="hover:underline cursor-pointer">Learn chess rules</li>
//               <li className="hover:underline cursor-pointer">Improve with chess tactics puzzles.</li>
//               <li className="hover:underline cursor-pointer">Play the Artificial Intelligence.</li>
//               <li className="hover:underline cursor-pointer">Play opponents from around the world.</li>
//               <li className="hover:underline cursor-pointer">Follow your friends on Lichess.</li>
//               <li className="hover:underline cursor-pointer">Play in tournaments.</li>
//               <li className="hover:underline cursor-pointer">Learn from Study and Videos.</li>
//               <li className="hover:underline cursor-pointer">Configure ChessVerse to your liking.</li>
//               <li className="text-[#F5F5F5]">Explore the site and have fun :)</li>
//             </ul>
//           </div>
 
//           {/* Right */}
//           <div className="text-sm text-[#F5F5F5] space-y-2">
//             <p>
//               <span className="font-medium">Member since</span> {memberSince || '26 Feb 2026'}
//             </p>
//             <p>
//               <span className="font-medium">Active</span> {lastActive || '2 minutes ago'}
//             </p>
//             <p>
//               <span
//                 onClick={() => navigate('/edit-profile')}
//                 className="text-[#F5A524] hover:underline cursor-pointer"
//               >
//                 Profile completion: {profileCompletion}%
//               </span>
//             </p>
//             <p>
//               <span className="font-medium">Time spent playing:</span>{" "}
//               {displayData?.gamesPlayed ? `${displayData.gamesPlayed * 10} minutes` : '0 minutes'}
//             </p>
//           </div>
 
//         </div>
 
//         {/* Bottom Tabs */}
//         <div className="flex border-t border-[#5A3A1A]">
//           <div className="px-6 py-3 border-r border-[#5A3A1A] bg-[#1A0D06] font-medium">
//             Activity
//           </div>
//           <div className="px-6 py-3 text-[#A1A1AA]">
//             {displayData?.gamesPlayed || 0} Games
//           </div>
//         </div>
 
//       </div>
      
//       {/* Lobby Modal */}
//       {showLobbyModal && currentLobby && (
//         <LobbyModal
//           lobby={currentLobby}
//           onClose={handleCloseLobby}
//           onStartGame={handleStartGame}
//           currentUser={user}
//         />
//       )}
//     </div>
//   );
// }

// // Lobby Modal Component
// function LobbyModal({ lobby, onClose, onStartGame, currentUser }) {
//   const [copied, setCopied] = useState(false);
//   const { toggleReady } = useGame();
//   const { socket, on, off } = useGame(); // or useSocket depending on your setup
  
//   const currentUserId = currentUser?._id || currentUser?.id;
//   const isCreator = currentUserId && lobby.createdBy && 
//                    String(currentUserId) === String(lobby.createdBy?._id || lobby.createdBy);
  
//   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);
//   const canStartGame = allPlayersReady;

//   // Listen for game start
//   useEffect(() => {
//     if (!socket) return;

//     const handleGameStarted = (data) => {
//       if (data.lobbyCode === lobby.lobbyCode) {
//         onClose();
//         // Navigate to game page
//         window.location.href = `/game/${data.gameId}`;
//       }
//     };

//     on('game-started', handleGameStarted);

//     return () => {
//       off('game-started', handleGameStarted);
//     };
//   }, [socket, lobby.lobbyCode, on, off, onClose]);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleToggleReady = async () => {
//     await toggleReady(lobby.lobbyCode);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
//           <span className="text-gray-400 text-sm">Lobby Code:</span>
//           <div className="flex items-center gap-2">
//             <span className="text-amber-400 font-mono font-bold">{lobby?.lobbyCode}</span>
//             <button
//               onClick={handleCopyCode}
//               className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
//             >
//               <Copy size={12} />
//               {copied ? 'Copied!' : 'Copy'}
//             </button>
//           </div>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Game Type:</span>
//             <span className="text-white text-sm capitalize">{lobby?.gameType || 'Standard'} Chess</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Time Control:</span>
//             <span className="text-white text-sm">{lobby?.timeControl}</span>
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-4 mb-4">
//           <p className="text-gray-400 text-sm mb-3">Players ({lobby?.players?.length || 0}/2):</p>
//           <div className="space-y-2">
//             {lobby?.players?.map((player, index) => {
//               const playerId = player.userId?._id || player.userId || player.id || player._id;
//               const isCurrentUser = currentUserId && playerId && 
//                                    String(playerId) === String(currentUserId);
              
//               return (
//                 <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       isCurrentUser ? 'bg-amber-500/20' : 'bg-blue-500/20'
//                     }`}>
//                       <span className={`text-sm font-bold ${isCurrentUser ? 'text-amber-400' : 'text-blue-400'}`}>
//                         {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
//                       {isCurrentUser && (
//                         <span className="text-amber-400 text-xs ml-2">(You)</span>
//                       )}
//                     </div>
//                   </div>
//                   {isCurrentUser ? (
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
//               );
//             })}
            
//             {lobby?.players?.length < 2 && (
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

//         <div className="flex gap-2">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 py-2.5 rounded-lg text-sm transition"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



//tesing 
// components/Profile.js
// tesing - components/Profile.js
// components/Profile.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useGame } from "../context/GameContext";
// import { useSocket } from "../context/SocketContext";
// import { X, Check, Timer, Copy } from "lucide-react";
// import profileService from "../services/profileService";
 
// export default function Profile() {
//   const navigate = useNavigate();
//   const { user, profileCompletion, refreshProfileCompletion } = useAuth();
//   const {
//     getLobbyInvites,
//     acceptInvite,
//     loading: gameLoading
//   } = useGame();
 
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [memberSince, setMemberSince] = useState("");
//   const [lastActive, setLastActive] = useState("");
 
//   const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
//   const [invites, setInvites] = useState([]);
//   const [loadingInvites, setLoadingInvites] = useState(false);
//   const [showLobbyModal, setShowLobbyModal] = useState(false);
//   const [currentLobby, setCurrentLobby] = useState(null);
 
//   useEffect(() => {
//     fetchProfileData();
//   }, []);
 
//   const fetchProfileData = async () => {
//     try {
//       setLoading(true);
//       const data = await profileService.getMyProfile();
//       setProfileData(data);
     
//       if (data.memberSince) {
//         const date = new Date(data.memberSince);
//         setMemberSince(date.toLocaleDateString('en-US', {
//           day: 'numeric',
//           month: 'short',
//           year: 'numeric'
//         }));
//       }
     
//       if (data.lastSeen) {
//         const lastSeen = new Date(data.lastSeen);
//         const now = new Date();
//         const diffMs = now - lastSeen;
//         const diffMins = Math.floor(diffMs / 60000);
       
//         if (diffMins < 1) {
//           setLastActive('Just now');
//         } else if (diffMins < 60) {
//           setLastActive(`${diffMins} minute${diffMins > 1 ? 's' : ''} ago`);
//         } else {
//           setLastActive(lastSeen.toLocaleDateString());
//         }
//       }
     
//       await refreshProfileCompletion();
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     } finally {
//       setLoading(false);
//     }
//   };
 
//   const fetchInvites = async () => {
//     try {
//       setLoadingInvites(true);
     
//       console.log("Fetching invites...");
//       const result = await getLobbyInvites();
//       console.log("Fetched invites result:", result);
     
//       if (result.success) {
//         setInvites(result.invites || []);
//       } else {
//         console.warn("Could not load invites:", result.message);
//         setInvites([]);
//       }
//     } catch (error) {
//       console.error("Error fetching invites:", error);
//       setInvites([]);
//     } finally {
//       setLoadingInvites(false);
//     }
//   };
  
//   const handleAcceptInvite = async (lobbyCode) => {
//     try {
//       const result = await acceptInvite(lobbyCode);
//       console.log("Accept invite result:", result);
      
//       if (result.success) {
//         // Always show lobby modal - never auto-start
//         setCurrentLobby(result.lobby);
//         setShowLobbyModal(true);
        
//         // Refresh invites after accepting
//         setInvites(prev => prev.filter(inv => inv.lobbyCode !== lobbyCode));
//         await fetchInvites();
        
//         // Close the friends dropdown
//         setShowFriendsDropdown(false);
//       } else {
//         console.error("Error accepting invite:", result.message);
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error("Error accepting invite:", error);
//       alert("Failed to accept invitation");
//     }
//   };
  
//   const handleCloseLobby = () => {
//     setShowLobbyModal(false);
//     setCurrentLobby(null);
//   };
  
//   const handleStartGame = () => {
//     setShowLobbyModal(false);
//     setCurrentLobby(null);
//   };

//   if (loading) {
//     return (
//       <div className="flex-1 bg-[#140A05] min-h-screen p-6 h-full overflow-auto flex items-center justify-center">
//         <div className="text-[#F5F5F5]">Loading profile...</div>
//       </div>
//     );
//   }
 
//   const displayData = profileData || user;
 
//   return (
//     <div className="flex-1 bg-[#140A05] min-h-screen p-6 h-full overflow-auto">
//       <div className="w-full bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5]">
 
//         {/* Username Header */}
//         <div className="flex justify-between items-center px-6 py-4 border-b border-[#5A3A1A]">
//           <div className="flex items-center gap-3">
//             <div className={`w-4 h-4 ${displayData?.isOnline ? 'bg-green-600' : 'bg-gray-600'} rounded-full`}></div>
//             <h1 className="text-2xl font-normal text-[#F5F5F5]">
//               {displayData?.displayName || displayData?.name || 'User'}
//             </h1>
//           </div>
 
//           <div className="flex gap-3 text-sm">
//             <button
//               onClick={() => navigate('/edit-profile')}
//               className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]"
//             >
//               ⚙ Edit profile
//             </button>
 
//             {/* FRIENDS DROPDOWN */}
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   setShowFriendsDropdown(!showFriendsDropdown);
//                   fetchInvites();
//                 }}
//                 className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]"
//                 disabled={gameLoading}
//               >
//                 👤 Friends {gameLoading ? '...' : '▾'}
//               </button>
 
//               {showFriendsDropdown && (
//                 <div className="absolute right-0 mt-2 w-72 bg-[#1A0D06] border border-[#5A3A1A] rounded shadow-lg z-50">
 
//                   <div className="p-3 border-b border-[#5A3A1A] font-medium">
//                     Received Invitations
//                   </div>
 
//                   {loadingInvites || gameLoading ? (
//                     <div className="p-3 text-gray-400 text-sm">
//                       Loading invites...
//                     </div>
//                   ) : invites.length === 0 ? (
//                     <div className="p-3 text-gray-400 text-sm">
//                       No invitations
//                     </div>
//                   ) : (
//                     invites.map((invite) => (
//                       <div
//                         key={invite.lobbyCode}
//                         className="flex justify-between items-center p-3 border-b border-[#5A3A1A]"
//                       >
//                         <div>
//                           <p className="text-sm text-[#F5F5F5]">
//                             Lobby {invite.lobbyCode}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             From {invite.createdBy?.name || "Player"}
//                           </p>
//                           <p className="text-xs text-gray-400">
//                             {invite.timeControl} • {invite.gameType}
//                           </p>
//                         </div>
 
//                         <button
//                           onClick={() => handleAcceptInvite(invite.lobbyCode)}
//                           className="px-2 py-1 text-xs bg-green-600 rounded hover:bg-green-700"
//                           disabled={gameLoading}
//                         >
//                           {gameLoading ? 'Joining...' : 'Accept'}
//                         </button>
//                       </div>
//                     ))
//                   )}
 
//                 </div>
//               )}
//             </div>
 
//             <button className="px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C]">
//               More ▾
//             </button>
//           </div>
//         </div>
 
//         {/* Stats Row */}
//         <div className="flex gap-10 px-6 py-4 border-b border-[#5A3A1A] text-sm text-[#A1A1AA]">
//           <div>{displayData?.tournamentPoints || 0} Tournament Points</div>
//           <div>{displayData?.studies || 0} Studies</div>
//           <div>{displayData?.forumPosts || 0} Forum Posts</div>
//         </div>
 
//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-5 py-28 w-full">
 
//           {/* Left */}
//           <div>
//             <h2 className="text-xl font-normal mb-4 text-[#F5F5F5]">
//               Welcome to ChessVerse, {displayData?.displayName || displayData?.name}!
//             </h2>
 
//             {displayData?.bio ? (
//               <p className="mb-4">{displayData.bio}</p>
//             ) : (
//               <>
//                 <p className="mb-2">This is your profile page.</p>
//                 <p className="mb-4">
//                   Complete your profile to get started. You might want to enable{" "}
//                   <span
//                     onClick={() => navigate('/edit-profile')}
//                     className="text-[#F5A524] hover:underline cursor-pointer"
//                   >
//                     Kid mode
//                   </span>.
//                 </p>
//               </>
//             )}
 
//             <p className="mb-3">What now? Here are a few suggestions:</p>
 
//             <ul className="list-disc pl-5 space-y-1 text-[#F5A524]">
//               <li className="hover:underline cursor-pointer">Learn chess rules</li>
//               <li className="hover:underline cursor-pointer">Improve with chess tactics puzzles.</li>
//               <li className="hover:underline cursor-pointer">Play the Artificial Intelligence.</li>
//               <li className="hover:underline cursor-pointer">Play opponents from around the world.</li>
//               <li className="hover:underline cursor-pointer">Follow your friends on Lichess.</li>
//               <li className="hover:underline cursor-pointer">Play in tournaments.</li>
//               <li className="hover:underline cursor-pointer">Learn from Study and Videos.</li>
//               <li className="hover:underline cursor-pointer">Configure ChessVerse to your liking.</li>
//               <li className="text-[#F5F5F5]">Explore the site and have fun :)</li>
//             </ul>
//           </div>
 
//           {/* Right */}
//           <div className="text-sm text-[#F5F5F5] space-y-2">
//             <p>
//               <span className="font-medium">Member since</span> {memberSince || '26 Feb 2026'}
//             </p>
//             <p>
//               <span className="font-medium">Active</span> {lastActive || '2 minutes ago'}
//             </p>
//             <p>
//               <span
//                 onClick={() => navigate('/edit-profile')}
//                 className="text-[#F5A524] hover:underline cursor-pointer"
//               >
//                 Profile completion: {profileCompletion}%
//               </span>
//             </p>
//             <p>
//               <span className="font-medium">Time spent playing:</span>{" "}
//               {displayData?.gamesPlayed ? `${displayData.gamesPlayed * 10} minutes` : '0 minutes'}
//             </p>
//           </div>
 
//         </div>
 
//         {/* Bottom Tabs */}
//         <div className="flex border-t border-[#5A3A1A]">
//           <div className="px-6 py-3 border-r border-[#5A3A1A] bg-[#1A0D06] font-medium">
//             Activity
//           </div>
//           <div className="px-6 py-3 text-[#A1A1AA]">
//             {displayData?.gamesPlayed || 0} Games
//           </div>
//         </div>
 
//       </div>
      
//       {/* Lobby Modal */}
//       {showLobbyModal && currentLobby && (
//         <LobbyModal
//           lobby={currentLobby}
//           onClose={handleCloseLobby}
//           onStartGame={handleStartGame}
//           currentUser={user}
//         />
//       )}
//     </div>
//   );
// }

// // Lobby Modal Component - FIXED with better socket handling and connection check
// // function LobbyModal({ lobby, onClose, onStartGame, currentUser }) {
// //   const [copied, setCopied] = useState(false);
// //   const [socketReady, setSocketReady] = useState(false);
// //   const { toggleReady, startGameFromLobby } = useGame();
// //   const { socket, connected, on, off } = useSocket();
// //   const navigate = useNavigate();
  
// //   const currentUserId = currentUser?._id || currentUser?.id;
// //   const isCreator = currentUserId && lobby.createdBy && 
// //                    String(currentUserId) === String(lobby.createdBy?._id || lobby.createdBy);
  
// //   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);

// //   // Check socket connection status
// //   useEffect(() => {
// //     if (socket && connected) {
// //       console.log('✅ Socket is connected and ready in LobbyModal');
// //       setSocketReady(true);
// //     } else {
// //       console.log('❌ Socket not ready in LobbyModal:', { socket: !!socket, connected });
// //       setSocketReady(false);
// //     }
// //   }, [socket, connected]);

// //   // Listen for game start
// //   useEffect(() => {
// //     if (!socket || !connected) {
// //       console.log('Socket not available in LobbyModal, waiting for connection...');
// //       return;
// //     }

// //     console.log('Setting up game-started listener in LobbyModal for lobby:', lobby.lobbyCode);

// //     const handleGameStarted = (data) => {
// //       console.log('🎮 Game started event received in lobby modal:', data);
// //       if (data.lobbyCode === lobby.lobbyCode) {
// //         console.log('✅ Game started for our lobby! Navigating to game page...');
// //         onClose();
        
// //         // Navigate to game page with the game data
// //         navigate(`/game/online/${lobby.timeControl}`, {
// //           state: {
// //             gameData: data.game,
// //             gameId: data.game.gameId
// //           }
// //         });
// //       }
// //     };

// //     on('game-started', handleGameStarted);

// //     return () => {
// //       console.log('Cleaning up game-started listener in LobbyModal');
// //       off('game-started', handleGameStarted);
// //     };
// //   }, [socket, connected, lobby.lobbyCode, lobby.timeControl, on, off, navigate, onClose]);

// //   const handleCopyCode = () => {
// //     navigator.clipboard.writeText(lobby.lobbyCode);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2000);
// //   };

// //   const handleToggleReady = async () => {
// //     try {
// //       await toggleReady(lobby.lobbyCode);
// //     } catch (error) {
// //       console.error('Error toggling ready:', error);
// //     }
// //   };

// //   const handleStartGameClick = async () => {
// //     try {
// //       console.log('Starting game for lobby:', lobby.lobbyCode);
// //       const result = await startGameFromLobby(lobby.lobbyCode);
// //       console.log('Start game result:', result);
      
// //       if (result.success) {
// //         console.log('Game started successfully, waiting for socket event to navigate...');
// //         // Don't navigate immediately - wait for the socket event
// //         // The navigation will be handled by the socket listener above
// //       } else {
// //         console.error('Failed to start game:', result.message);
// //         alert(result.message);
// //       }
// //     } catch (error) {
// //       console.error('Error starting game:', error);
// //       alert('Failed to start game');
// //     }
// //   };

// //   // Show socket status for debugging (remove in production)
// //   const socketStatus = socketReady ? '✅ Connected' : '❌ Disconnected';

// //   return (
// //     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
// //       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
// //         <div className="flex justify-between items-center mb-4">
// //           <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
// //           <button onClick={onClose} className="text-gray-400 hover:text-white">
// //             <X size={20} />
// //           </button>
// //         </div>

// //         {/* Debug info - remove in production */}
// //         <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
// //           Socket: {socketStatus}
// //         </div>

// //         <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
// //           <span className="text-gray-400 text-sm">Lobby Code:</span>
// //           <div className="flex items-center gap-2">
// //             <span className="text-amber-400 font-mono font-bold">{lobby?.lobbyCode}</span>
// //             <button
// //               onClick={handleCopyCode}
// //               className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
// //             >
// //               <Copy size={12} />
// //               {copied ? 'Copied!' : 'Copy'}
// //             </button>
// //           </div>
// //         </div>

// //         <div className="space-y-2 mb-4">
// //           <div className="flex justify-between items-center">
// //             <span className="text-gray-400 text-sm">Game Type:</span>
// //             <span className="text-white text-sm capitalize">{lobby?.gameType || 'Standard'} Chess</span>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="text-gray-400 text-sm">Time Control:</span>
// //             <span className="text-white text-sm">{lobby?.timeControl}</span>
// //           </div>
// //         </div>

// //         <div className="border-t border-white/10 pt-4 mb-4">
// //           <p className="text-gray-400 text-sm mb-3">Players ({lobby?.players?.length || 0}/2):</p>
// //           <div className="space-y-2">
// //             {lobby?.players?.map((player, index) => {
// //               const playerId = player.userId?._id || player.userId || player.id || player._id;
// //               const isCurrentUser = currentUserId && playerId && 
// //                                    String(playerId) === String(currentUserId);
              
// //               return (
// //                 <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
// //                   <div className="flex items-center gap-2">
// //                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //                       isCurrentUser ? 'bg-amber-500/20' : 'bg-blue-500/20'
// //                     }`}>
// //                       <span className={`text-sm font-bold ${isCurrentUser ? 'text-amber-400' : 'text-blue-400'}`}>
// //                         {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
// //                       </span>
// //                     </div>
// //                     <div>
// //                       <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
// //                       {isCurrentUser && (
// //                         <span className="text-amber-400 text-xs ml-2">(You)</span>
// //                       )}
// //                     </div>
// //                   </div>
// //                   {isCurrentUser ? (
// //                     <button
// //                       onClick={handleToggleReady}
// //                       className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
// //                         player.ready 
// //                           ? 'bg-green-500/20 text-green-400 cursor-default' 
// //                           : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
// //                       }`}
// //                       disabled={player.ready}
// //                     >
// //                       {player.ready ? <Check size={12} /> : <Timer size={12} />}
// //                       {player.ready ? 'Ready' : 'Ready Up'}
// //                     </button>
// //                   ) : (
// //                     <span className={`flex items-center gap-1 text-xs ${
// //                       player.ready ? 'text-green-400' : 'text-gray-500'
// //                     }`}>
// //                       {player.ready && <Check size={12} />}
// //                       {player.ready ? 'Ready' : 'Not Ready'}
// //                     </span>
// //                   )}
// //                 </div>
// //               );
// //             })}
            
// //             {lobby?.players?.length < 2 && (
// //               <div className="bg-[#2a1a13]/50 p-2 rounded-lg border border-dashed border-white/10">
// //                 <div className="flex items-center gap-2">
// //                   <div className="w-8 h-8 rounded-full bg-gray-700/30 flex items-center justify-center">
// //                     <span className="text-gray-500 text-sm">?</span>
// //                   </div>
// //                   <span className="text-gray-500 text-sm">Waiting for player...</span>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>

// //         <div className="flex gap-2">
// //           <button
// //             onClick={onClose}
// //             className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 py-2.5 rounded-lg text-sm transition"
// //           >
// //             Close
// //           </button>
// //           {isCreator && allPlayersReady ? (
// //             <button
// //               onClick={handleStartGameClick}
// //               className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition"
// //               disabled={!socketReady}
// //             >
// //               {socketReady ? 'Start Game' : 'Connecting...'}
// //             </button>
// //           ) : !isCreator ? (
// //             <div className="flex-1 text-center text-gray-400 text-sm py-2.5">
// //               {socketReady ? 'Waiting for host to start...' : 'Connecting to server...'}
// //             </div>
// //           ) : (
// //             <div className="flex-1 text-center text-gray-400 text-sm py-2.5">
// //               {lobby?.players?.length < 2 ? 'Waiting for player...' : 'Waiting for players to ready...'}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // In Profile.jsx - Update the LobbyModal component

// // Lobby Modal Component - FIXED with better socket handling and connection check
// function LobbyModal({ lobby, onClose, onStartGame, currentUser }) {
//   const [copied, setCopied] = useState(false);
//   const [socketReady, setSocketReady] = useState(false);
//   const { toggleReady, startGameFromLobby } = useGame();
//   const { socket, connected, on, off, reconnect } = useSocket();
//   const navigate = useNavigate();
  
//   const currentUserId = currentUser?._id || currentUser?.id;
//   const isCreator = currentUserId && lobby.createdBy && 
//                    String(currentUserId) === String(lobby.createdBy?._id || lobby.createdBy);
  
//   const allPlayersReady = lobby.players?.length === 2 && lobby.players?.every(p => p.ready);

//   // Check socket connection status and attempt to reconnect if needed
//   useEffect(() => {
//     console.log('🔄 LobbyModal - Checking socket connection:', { 
//       socket: !!socket, 
//       connected,
//       lobbyCode: lobby.lobbyCode
//     });
    
//     if (socket && connected) {
//       console.log('✅ Socket is connected and ready in LobbyModal');
//       setSocketReady(true);
      
//       // Ensure we're in the lobby room
//       socket.emit('join-lobby', { lobbyCode: lobby.lobbyCode });
//     } else {
//       console.log('❌ Socket not ready in LobbyModal:', { socket: !!socket, connected });
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
//       console.log('Socket not available in LobbyModal, waiting for connection...');
//       return;
//     }

//     console.log('Setting up game-started listener in LobbyModal for lobby:', lobby.lobbyCode);

//     const handleGameStarted = (data) => {
//       console.log('🎮 Game started event received in lobby modal:', data);
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
//       // You can update local state here if needed
//     };

//     on('game-started', handleGameStarted);
//     on('lobby-updated', handleLobbyUpdate);

//     return () => {
//       console.log('Cleaning up game-started listener in LobbyModal');
//       off('game-started', handleGameStarted);
//       off('lobby-updated', handleLobbyUpdate);
//     };
//   }, [socket, connected, lobby.lobbyCode, lobby.timeControl, on, off, navigate, onClose]);

//   const handleCopyCode = () => {
//     navigator.clipboard.writeText(lobby.lobbyCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleToggleReady = async () => {
//     try {
//       await toggleReady(lobby.lobbyCode);
//     } catch (error) {
//       console.error('Error toggling ready:', error);
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
//         // The navigation will be handled by the socket listener above
//       } else {
//         console.error('Failed to start game:', result.message);
//         alert(result.message);
//       }
//     } catch (error) {
//       console.error('Error starting game:', error);
//       alert('Failed to start game');
//     }
//   };

//   // Show socket status for debugging (remove in production)
//   const socketStatus = socketReady ? '✅ Connected' : '❌ Disconnected';

//   return (
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
//       <div className="bg-[#1a0f0a] rounded-lg border border-white/10 w-96 p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-white text-lg font-semibold">Lobby Details</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {/* Debug info - remove in production */}
//         <div className="mb-2 text-xs text-gray-600 border border-gray-800 p-1 rounded">
//           Socket: {socketStatus}
//         </div>

//         <div className="flex justify-between items-center mb-3 bg-[#2a1a13] p-3 rounded-lg">
//           <span className="text-gray-400 text-sm">Lobby Code:</span>
//           <div className="flex items-center gap-2">
//             <span className="text-amber-400 font-mono font-bold">{lobby?.lobbyCode}</span>
//             <button
//               onClick={handleCopyCode}
//               className="text-gray-400 hover:text-white flex items-center gap-1 text-xs bg-[#3a2a23] px-2 py-1 rounded"
//             >
//               <Copy size={12} />
//               {copied ? 'Copied!' : 'Copy'}
//             </button>
//           </div>
//         </div>

//         <div className="space-y-2 mb-4">
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Game Type:</span>
//             <span className="text-white text-sm capitalize">{lobby?.gameType || 'Standard'} Chess</span>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-gray-400 text-sm">Time Control:</span>
//             <span className="text-white text-sm">{lobby?.timeControl}</span>
//           </div>
//         </div>

//         <div className="border-t border-white/10 pt-4 mb-4">
//           <p className="text-gray-400 text-sm mb-3">Players ({lobby?.players?.length || 0}/2):</p>
//           <div className="space-y-2">
//             {lobby?.players?.map((player, index) => {
//               const playerId = player.userId?._id || player.userId || player.id || player._id;
//               const isCurrentUser = currentUserId && playerId && 
//                                    String(playerId) === String(currentUserId);
              
//               return (
//                 <div key={index} className="flex items-center justify-between bg-[#2a1a13] p-2 rounded-lg">
//                   <div className="flex items-center gap-2">
//                     <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
//                       isCurrentUser ? 'bg-amber-500/20' : 'bg-blue-500/20'
//                     }`}>
//                       <span className={`text-sm font-bold ${isCurrentUser ? 'text-amber-400' : 'text-blue-400'}`}>
//                         {player.username?.charAt(0) || player.name?.charAt(0) || playerId?.charAt(0) || '?'}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-white text-sm">{player.username || player.name || 'Player'}</span>
//                       {isCurrentUser && (
//                         <span className="text-amber-400 text-xs ml-2">(You)</span>
//                       )}
//                     </div>
//                   </div>
//                   {isCurrentUser ? (
//                     <button
//                       onClick={handleToggleReady}
//                       className={`flex items-center gap-1 text-xs px-2 py-1 rounded ${
//                         player.ready 
//                           ? 'bg-green-500/20 text-green-400 cursor-default' 
//                           : 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30'
//                       }`}
//                       disabled={player.ready}
//                     >
//                       {player.ready ? <Check size={12} /> : <Timer size={12} />}
//                       {player.ready ? 'Ready' : 'Ready Up'}
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
//               );
//             })}
            
//             {lobby?.players?.length < 2 && (
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

//         <div className="flex gap-2">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 text-gray-400 py-2.5 rounded-lg text-sm transition"
//           >
//             Close
//           </button>
//           {isCreator && allPlayersReady ? (
//             <button
//               onClick={handleStartGameClick}
//               className="flex-1 bg-green-500 hover:bg-green-600 text-black font-semibold py-2.5 rounded-lg text-sm transition"
//               disabled={!socketReady}
//             >
//               {socketReady ? 'Start Game' : 'Connecting...'}
//             </button>
//           ) : !isCreator ? (
//             <div className="flex-1 text-center text-gray-400 text-sm py-2.5">
//               {socketReady ? 'Waiting for host to start...' : 'Connecting to server...'}
//             </div>
//           ) : (
//             <div className="flex-1 text-center text-gray-400 text-sm py-2.5">
//               {lobby?.players?.length < 2 ? 'Waiting for player...' : 'Waiting for players to ready...'}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





//testing 2
// components/Profile.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGame } from "../context/GameContext";
import profileService from "../services/profileService";
 
export default function Profile() {
  const navigate = useNavigate();
  const { user, profileCompletion, refreshProfileCompletion } = useAuth();
  const {
    getLobbyInvites,
    acceptInvite,
    loading: gameLoading
  } = useGame();
 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [memberSince, setMemberSince] = useState("");
  const [lastActive, setLastActive] = useState("");
 
  const [showFriendsDropdown, setShowFriendsDropdown] = useState(false);
  const [invites, setInvites] = useState([]);
  const [loadingInvites, setLoadingInvites] = useState(false);
 
  useEffect(() => {
    fetchProfileData();
  }, []);
 
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const data = await profileService.getMyProfile();
      setProfileData(data);
     
      if (data.memberSince) {
        const date = new Date(data.memberSince);
        setMemberSince(date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        }));
      }
     
      if (data.lastSeen) {
        const lastSeen = new Date(data.lastSeen);
        const now = new Date();
        const diffMs = now - lastSeen;
        const diffMins = Math.floor(diffMs / 60000);
       
        if (diffMins < 1) {
          setLastActive('Just now');
        } else if (diffMins < 60) {
          setLastActive(`${diffMins} minute${diffMins > 1 ? 's' : ''} ago`);
        } else {
          setLastActive(lastSeen.toLocaleDateString());
        }
      }
     
      await refreshProfileCompletion();
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };
 
  const fetchInvites = async () => {
    try {
      setLoadingInvites(true);
     
      console.log("Fetching invites...");
      const result = await getLobbyInvites();
      console.log("Fetched invites result:", result);
     
      if (result.success) {
        setInvites(result.invites || []);
      } else {
        console.warn("Could not load invites:", result.message);
        setInvites([]);
      }
    } catch (error) {
      console.error("Error fetching invites:", error);
      setInvites([]);
    } finally {
      setLoadingInvites(false);
    }
  };
  
  const handleAcceptInvite = async (lobbyCode) => {
    try {
      const result = await acceptInvite(lobbyCode);
      console.log("Accept invite result:", result);
      
      if (result.success) {
        // Refresh invites after accepting
        setInvites(prev => prev.filter(inv => inv.lobbyCode !== lobbyCode));
        await fetchInvites();
        
        // Close the friends dropdown
        setShowFriendsDropdown(false);
      } else {
        console.error("Error accepting invite:", result.message);
        alert(result.message);
      }
    } catch (error) {
      console.error("Error accepting invite:", error);
      alert("Failed to accept invitation");
    }
  };

  const handleGoBack = () => {
    navigate(-1); // This goes back to the previous page in history
  };

  if (loading) {
    return (
      <div className="flex-1 bg-[#140A05] min-h-screen p-4 sm:p-6 h-full overflow-auto flex items-center justify-center">
        <div className="text-[#F5F5F5] text-sm sm:text-base">Loading profile...</div>
      </div>
    );
  }
 
  const displayData = profileData || user;
 
  return (
    <div className="flex-1 bg-[#140A05] min-h-screen p-3 sm:p-4 md:p-6 h-full overflow-auto">
      <div className="w-full max-w-7xl mx-auto bg-[#1E120B] border border-[#5A3A1A] shadow-sm text-[#F5F5F5] rounded-lg overflow-hidden">
 
        {/* Back Button - New Addition */}
        <div className="px-4 sm:px-6 pt-4">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-[#F5A524] hover:text-[#FFB347] transition-colors group"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
              />
            </svg>
            <span className="text-sm sm:text-base">Back</span>
          </button>
        </div>
 
        {/* Username Header - Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4 sm:px-6 py-4 border-b border-[#5A3A1A]">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className={`w-3 h-3 sm:w-4 sm:h-4 ${displayData?.isOnline ? 'bg-green-600' : 'bg-gray-600'} rounded-full flex-shrink-0`}></div>
            <h1 className="text-xl sm:text-2xl font-normal text-[#F5F5F5] truncate">
              {displayData?.displayName || displayData?.name || 'User'}
            </h1>
          </div>
 
          <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={() => navigate('/edit-profile')}
              className="flex-1 sm:flex-none px-2 sm:px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C] text-xs sm:text-sm whitespace-nowrap"
            >
              ⚙ Edit
            </button>
 
            {/* FRIENDS DROPDOWN */}
            <div className="relative flex-1 sm:flex-none">
              <button
                onClick={() => {
                  setShowFriendsDropdown(!showFriendsDropdown);
                  fetchInvites();
                }}
                className="w-full px-2 sm:px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C] text-xs sm:text-sm whitespace-nowrap"
                disabled={gameLoading}
              >
                👤 Friends {gameLoading ? '...' : '▾'}
              </button>
 
              {showFriendsDropdown && (
                <div className="absolute right-0 mt-2 w-64 sm:w-72 bg-[#1A0D06] border border-[#5A3A1A] rounded shadow-lg z-50">
 
                  <div className="p-2 sm:p-3 border-b border-[#5A3A1A] font-medium text-sm">
                    Received Invitations
                  </div>
 
                  {loadingInvites || gameLoading ? (
                    <div className="p-2 sm:p-3 text-gray-400 text-xs sm:text-sm">
                      Loading invites...
                    </div>
                  ) : invites.length === 0 ? (
                    <div className="p-2 sm:p-3 text-gray-400 text-xs sm:text-sm">
                      No invitations
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto">
                      {invites.map((invite) => (
                        <div
                          key={invite.lobbyCode}
                          className="flex justify-between items-center p-2 sm:p-3 border-b border-[#5A3A1A]"
                        >
                          <div className="flex-1 min-w-0 mr-2">
                            <p className="text-xs sm:text-sm text-[#F5F5F5] truncate">
                              Lobby {invite.lobbyCode}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              From {invite.createdBy?.name || "Player"}
                            </p>
                            <p className="text-xs text-gray-400 truncate">
                              {invite.timeControl} • {invite.gameType}
                            </p>
                          </div>
 
                          <button
                            onClick={() => handleAcceptInvite(invite.lobbyCode)}
                            className="flex-shrink-0 px-2 py-1 text-xs bg-green-600 rounded hover:bg-green-700"
                            disabled={gameLoading}
                          >
                            {gameLoading ? '...' : 'Accept'}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
 
                </div>
              )}
            </div>
 
            <button className="flex-1 sm:flex-none px-2 sm:px-3 py-1 bg-[#1A0D06] border border-[#5A3A1A] rounded hover:bg-[#2A160C] text-xs sm:text-sm whitespace-nowrap">
              More ▾
            </button>
          </div>
        </div>
 
        {/* Stats Row - Responsive */}
        <div className="flex flex-wrap gap-4 sm:gap-10 px-4 sm:px-6 py-3 sm:py-4 border-b border-[#5A3A1A] text-xs sm:text-sm text-[#A1A1AA]">
          <div>{displayData?.tournamentPoints || 0} Tournament Points</div>
          <div>{displayData?.studies || 0} Studies</div>
          <div>{displayData?.forumPosts || 0} Forum Posts</div>
        </div>
 
        {/* Main Content - Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 py-8 sm:py-12 lg:py-16 w-full">
 
          {/* Left Column */}
          <div>
            <h2 className="text-lg sm:text-xl font-normal mb-3 sm:mb-4 text-[#F5F5F5]">
              Welcome to ChessVerse, {displayData?.displayName || displayData?.name}!
            </h2>
 
            {displayData?.bio ? (
              <p className="mb-3 sm:mb-4 text-sm sm:text-base">{displayData.bio}</p>
            ) : (
              <>
                <p className="mb-2 text-sm sm:text-base">This is your profile page.</p>
                <p className="mb-3 sm:mb-4 text-sm sm:text-base">
                  Complete your profile to get started. You might want to enable{" "}
                  <span
                    onClick={() => navigate('/edit-profile')}
                    className="text-[#F5A524] hover:underline cursor-pointer"
                  >
                    Kid mode
                  </span>.
                </p>
              </>
            )}
 
            <p className="mb-2 sm:mb-3 text-sm sm:text-base">What now? Here are a few suggestions:</p>
 
            <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-[#F5A524] text-sm sm:text-base">
              <li className="hover:underline cursor-pointer">Learn chess rules</li>
              <li className="hover:underline cursor-pointer">Improve with chess tactics puzzles.</li>
              <li className="hover:underline cursor-pointer">Play the Artificial Intelligence.</li>
              <li className="hover:underline cursor-pointer">Play opponents from around the world.</li>
              <li className="hover:underline cursor-pointer">Follow your friends on Lichess.</li>
              <li className="hover:underline cursor-pointer">Play in tournaments.</li>
              <li className="hover:underline cursor-pointer">Learn from Study and Videos.</li>
              <li className="hover:underline cursor-pointer">Configure ChessVerse to your liking.</li>
              <li className="text-[#F5F5F5]">Explore the site and have fun :)</li>
            </ul>
          </div>
 
          {/* Right Column - Responsive */}
          <div className="text-sm sm:text-base text-[#F5F5F5] space-y-2">
            <p className="flex flex-wrap">
              <span className="font-medium mr-2">Member since:</span> 
              <span>{memberSince || '26 Feb 2026'}</span>
            </p>
            <p className="flex flex-wrap">
              <span className="font-medium mr-2">Active:</span> 
              <span>{lastActive || '2 minutes ago'}</span>
            </p>
            <p className="flex flex-wrap">
              <span
                onClick={() => navigate('/edit-profile')}
                className="text-[#F5A524] hover:underline cursor-pointer"
              >
                Profile completion: {profileCompletion}%
              </span>
            </p>
            <p className="flex flex-wrap">
              <span className="font-medium mr-2">Time spent playing:</span> 
              <span>{displayData?.gamesPlayed ? `${displayData.gamesPlayed * 10} minutes` : '0 minutes'}</span>
            </p>
          </div>
 
        </div>
 
        {/* Bottom Tabs - Responsive */}
        <div className="flex flex-wrap border-t border-[#5A3A1A]">
          <div className="px-4 sm:px-6 py-2 sm:py-3 border-r border-[#5A3A1A] bg-[#1A0D06] font-medium text-sm sm:text-base">
            Activity
          </div>
          <div className="px-4 sm:px-6 py-2 sm:py-3 text-[#A1A1AA] text-sm sm:text-base">
            {displayData?.gamesPlayed || 0} Games
          </div>
        </div>
 
      </div>
    </div>
  );
}