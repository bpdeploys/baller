import { useState, createContext, useContext, useEffect } from 'react';

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [userData, setUserData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedUserData = localStorage.getItem('userData');
      return savedUserData ? JSON.parse(savedUserData) : null;
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
    setUserData(null);
    if (typeof window !== 'undefined') {
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
