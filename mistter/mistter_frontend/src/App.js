import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { MyPage } from "./components/MyPage";
import { Login } from "./components/Login";
import { UserContext } from "./components/UserContext";
import { UserDetail } from './components/UserDetail';
import { DisplayUsername } from "./components/DisplayUsername";
import { Signup } from "./components/Signup";
import {SearchProvider} from "./components/SearchContext";
import SearchList from './components/SearchList';

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
    if (token) {
        // Use the token to restore the login state
        fetch("http://localhost:8000/mistterapp/restore-login/", {
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
        <SearchProvider>
          <UserContext.Provider value={{ user, setUser, user_id, setUserId}}>
            <Header />
          <div style={{ marginTop: '64px' }}> {/* Add this */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchList />} /> {/* Add this */}
            <Route path="/userdetail" element={<UserDetail />} />
            <Route path="/mypage" element={<MyPage />} />
            {/* other routes... */}
          </Routes>
          </div>
          </UserContext.Provider>
        </SearchProvider>
      </ Router>
    </div>
  );
}

export default App;
