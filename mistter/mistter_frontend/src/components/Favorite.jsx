import React from 'react';
import { Typography, Button } from "@mui/material";

export const Favorite = ({ post }) => {
    // You can access properties of the post object like this:
    const postId = post.id;
    const postText = post.text;
    const likeCount = post.like_count;
    
    // If you want to display them, you can simply put them inside JSX like this:
    return (
        <div>
            <Typography variant="body2" component="p">
                いいね: {post.like_count}
            </Typography>
        </div>
    );
};


