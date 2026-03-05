// import React, { useState, useEffect } from 'react';
// import { Search, X, Loader, Clock, Users, CheckCircle } from 'lucide-react';
// import { useGame } from '../../context/GameContext';
// import { useNavigate } from 'react-router-dom';

// export default function QuickMatchModal({ isOpen, onClose }) {
//   const [step, setStep] = useState('selection');
//   const [selectedTime, setSelectedTime] = useState('10+0');
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [queuePosition, setQueuePosition] = useState(null);
//   const [queueLength, setQueueLength] = useState(0);
//   const [matchFound, setMatchFound] = useState(null);
//   const [error, setError] = useState(null);
  
//   const { joinQuickMatch, getQueueStatus, leaveQuickMatch, loading } = useGame();
//   const navigate = useNavigate();

//   const timeControls = [
//     { id: '1+0', name: '1+0', label: 'Bullet', players: 345 },
//     { id: '2+1', name: '2+1', label: 'Bullet', players: 166 },
//     { id: '3+0', name: '3+0', label: 'Blitz', players: 525 },
//     { id: '3+2', name: '3+2', label: 'Blitz', players: 505 },
//     { id: '5+0', name: '5+0', label: 'Blitz', players: 455 },
//     { id: '5+3', name: '5+3', label: 'Blitz', players: 455 },
//     { id: '10+0', name: '10+0', label: 'Rapid', players: 225 },
//     { id: '10+5', name: '10+5', label: 'Rapid', players: 185 },
//     { id: '15+10', name: '15+10', label: 'Rapid', players: 185 },
//     { id: '30+0', name: '30+0', label: 'Classical', players: 145 }
//   ];

//   // Timer and queue polling
//   useEffect(() => {
//     let interval;
//     let pollInterval;

//     if (step === 'searching') {
//       // Update elapsed time
//       interval = setInterval(() => {
//         setTimeElapsed(prev => prev + 1);
//       }, 1000);

//       // Poll queue status every 3 seconds
//       pollInterval = setInterval(async () => {
//         const result = await getQueueStatus(selectedTime);
//         if (result.success) {
//           setQueuePosition(result.position);
//           setQueueLength(result.queueLength);
          
//           // If no longer in queue, match was found
//           if (!result.inQueue) {
//             clearInterval(pollInterval);
//             // Try to get the game
//             const matchResult = await joinQuickMatch(selectedTime);
//             if (matchResult.success && matchResult.matched) {
//               setMatchFound(matchResult.game);
//               setStep('found');
              
//               // Navigate to game after short delay
//               setTimeout(() => {
//                 navigate(`/game/online/${selectedTime}`, {
//                   state: { 
//                     gameData: matchResult.game,
//                     gameId: matchResult.game.gameId
//                   }
//                 });
//                 onClose();
//               }, 1500);
//             }
//           }
//         }
//       }, 3000);
//     }

//     return () => {
//       clearInterval(interval);
//       clearInterval(pollInterval);
//     };
//   }, [step, selectedTime, getQueueStatus, joinQuickMatch, navigate, onClose]);

//   const handleStartSearch = async () => {
//     setError(null);
//     setStep('searching');
//     setTimeElapsed(0);
    
//     const result = await joinQuickMatch(selectedTime);
    
//     if (result.success) {
//       if (result.matched) {
//         // Match found immediately
//         setMatchFound(result.game);
//         setStep('found');
        
//         setTimeout(() => {
//           navigate(`/game/online/${selectedTime}`, {
//             state: { 
//               gameData: result.game,
//               gameId: result.game.gameId
//             }
//           });
//           onClose();
//         }, 1500);
//       } else {
//         // Added to queue
//         setQueuePosition(result.queuePosition);
//         setQueueLength(result.queueLength);
//       }
//     } else {
//       setError(result.message || 'Failed to join queue');
//       setStep('selection');
//     }
//   };

//   const handleCancel = async () => {
//     await leaveQuickMatch(selectedTime);
//     setStep('selection');
//     setTimeElapsed(0);
//     setQueuePosition(null);
//     setError(null);
//   };

