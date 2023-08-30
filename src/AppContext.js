import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({});
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <AppContext.Provider value={{ searchParams, setSearchParams, selectedRoom, setSelectedRoom }}>
      {children}
    </AppContext.Provider>
  );
};