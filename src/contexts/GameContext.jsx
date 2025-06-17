
import React, { createContext, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children, value }) => {
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
