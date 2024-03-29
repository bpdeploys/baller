import React, { createContext, useState, useEffect } from 'react';

export const SquadContext = createContext();

export const SquadProvider = ({ children }) => {
  // Initialize squadList from localStorage or as an empty array
  const [squadList, setSquadList] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedSquad = localStorage.getItem('squadList');
      return storedSquad ? JSON.parse(storedSquad) : [];
    }

    return null;
  });

  // Update localStorage when squadList changes
  useEffect(() => {
    localStorage.setItem('squadList', JSON.stringify(squadList));
  }, [squadList]);

  const addTeammate = (teammate) => {
    setSquadList([...squadList, teammate]);
  };

  const setSquad = (newSquad) => {
    setSquadList(newSquad);
  };

  return (
    <SquadContext.Provider value={{ squadList, addTeammate, setSquad }}>
      {children}
    </SquadContext.Provider>
  );
};
