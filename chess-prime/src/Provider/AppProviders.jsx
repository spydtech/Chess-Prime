import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { GameProvider } from '../context/GameContext';

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <GameProvider>
        {children}
      </GameProvider>
    </AuthProvider>
  );
};