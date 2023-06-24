import { useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UserDetailContext } from './UserDetailContext';
import { Box, Card, CardMedia, CardContent, Typography } from '@mui/material';


export const UserDetail = () => {
    const location = useLocation();
    const { user } = location.state 
    const [ userDetail, setUserDetail ] = useState(null);

    useEffect(() => {
      const handleUserDetail = async () => {
        console.log(user);
          try {
              const response = await axios.get(`http://localhost:8000/mistterapp/userdetail?query=${user.id}`);
              setUserDetail(response.data);
              console.log(response.data);
          } catch (error) {
              console.error("Unexpected error:", error);
          }
      };

      handleUserDetail();
  }, [user]);

    return (
    <div>
    <Box display="flex" justifyContent="center" paddingTop="1rem">
  <Card style={{ width: 500 }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {user.username}
      </Typography>
      <Typography variant="body2" color="text.secondary"></Typography>
      <Typography variant="body2" color="text.secondary"></Typography>
    </CardContent>
  </Card>
</Box>

    {userDetail && userDetail.map(item => ( 
        <Card style={{ maxWidth: 500, margin: '20px auto' }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User: {item.user}
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
