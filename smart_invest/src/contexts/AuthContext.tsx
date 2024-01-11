import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  showLoginForm: boolean;
  setShowLoginForm: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  msg: string;
  setMsg: React.Dispatch<React.SetStateAction<string>>;
}

interface AuthProviderProps {
    children: ReactNode;
    }



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [msg, setMsg] = useState('');
    
    return (
        <AuthContext.Provider value={{ showLoginForm, setShowLoginForm, isLoggedIn, setIsLoggedIn, username, setUsername, msg, setMsg }}>
        {children}
        </AuthContext.Provider>
    );
    }



