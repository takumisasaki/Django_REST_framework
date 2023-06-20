import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { UserContext } from "./components/UserContext";
import { DisplayUsername } from "./components/DisplayUsername";
import  {Signup} from "./components/Signup"

export function LoginButton() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  }

  return <button onClick={handleLoginClick}>Login</button>;
}

function App() {
  const [user, setUser] = useState(null);
  const [user_id, setUserId] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
        // Use the token to restore the login state
        fetch("http://localhost:8000/mistake/restore-login/", {
            method: "GET",
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error, 'app.js error');
            } else {
                setUser(data.username);
                setUserId(data.user_id)
            }
        });
    }
  }, []);

  return (
    <div className="App">
      <Router> 
        <UserContext.Provider value={{ user, setUser, user_id, setUserId}}>
          <Header />
          {user && <p>Welcome, {user}</p>}
          <DisplayUsername />
        </UserContext.Provider>
        <Home />
        {/* <Signup /> */}
      </ Router>
    </div>
  );
}

export default App;