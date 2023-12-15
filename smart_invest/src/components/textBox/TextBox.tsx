import "./textBox.scss"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from 'react';
import UserForm from '../userForm/UserForm'; // Import the UserForm component

// Declare the type of the props
type Props = {
    title: string;
    text: string;
};

const TextBox = (props: Props) => {
  const [showUserForm, setShowUserForm] = useState(false); // State to control UserForm visibility

  const openUserForm = () => {
    setShowUserForm(true); // Function to show UserForm
  };
  // main homepage component. main navigation and slogan
  return (
    <div>
      <div className="pageTitle"><h1>{props.title}</h1></div>
      <div className="pageText"><h2>{props.text}</h2></div>
      <div className="btnPanel">
        <div className="btn">I am an Investor</div>
        <div className="btn">I am a Trader</div>
        <div className="btn" onClick={openUserForm}>SignUp now!</div> 
      </div>
      
      {showUserForm && <UserForm slug="Sign Up" setOpen={setShowUserForm} />} {/* Render UserForm when showUserForm is true */}
    </div>
  );
};

export default TextBox;