//   const handleClose = () => {
//     if (step === 'searching') {
//       handleCancel();
//     }
//     setStep('selection');
//     setTimeElapsed(0);
//     setQueuePosition(null);
//     setError(null);
//     onClose();
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
//           <h2 className="text-white text-lg font-semibold">
//             {step === 'selection' && 'Quick Match'}
//             {step === 'searching' && 'Finding Opponent'}
//             {step === 'found' && 'Match Found!'}
//           </h2>
//           <button onClick={handleClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         {step === 'selection' && (
//           <div className="space-y-4">
//             <p className="text-gray-300 text-sm">Select time control to find an opponent</p>
            
//             <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
//               {timeControls.map((time) => (
//                 <div
//                   key={time.id}
//                   onClick={() => setSelectedTime(time.id)}
//                   className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
//                     selectedTime === time.id
//                       ? 'bg-amber-500/20 border border-amber-500'
//                       : 'bg-[#2a1a13] hover:bg-[#3a2a23] border border-white/5'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Clock size={16} className="text-amber-400" />
//                     <div className="text-white font-mono text-sm">{time.name}</div>
//                     <div className="text-gray-400 text-xs px-2 py-0.5 bg-black/30 rounded">
//                       {time.label}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users size={12} className="text-gray-500" />
//                     <span className="text-gray-500 text-xs">{time.players}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={handleStartSearch}
//               disabled={loading}
//               className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
//             >
//               {loading ? (
//                 <Loader size={18} className="animate-spin" />
//               ) : (
//                 <Search size={18} />
//               )}
//               Find Match ({selectedTime})
//             </button>
//           </div>
//         )}

//         {step === 'searching' && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-center py-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
//             </div>
            
//             <div className="text-center space-y-2">
//               <p className="text-amber-400">Searching for opponent...</p>
//               <p className="text-gray-400 text-sm">Time Control: {selectedTime}</p>
//               <p className="text-gray-500 text-sm">Time: {formatTime(timeElapsed)}</p>
              
//               {queuePosition && (
//                 <div className="mt-2">
//                   <p className="text-gray-400 text-xs">
//                     Position in queue: {queuePosition} of {queueLength}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="bg-[#2a1a13] rounded-lg p-3 mt-2">
//               <p className="text-gray-400 text-xs text-center">
//                 Looking for players with similar rating
//               </p>
//             </div>

//             <button
//               onClick={handleCancel}
//               disabled={loading}
//               className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-2 rounded-lg transition disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {step === 'found' && matchFound && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-center py-4">
//               <div className="bg-green-500/20 rounded-full p-4">
//                 <CheckCircle size={48} className="text-green-500" />
//               </div>
//             </div>
            
//             <div className="text-center space-y-2">
//               <p className="text-green-400 text-lg font-semibold">Opponent Found!</p>
//               <p className="text-gray-300">
//                 {matchFound.players?.find(p => p.color === 'black')?.username || 'Opponent'}
//               </p>
//               <p className="text-gray-400 text-sm">
//                 Rating: {matchFound.players?.find(p => p.color === 'black')?.rating || '?'}
//               </p>
//             </div>

//             <p className="text-center text-gray-500 text-xs">
//               Starting game...
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import { Search, X, Loader, Clock, Users, CheckCircle } from 'lucide-react';
// import { useGame } from '../../context/GameContext';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// export default function QuickMatchModal({ isOpen, onClose }) {
//   const [step, setStep] = useState('selection');
//   const [selectedTime, setSelectedTime] = useState('10+0');
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [queuePosition, setQueuePosition] = useState(null);
//   const [queueLength, setQueueLength] = useState(0);
//   const [matchFound, setMatchFound] = useState(null);
//   const [error, setError] = useState(null);
  
//   const { joinQuickMatch, getQueueStatus, leaveQuickMatch, loading } = useGame();
//   const { socket } = useAuth();
//   const navigate = useNavigate();

//   const timeControls = [
//     { id: '1+0', name: '1+0', label: 'Bullet', players: 345 },
//     { id: '2+1', name: '2+1', label: 'Bullet', players: 166 },
//     { id: '3+0', name: '3+0', label: 'Blitz', players: 525 },
//     { id: '3+2', name: '3+2', label: 'Blitz', players: 505 },
//     { id: '5+0', name: '5+0', label: 'Blitz', players: 455 },
//     { id: '5+3', name: '5+3', label: 'Blitz', players: 455 },
//     { id: '10+0', name: '10+0', label: 'Rapid', players: 225 },
//     { id: '10+5', name: '10+5', label: 'Rapid', players: 185 },
//     { id: '15+10', name: '15+10', label: 'Rapid', players: 185 },
//     { id: '30+0', name: '30+0', label: 'Classical', players: 145 }
//   ];

