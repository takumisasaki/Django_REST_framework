import { Link } from 'react-router-dom';
import React, { useState, useContext } from "react";

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

import { UserContext } from "./UserContext";
import { Signup } from "./Signup";
import { Login } from "./Login";
import { LogoutButton } from "./LogoutButton";
import { DisplayUsername } from "./DisplayUsername";
import  PostCreate  from "./PostCreate";
import { SearchProvider } from "./SearchContext";
import Search from './Search';
import SearchList from './SearchList';


export const Header = () => {
  // const [user, setUser] = useState(null);
  const { user } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showPostCreate, setShowPostCreate] = useState(false);
  const {searchResults, setSearchResults} = useState(null);

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
<AppBar position="static" style={{ backgroundColor: '#2f0163' }}>
  <Toolbar style={{ display: 'flex', justifyContent: 'center', gap: '100px' }}>
    <Typography variant="h6" component="div" style={{ color: 'white' }}>
      <Link to="/">mistter</Link>
    </Typography>
    <div style={{ display: 'flex', gap: '200px' }}>
        <Search />
        {/* Other components can go here */}
      {user ? (
        <>
          <Typography variant="subtitle1" component="p" style={{ color: 'white', display: 'inline' }}>
            { user }
          </Typography>
          <LogoutButton />
          <Button variant="contained" color="secondary" onClick={handlepostcreateClick} onClose={() => setShowPostCreate(false)}>
            投稿
          </Button>
        </>
      ) : (
        <Button variant="contained" color="primary" onClick={handleLoginClick}>
          Login
        </Button>
      )}
      {showLogin && <Login setShowLogin={setShowLogin}  onClose={() => setShowLogin(false)} handleSignupClick={handleSignupClick} />}
      {showSignup && <Signup setShowSignup={setShowSignup}  onClose={() => setShowSignup(false)} />}
      {showPostCreate && <PostCreate setShowPostCreate={setShowPostCreate} onClose={() => setShowPostCreate(false)} />}
    </div>
  </Toolbar>
</AppBar>

  );
}