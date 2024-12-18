'use client'
import { Box, Typography, TextField, Button, Avatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useEffect, useState } from 'react';

const Sidebar = ({ users, onUserSelect }) => {
    const [selectUser, setSelectUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleUserClick = (id) => {
        onUserSelect(id);
        setSelectUser(id);
    };

    // Filter users based on the search query
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
            />
            <Box sx={{ mt: 4, flexGrow: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>Active Conversations</Typography>
                <Box sx={{ mt: 2, height: 150, overflowY: 'auto' }}>
                    {filteredUsers.map(user => (
                        <Button
                            key={user.id} // Assuming each user has a unique id
                            onClick={() => handleUserClick(user.id)}
                            fullWidth
                            startIcon={<Avatar
                                src={user.avatar ? `http://localhost:8000/${user.avatar}` : 'https://via.placeholder.com/40'} // Use the avatar image or a placeholder
                                alt={user.name} // Alt text for accessibility
                                sx={{ bgcolor: 'indigo.500' }} // Fallback color if avatar image is not available
                            />} // Assuming you have user initials
                            sx={{
                                justifyContent: 'flex-start',
                                py: 1.5,
                                textTransform: 'none',
                                backgroundColor: selectUser === user.id ? 'lightgray' : 'transparent', // Highlight selected user
                                '&:hover': {
                                    backgroundColor: selectUser === user.id ? 'lightgray' : 'rgba(0, 0, 0, 0.08)', // Customize hover effect for selected user
                                },
                            }}
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