//   // Listen for match found via socket
//   useEffect(() => {
//     if (!socket) return;

//     const handleMatchFound = (data) => {
//       console.log('Match found via socket:', data);
//       setMatchFound(data.game || { gameId: data.gameId, players: [
//         { color: 'white', username: 'You', rating: 1450 },
//         { color: 'black', username: data.opponent?.username || 'Opponent', rating: data.opponent?.rating || 1500 }
//       ]});
//       setStep('found');
      
//       // Navigate to game after short delay
//       setTimeout(() => {
//         navigate(`/game/online/${selectedTime}`, {
//           state: { 
//             gameData: data.game,
//             gameId: data.gameId
//           }
//         });
//         onClose();
//       }, 1500);
//     };

//     socket.on('match-found', handleMatchFound);

//     return () => {
//       socket.off('match-found', handleMatchFound);
//     };
//   }, [socket, navigate, onClose, selectedTime]);

//   // Timer and queue polling
//   useEffect(() => {
//     let interval;
//     let pollInterval;

//     if (step === 'searching') {
//       // Update elapsed time
//       interval = setInterval(() => {
//         setTimeElapsed(prev => prev + 1);
//       }, 1000);

//       // Poll queue status every 3 seconds
//       pollInterval = setInterval(async () => {
//         const result = await getQueueStatus(selectedTime);
//         if (result.success) {
//           setQueuePosition(result.position);
//           setQueueLength(result.queueLength);
//         }
//       }, 3000);
//     }

//     return () => {
//       clearInterval(interval);
//       clearInterval(pollInterval);
//     };
//   }, [step, selectedTime, getQueueStatus]);

//   const handleStartSearch = async () => {
//     setError(null);
//     setStep('searching');
//     setTimeElapsed(0);
    
//     const result = await joinQuickMatch(selectedTime);
    
//     if (result.success) {
//       if (result.matched) {
//         // Match found immediately
//         setMatchFound(result.game);
//         setStep('found');
        
//         setTimeout(() => {
//           navigate(`/game/online/${selectedTime}`, {
//             state: { 
//               gameData: result.game,
//               gameId: result.game.gameId
//             }
//           });
//           onClose();
//         }, 1500);
//       } else {
//         // Added to queue
//         setQueuePosition(result.queuePosition);
//         setQueueLength(result.queueLength);
//       }
//     } else {
//       setError(result.message || 'Failed to join queue');
//       setStep('selection');
//     }
//   };

//   const handleCancel = async () => {
//     await leaveQuickMatch(selectedTime);
//     setStep('selection');
//     setTimeElapsed(0);
//     setQueuePosition(null);
//     setError(null);
//   };

//   const handleClose = () => {
//     if (step === 'searching') {
//       handleCancel();
//     }
//     setStep('selection');
//     setTimeElapsed(0);
//     setQueuePosition(null);
//     setError(null);
//     onClose();
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
//           <h2 className="text-white text-lg font-semibold">
//             {step === 'selection' && 'Quick Match'}
//             {step === 'searching' && 'Finding Opponent'}
//             {step === 'found' && 'Match Found!'}
//           </h2>
//           <button onClick={handleClose} className="text-gray-400 hover:text-white">
//             <X size={20} />
//           </button>
//         </div>

//         {error && (
//           <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
//             {error}
//           </div>
//         )}

//         {step === 'selection' && (
//           <div className="space-y-4">
//             <p className="text-gray-300 text-sm">Select time control to find an opponent</p>
            
