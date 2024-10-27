'use client';

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, Grid, Paper, Typography, Divider, TextField, Button, Avatar } from '@mui/material';
import { useAuth } from '@/hooks/auth';
import useEcho from '@/lib/echo'; // Import the custom Echo hook
import axios from '@/lib/axios'; // Import your configured Axios instance

const ChatContent = ({ messages,receiverId}) => {
    const { user } = useAuth();
    const currentUserId = user.id;

    const [newMessage, setNewMessage] = useState('');


    const timeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Don't send empty messages

        try {
            const response = await axios.post(`/api/message/${receiverId}`, {
                message: newMessage,
            });

            const createdMessage = response.data;
            setMessages((prevMessages) => [...prevMessages, createdMessage]);
            setNewMessage(''); // Clear input field
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Grid item xs={9} sx={{display: 'flex', flexDirection: 'column', height: '500px' }}>
            {messages && messages.length > 0 ? (
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'grey.100',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <Box sx={{ flexGrow: 1, overflowY: 'auto', maxHeight: '70vh' }}>
                        <Grid container spacing={2} sx={{ flexDirection: 'column-reverse' }}>
                            {messages.map((message) => (
                                <Grid item xs={8} key={message.id} sx={{ marginLeft: message.sender_id === currentUserId ? 'auto' : '0' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: message.sender_id === currentUserId ? 'row-reverse' : 'row' }}>
                                        <Avatar
                                            src={message.sender_profile.avatar ? `http://localhost:8000/${message.sender_profile.avatar}` : 'https://via.placeholder.com/40'}
                                            alt={message.sender_profile.name}
                                            sx={{ bgcolor: 'indigo.500' }}
                                        />
                                        <Paper
                                            sx={{
                                                ml: message.sender_id === currentUserId ? '0' : 2,
                                                mr: message.sender_id === currentUserId ? 2 : '0',
                                                p: 1,
                                                borderRadius: 2,
                                                boxShadow: 1,
                                                backgroundColor: message.sender_id === currentUserId ? 'indigo.100' : 'white',
                                            }}
                                        >
                                            <Typography variant="body1">{message.message}</Typography>
                                            <Typography variant="caption" color="textSecondary">
                                                {timeAgo(message.created_at)}
                                            </Typography>
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
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{ ml: 2, px: 4 }}
                            onClick={handleSendMessage}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'grey.100',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 200,
                    }}
                >
                    Welcome to our chat
                </Box>
            )}
        </Grid>
    );
    
};

export default ChatContent;
