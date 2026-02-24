import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChessGame from "./ChessGame";

export default function GamePage() {
  const { mode, timeControl } = useParams();
  const navigate = useNavigate();

  const gameState = {
    status: 'playing',
    gameMode: mode || 'vs-computer',
    timeControl: timeControl || '10+0',
    opponent: mode === 'vs-computer' ? 'Computer' : 'Akshay141',
    players: mode === 'vs-computer' 
      ? [{ name: 'Max_256', rating: 1450 }, { name: 'Computer', rating: 1500 }]
      : [{ name: 'Max_256', rating: 1450 }, { name: 'Akshay141', rating: 1480 }]
  };

  const handleExit = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 overflow-hidden">
      <ChessGame 
        gameState={gameState}
        onExit={handleExit}
      />
    </div>
  );
}
