// Provider/AppProviders.js
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { SocketProvider } from '../context/SocketContext';
import { GameProvider } from '../context/GameContext';

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>    {/* SocketProvider must come before GameProvider */}
        <GameProvider>
          {children}
        </GameProvider>
      </SocketProvider>
    </AuthProvider>
  );
};