//             <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
//               {timeControls.map((time) => (
//                 <div
//                   key={time.id}
//                   onClick={() => setSelectedTime(time.id)}
//                   className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
//                     selectedTime === time.id
//                       ? 'bg-amber-500/20 border border-amber-500'
//                       : 'bg-[#2a1a13] hover:bg-[#3a2a23] border border-white/5'
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <Clock size={16} className="text-amber-400" />
//                     <div className="text-white font-mono text-sm">{time.name}</div>
//                     <div className="text-gray-400 text-xs px-2 py-0.5 bg-black/30 rounded">
//                       {time.label}
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users size={12} className="text-gray-500" />
//                     <span className="text-gray-500 text-xs">{time.players}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <button
//               onClick={handleStartSearch}
//               disabled={loading}
//               className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
//             >
//               {loading ? (
//                 <Loader size={18} className="animate-spin" />
//               ) : (
//                 <Search size={18} />
//               )}
//               Find Match ({selectedTime})
//             </button>
//           </div>
//         )}

//         {step === 'searching' && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-center py-4">
//               <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
//             </div>
            
//             <div className="text-center space-y-2">
//               <p className="text-amber-400">Searching for opponent...</p>
//               <p className="text-gray-400 text-sm">Time Control: {selectedTime}</p>
//               <p className="text-gray-500 text-sm">Time: {formatTime(timeElapsed)}</p>
              
//               {queuePosition && (
//                 <div className="mt-2">
//                   <p className="text-gray-400 text-xs">
//                     Position in queue: {queuePosition} of {queueLength}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="bg-[#2a1a13] rounded-lg p-3 mt-2">
//               <p className="text-gray-400 text-xs text-center">
//                 Looking for players with similar rating
//               </p>
//             </div>

//             <button
//               onClick={handleCancel}
//               disabled={loading}
//               className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-2 rounded-lg transition disabled:opacity-50"
//             >
//               Cancel
//             </button>
//           </div>
//         )}

//         {step === 'found' && matchFound && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-center py-4">
//               <div className="bg-green-500/20 rounded-full p-4">
//                 <CheckCircle size={48} className="text-green-500" />
//               </div>
//             </div>
            
//             <div className="text-center space-y-2">
//               <p className="text-green-400 text-lg font-semibold">Opponent Found!</p>
//               <p className="text-gray-300">
//                 {matchFound.players?.find(p => p.color === 'black')?.username || 'Opponent'}
//               </p>
//               <p className="text-gray-400 text-sm">
//                 Rating: {matchFound.players?.find(p => p.color === 'black')?.rating || '?'}
//               </p>
//             </div>

