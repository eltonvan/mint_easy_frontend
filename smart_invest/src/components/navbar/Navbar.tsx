import "./navbar.scss";
import { useState, useEffect } from 'react';
import LoginForm from "../loginForm/LoginForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // Import QueryClientProvider
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../../axiosInstance';




const Navbar = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const [username, setUsername] = useState(''); // State to store the username



  const openLoginForm = () => {
    setShowLoginForm(true);
    console.log("triggered by openLoginForm", showLoginForm)
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions
    
    Cookies.remove('authToken', { path: '/' });
    console.log("cookie", document.cookie)

    setUsername('');
    console.log("username", username)

    
    navigate('/'); 
    setShowLoginForm(false);
    console.log("triggered by handleLogout", showLoginForm)

    setIsLoggedIn(false);
    console.log("isLoggedIn", isLoggedIn)

    
  };

  const handleLogin = (name) => {
    // Perform login actions
    setIsLoggedIn(true);
    setUsername(name);
    setShowLoginForm(false);
    console.log("triggered by handle login", showLoginForm)

  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logoSI.svg" alt="" />
        <span>Smart Invest</span>
      </div>
      <div className="icons">
        <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user" >
        
        {isLoggedIn ? ( // Conditionally render based on login status
            <>
              <img
                src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                alt=""
              />
              
              <span>{username}</span>
              <button onClick={()=>{
                handleLogout()

              }}>Log out</button>
            </>
          ) : (
            <span onClick={openLoginForm}> Sign in</span>
          )}
        </div>
        {showLoginForm && <LoginForm slug="Sign In" setOpen={setShowLoginForm} handleLogin={handleLogin} />} 

        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
