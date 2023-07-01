import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Typography, Button, IconButton } from "@mui/material";
import StarIcon from '@mui/icons-material/Star';

import { UserContext } from './UserContext';

export const Favorite = ({ post }) => {
    // You can access properties of the post object like this:
    const postId = post.id;
    const [likeCount, setLikeCount] = useState(post.like_count);
    const { user_id } = useContext(UserContext);
    
    const handleLike = async () => {
        try {
            const response = await axios.post('http://localhost:8000/mistterapp/like/', {
                post_id: postId,
                user_id: user_id,
            });
            console.log(response.data);
            setLikeCount(response.data.like_count);
        } catch (error) {
            console.error("Unexpected error:", error);
        }
    }

    // If you want to display them, you can simply put them inside JSX like this:
    return (
        <div>
            <Typography variant="body2" component="p">
                いいね: {likeCount}
            </Typography>
            <IconButton color="primary" onClick={handleLike}>
                <StarIcon />
            </IconButton>
        </div>
    );
};


