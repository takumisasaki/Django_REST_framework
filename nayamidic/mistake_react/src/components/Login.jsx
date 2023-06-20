import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { UserIdContext } from "./UserContext";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const Login = ({ onClose, handleSignupClick }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const csrftoken = getCookie('csrftoken');
    const navigate = useNavigate();
    const userContextValue = useContext(UserContext);
    const { setUser } = useContext(UserContext);
    const { setUserId } = useContext(UserContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/mistake/login/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                localStorage.setItem('token', data.token);
                // console.log(localStorage.getItem('token'));
                alert(data.user);
                setUserId(data.user_id)
                setUser(data.user);
                onClose();
            }
        });
    }

    return (
      <Box 
    sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background
    }}>
    <Box 
        sx={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
        }}>
        <IconButton 
            onClick={onClose} 
            aria-label="close" 
            sx={{
                position: 'absolute',
                top: '8px',
                left: '8px',
            }}
        >
            <CloseIcon />
        </IconButton>
        <Typography sx={{color:"black", marginTop: '40px'}} variant="h4" component="div" gutterBottom>
            Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '80%', marginTop: '10px' }}>
            <TextField 
                fullWidth
                margin="normal"
                variant="outlined"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />
            <TextField 
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button 
                // fullWidth
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                    marginTop: '16px',
                    width: '100%',
                }}
            >
                Login
            </Button>
        </form>
        <Button 
            fullWidth
            onClick={handleSignupClick} 
            variant="contained" 
            color="secondary"
            sx={{
                marginTop: '24px',
                width: '80%',
            }}
        >
            新規会員登録
        </Button>
     </Box>
  </Box>
    );
  };
