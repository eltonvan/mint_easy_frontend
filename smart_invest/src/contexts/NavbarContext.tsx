import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

interface NavbarContextProps {
  showLoginForm: boolean;
  setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
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
  const [msg, setMsg] = useState('');

  useEffect(()=> {
    const authToken = Cookies.get('authToken'); // Get authToken from cookie
    const user = Cookies.get('username'); // Get username from cookie
    if (authToken) {
      setIsLoggedIn(true); // Set login status to true if authToken exists
      setUsername(user || 'no user cookie'); // Set username state
    }
  }
  , []);



  return (
    <NavbarContext.Provider value={{ showLoginForm, setShowLoginForm, isLoggedIn, setIsLoggedIn, username, setUsername, msg, setMsg }}>
      {children}
    </NavbarContext.Provider>
  );
};
