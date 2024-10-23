'use client'
import React, { useState } from 'react';
import { Box, Grid, Paper, Divider, TextField, Button, Avatar } from '@mui/material';
import { useAuth } from '@/hooks/auth';

const ChatContent = ({messages}) => {

    const {user} = useAuth();
    const currentUserId = user.id; // Replace with the actual ID of the logged-in user

return (
    <Grid item xs={9} sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Check if messages exist, otherwise display "No messages found" */}
        {messages && messages.length > 0 ? (
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    backgroundColor: 'grey.100', 
                    borderRadius: 2, 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column' 
                }}
            >
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                    <Grid container spacing={2}>
                        {messages.map((message) => (
                            <Grid item xs={8} key={message.id} sx={{ marginLeft: message.sender_id === currentUserId ? 'auto' : '0' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: message.sender_id === currentUserId ? 'row-reverse' : 'row' }}>
                                <Avatar 
                                        src={message.sender_profile.avatar} // Use the avatar image
                                        alt={message.sender_profile.name} // Alt text for accessibility
                                        sx={{ bgcolor: 'indigo.500' }} // Fallback color if avatar image is not available
                                    />
                                    <Paper 
                                        sx={{ 
                                            ml: message.sender_id === currentUserId ? '0' : 2, 
                                            mr: message.sender_id === currentUserId ? 2 : '0',
                                            p: 1, 
                                            borderRadius: 2, 
                                            boxShadow: 1,
                                            backgroundColor: message.sender_id === currentUserId ? 'indigo.100' : 'white'
                                        }}
                                    >
                                        <strong>{message.sender_profile.name}:</strong> {message.message}
                                    </Paper>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField 
                        fullWidth 
                        placeholder="Type your message..." 
                        variant="outlined" 
                        size="small" 
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ ml: 2, px: 4 }}
                    >
                        Send
                    </Button>
                </Box>
            </Box>
        ) : (
            // Display a message if there are no messages
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    backgroundColor: 'grey.100', 
                    borderRadius: 2, 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    minHeight: 200 
                }}
            >
                No messages found
            </Box>
        )}
    </Grid>
);
    
};

export default ChatContent;
