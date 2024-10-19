
'use client'
import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Avatar, CircularProgress } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';

const Sidebar = ({onUserSelect}) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    const handleUserClick = (id) => {
        onUserSelect(id);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/message', {
                    headers: {
                        Authorization: `Bearer 73|HS7ELdTZ3NYktdGz1d9nsWLMmJ8m2Mt2JJAS8crH615e8d2a`
                    }
                });
                setUsers(response.data.map(item=>item.user));
                
            } catch (err) {
                setError(err);
            }
        };

        fetchUsers();
    }, []);


    return (
        <Box sx={{ p: 2, backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 48 }}>
                <Avatar sx={{ bgcolor: 'indigo.100', color: 'indigo.700' }}>
                    <ChatBubbleOutlineIcon />
                </Avatar>
                <Typography variant="h6" sx={{ ml: 2, fontWeight: 'bold' }}>QuickChat</Typography>
            </Box>
            <TextField 
                fullWidth 
                placeholder="Search..." 
                variant="outlined" 
                size="small" 
                sx={{ mt: 2 }} 
            />
            <Box sx={{ mt: 4, flexGrow: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Active Conversations</Typography>
                <Box sx={{ mt: 2, height: 150, overflowY: 'auto' }}>
                    {users.map(user => (
                        <Button 
                            key={user.id} // Assuming each user has a unique id
                            onClick={() => handleUserClick(user.id)} 
                            fullWidth 
                            startIcon={<Avatar sx={{ bgcolor: 'indigo.300' }}>{user.initial}</Avatar>} // Assuming you have user initials
                            sx={{ justifyContent: 'flex-start', py: 1.5, textTransform: 'none' }}
                        >
                            {user.name}
                        </Button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
