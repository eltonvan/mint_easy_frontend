import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavbarContextProps {
  showLoginForm: boolean;
  setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const NavbarContext = createContext<NavbarContextProps | undefined>(undefined);

export const useNavbarContext = (): NavbarContextProps => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error('useNavbarContext must be used within a NavbarProvider');
  }
  return context;
};

interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  console.log("username (context): ", username);
  console.log("isLoggedIn (context): ", isLoggedIn);
  console.log("showLoginForm (context): ", showLoginForm);



  return (
    <NavbarContext.Provider value={{ showLoginForm, setShowLoginForm, isLoggedIn, setIsLoggedIn, username, setUsername }}>
      {children}
    </NavbarContext.Provider>
  );
};
