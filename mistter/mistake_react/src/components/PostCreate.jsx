import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from "./UserContext";

import { TextField, Button, Select, MenuItem, Box, Typography, FormControl, InputLabel, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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

const PostCreate = ({onClose}) => {
    const [categories, setCategories] = useState('');
    const [text, setText] = useState('');
    const { user_id } = useContext(UserContext)
    const csrftoken = getCookie('csrftoken');
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/mistterapp/post-create/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({ categories, text, "user":user_id })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            } else {
                alert(data.message)
                onClose();
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
                    position: 'relative',
                    width: '400px', // Adjust the width here.
                }}
            >
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
                    投稿作成
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '10px' }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>カテゴリ</InputLabel>
                        <Select value={categories} onChange={e => setCategories(e.target.value)}>
                            <MenuItem value=""><em>選択してください</em></MenuItem>
                            <MenuItem value={"仕事"}>仕事</MenuItem>
                            <MenuItem value={"学校"}>学校</MenuItem>
                            <MenuItem value={"ギャンブル"}>ギャンブル</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField 
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        multiline
                        rows={7}
                        maxRows={9}                    
                        placeholder="テキスト"
                        value={text} 
                        onChange={e => setText(e.target.value)}
                        inputProps={{ maxLength: 250, height:"300px" }}
                        required
                    />
                    <Button 
                        type="submit"
                        variant="contained"
                        color="secondary"
                        sx={{
                            marginTop: '16px',
                            width: '100%',
                        }}
                    >
                        投稿
                    </Button>
                </form>
            </Box>
        </Box>
    )}    

export default PostCreate;