//             <p className="text-center text-gray-500 text-xs">
//               Starting game...
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Search, X, Loader, Clock, Users, CheckCircle } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function QuickMatchModal({ isOpen, onClose }) {
  const [step, setStep] = useState('selection');
  const [selectedTime, setSelectedTime] = useState('10+0');
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [queuePosition, setQueuePosition] = useState(null);
  const [queueLength, setQueueLength] = useState(0);
  const [matchFound, setMatchFound] = useState(null);
  const [error, setError] = useState(null);
  
  const { joinQuickMatch, getQueueStatus, leaveQuickMatch, loading } = useGame();
  const { socket } = useAuth();
  const navigate = useNavigate();

  const timeControls = [
    { id: '1+0', name: '1+0', label: 'Bullet', players: 345 },
    { id: '2+1', name: '2+1', label: 'Bullet', players: 166 },
    { id: '3+0', name: '3+0', label: 'Blitz', players: 525 },
    { id: '3+2', name: '3+2', label: 'Blitz', players: 505 },
    { id: '5+0', name: '5+0', label: 'Blitz', players: 455 },
    { id: '5+3', name: '5+3', label: 'Blitz', players: 455 },
    { id: '10+0', name: '10+0', label: 'Rapid', players: 225 },
    { id: '10+5', name: '10+5', label: 'Rapid', players: 185 },
    { id: '15+10', name: '15+10', label: 'Rapid', players: 185 },
    { id: '30+0', name: '30+0', label: 'Classical', players: 145 }
  ];

  // Listen for match found via socket
  useEffect(() => {
    if (!socket) return;

    const handleMatchFound = (data) => {
      console.log('Match found via socket:', data);
      setMatchFound(data.game);
      setStep('found');
      
      // Navigate to game after short delay
      setTimeout(() => {
        navigate(`/game/online/${selectedTime}`, {
          state: { 
            gameData: data.game,
            gameId: data.gameId
          }
        });
        onClose();
      }, 1500);
    };

    socket.on('match-found', handleMatchFound);

    return () => {
      socket.off('match-found', handleMatchFound);
    };
  }, [socket, navigate, onClose, selectedTime]);

  // Timer and queue polling
  useEffect(() => {
    let interval;
    let pollInterval;

    if (step === 'searching') {
      // Update elapsed time
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);

      // Poll queue status every 3 seconds
      pollInterval = setInterval(async () => {
        const result = await getQueueStatus(selectedTime);
        if (result.success) {
          setQueuePosition(result.position);
          setQueueLength(result.queueLength);
        }
      }, 3000);
    }

    return () => {
      clearInterval(interval);
      clearInterval(pollInterval);
    };
  }, [step, selectedTime, getQueueStatus]);

  const handleStartSearch = async () => {
    setError(null);
    setStep('searching');
    setTimeElapsed(0);
    
    const result = await joinQuickMatch(selectedTime);
    
    if (result.success) {
      if (result.matched) {
        // Match found immediately
        setMatchFound(result.game);
        setStep('found');
        
        setTimeout(() => {
          navigate(`/game/online/${selectedTime}`, {
            state: { 
              gameData: result.game,
              gameId: result.game.gameId
            }
          });
          onClose();
        }, 1500);
      } else {
        // Added to queue
        setQueuePosition(result.queuePosition);
        setQueueLength(result.queueLength);
      }
    } else {
      setError(result.message || 'Failed to join queue');
      setStep('selection');
    }
  };

  const handleCancel = async () => {
    await leaveQuickMatch(selectedTime);
    setStep('selection');
    setTimeElapsed(0);
    setQueuePosition(null);
    setError(null);
  };

  const handleClose = () => {
    if (step === 'searching') {
      handleCancel();
    }
    setStep('selection');
    setTimeElapsed(0);
    setQueuePosition(null);
    setError(null);
    onClose();
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
          <h2 className="text-white text-lg font-semibold">
            {step === 'selection' && 'Quick Match'}
            {step === 'searching' && 'Finding Opponent'}
            {step === 'found' && 'Match Found!'}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {step === 'selection' && (
          <div className="space-y-4">
            <p className="text-gray-300 text-sm">Select time control to find an opponent</p>
            
            <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
              {timeControls.map((time) => (
                <div
                  key={time.id}
                  onClick={() => setSelectedTime(time.id)}
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition ${
                    selectedTime === time.id
                      ? 'bg-amber-500/20 border border-amber-500'
                      : 'bg-[#2a1a13] hover:bg-[#3a2a23] border border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-amber-400" />
                    <div className="text-white font-mono text-sm">{time.name}</div>
                    <div className="text-gray-400 text-xs px-2 py-0.5 bg-black/30 rounded">
                      {time.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={12} className="text-gray-500" />
                    <span className="text-gray-500 text-xs">{time.players}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleStartSearch}
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
            >
              {loading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
              Find Match ({selectedTime})
            </button>
          </div>
        )}

        {step === 'searching' && (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-amber-500 border-t-transparent" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-amber-400">Searching for opponent...</p>
              <p className="text-gray-400 text-sm">Time Control: {selectedTime}</p>
              <p className="text-gray-500 text-sm">Time: {formatTime(timeElapsed)}</p>
              
              {queuePosition && (
                <div className="mt-2">
                  <p className="text-gray-400 text-xs">
                    Position in queue: {queuePosition} of {queueLength}
                  </p>
                </div>
              )}
            </div>

            <div className="bg-[#2a1a13] rounded-lg p-3 mt-2">
              <p className="text-gray-400 text-xs text-center">
                Looking for players with similar rating
              </p>
            </div>

            <button
              onClick={handleCancel}
              disabled={loading}
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold py-2 rounded-lg transition disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        )}

        {step === 'found' && matchFound && (
          <div className="space-y-4">
            <div className="flex items-center justify-center py-4">
              <div className="bg-green-500/20 rounded-full p-4">
                <CheckCircle size={48} className="text-green-500" />
              </div>
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-green-400 text-lg font-semibold">Opponent Found!</p>
              <p className="text-gray-300">
                {matchFound.players?.find(p => p.color === 'black')?.username || 'Opponent'}
              </p>
              <p className="text-gray-400 text-sm">
                Rating: {matchFound.players?.find(p => p.color === 'black')?.rating || '?'}
              </p>
            </div>

            <p className="text-center text-gray-500 text-xs">
              Starting game...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}