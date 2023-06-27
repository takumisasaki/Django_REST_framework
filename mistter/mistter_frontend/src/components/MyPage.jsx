import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';

export const MyPage = () => {
    const { user } = useContext(UserContext);
    const { user_id } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [ followed, setFollowed ] = useState(null);
    const [ following, setFollowing ] = useState(null);

    useEffect(() => {
        const handleUserMyPage = async () => {
          console.log(user_id);
            try {
                const response = await axios.get(`http://localhost:8000/mistterapp/mypage?query=${user_id}`);
                setData(response.data.data);
                setFollowed(response.data.followed_count);
                setFollowing(response.data.following_count);
                console.log(response.data.data);
            } catch (error) {
                console.error("Unexpected error:", error);
            }
        };
  
        handleUserMyPage();
    }, [user_id]);
    // const [ user, setUser ] = useState(null);
    return (
        <div>
    <Box display="flex" justifyContent="center" paddingTop="1rem">
    <Card style={{ width: 500 }}>
        <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            { user }
        </Typography>
        フォロー：{following} フォロワー：{followed}<br />
        <Typography variant="body2" color="text.secondary"></Typography>
        <Typography variant="body2" color="text.secondary"></Typography>
        </CardContent>
    </Card>
    </Box>

    {data && data.map(item => ( 
        <Card style={{ maxWidth: 500, margin: '20px auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            { user }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Categories: {Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Text: {item.text}
          </Typography>
        </CardContent>
      </Card>
    ))}
      </div>
    )
}
