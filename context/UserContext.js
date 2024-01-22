import { useState, createContext, useContext, useEffect } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    // Check if window is defined
    if (typeof window !== 'undefined') {
      const savedUserData = localStorage.getItem('userData');
      return savedUserData ? JSON.parse(savedUserData) : null;
    }
    // Return null or initial state if on the server side
    return null;
  });

  useEffect(() => {
    // Check if window is defined
    if (typeof window !== 'undefined') {
      // Save user data to Local Storage whenever it changes
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [userData]);

  const updateUserData = (values) => {
    setUserData((prevValues) => ({
      ...prevValues,
      ...values,
    }));
  };

  const clearUserData = () => {
    setUserData(null); // Set userData to null or {}
    if (typeof window !== 'undefined') {
      console.log('Clearing user data');
      localStorage.removeItem('userData');
      localStorage.removeItem('token');
      localStorage.removeItem('squadList');
      localStorage.removeItem('tutorialCompleted');
    }
  };

  return (
    <UserContext.Provider value={{ userData, updateUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserData = () => useContext(UserContext);
