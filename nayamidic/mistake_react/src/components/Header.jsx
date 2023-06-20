import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useContext } from "react";

import { UserContext } from "./UserContext";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutButton } from "./LogoutButton";
import  PostCreate  from "./PostCreate";
import { DisplayUsername } from "./DisplayUsername";


export const Header = () => {
  // const [user, setUser] = useState(null);
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPostCreate, setShowPostCreate] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true); // Update this
  }

  const handlepostcreateClick = () => {
    setShowPostCreate(true);
  }
  
  const handleSignupClick = () => {
    setShowLogin(false); // Update this
    setShowSignup(true); // Update this
  }

  return (
      <div style={{ backgroundColor: '#2f0163', height: '60px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        <h1 style={{margin: 0}}>mistter</h1>
          {user && <p>{ user }:<LogoutButton /></p>}
          {user && <button onClick={handlepostcreateClick} onClose={() => setShowPostCreate(false)}>投稿</button>}
          {!user && <button onClick={handleLoginClick}>Login</button>} {/* Use the button here directly */}
          {showLogin && <Login setShowLogin={setShowLogin}  onClose={() => setShowLogin(false)} handleSignupClick={handleSignupClick} />} {/* Conditionally render the login form */}
          {showSignup && <Signup setShowSignup={setShowSignup}  onClose={() => setShowSignup(false)} />} {/* Conditionally render the login form */}
          {showPostCreate && <PostCreate setShowPostCreate={setShowPostCreate} onClose={() => setShowPostCreate(false)} />}
      </div>
  );
}