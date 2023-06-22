import React, { useState } from 'react';

import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"

export const Signup = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password1 !== password2) {
            alert("Passwords do not match.");
            return;
        }

        fetch('http://localhost:8000/mistake/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                nickname,
                email,
                password:password1,
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.user) {
                alert('Signup Successful');
                onClose();
            } else {
                alert('Signup Failed');
                console.log(data);
            }
        });
    };

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
        }}
    >
    <Box
        sx={{
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: "50%",
        }}
    >
    <IconButton onClick={onClose} aria-label="close" sx={{ position: 'absolute', left:"370px", top: "110px"}}>
      <CloseIcon />
    </IconButton>
    <Typography sx={{color:"black"}} variant="h4" component="div" gutterBottom>
      Signup
    </Typography>
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: '80%',
        marginTop: '36px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TextField 
        margin="normal"
        variant="outlined"
        label="User ID"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{width:"80%"}}
      />
      <TextField 
        margin="normal"
        variant="outlined"
        label="Nickname"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        sx={{width:"80%"}}
      />
      <TextField 
        margin="normal"
        variant="outlined"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{width:"80%"}}
      />
      <TextField 
        margin="normal"
        variant="outlined"
        type="password"
        label="Password"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        sx={{width:"80%"}}
      />
      <TextField 
        margin="normal"
        variant="outlined"
        type="password"
        label="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        sx={{width:"80%"}}
      />
      <Button type="submit" variant="contained" sx={{backgroundColor: '#00FFFF', color: 'black', mt: 2, display: 'block', mx: 'auto', width:'80%'}}>
        登録
      </Button>
    </Box>
    </Box>
    </Box>
    
        // <div style={{
        //     position: 'fixed', 
        //     top: 0,
        //     left: 0,
        //     width: '100%', 
        //     height: '100%', 
        //     display: 'flex',
        //     alignItems: 'center',
        //     justifyContent: 'center',
        //     backgroundColor: 'rgba(0, 0, 0, 0.7)', // This creates a semi-transparent dark background
        //   }}>
        //     <div style={{
        //     backgroundColor: '#fff',
        //     padding: '20px',
        //     borderRadius: '10px',
        //     color: 'black',
        //     }}>
        //     <h1>Signup</h1>
        //     <button onClick={onClose}>X</button>
        //     <form onSubmit={handleSubmit}>
        //         <label>
        //             User ID:
        //             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        //         </label>
        //         <label>
        //             Nickname:
        //             <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        //         </label>
        //         <label>
        //             Email:
        //             <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        //         </label>
        //         <label>
        //             Password:
        //             <input type="password" value={password1} onChange={(e) => setPassword1(e.target.value)} />
        //         </label>
        //         <label>
        //             Confirm Password:
        //             <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
        //         </label>
        //         <input type="submit" value="Submit" />
        //     </form>
        //     </div>
        // </div>
    );
};

// export default Signup;