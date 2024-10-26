'use client';

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow, set } from 'date-fns';
import { Box, Grid, Paper, Typography, Divider, TextField, Button, Avatar } from '@mui/material';
import { useAuth } from '@/hooks/auth';
import useEcho from '@/lib/echo'
import axios from '@/lib/axios'; // Import your configured Axios instance

const ChatContent = ({ messages }) => {
    const { user } = useAuth();

    const [messagess, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [currentUserId,setCurrentUserId] = useState(user?.id);
    const echo = useEcho(); // Initialize Echo

    useEffect(()=>{
        setMessages(messages)
        setCurrentUserId(user?.id)
    })
    // useEffect(() => {
    //     if (echo) {
    //         // Listen to the channel for new messages
    //         echo.private(`chat.${user.id}`) // Replace 'chat' with your actual channel name
    //             .listen('message-sent', (event) => { // Replace 'MessageSent' with the event name defined in Laravel
    //                 console.log(event)
    //                 setMessages((prevMessages) => [...prevMessages, event.message]);
    //             });
    //     }

    //     // Cleanup on component unmount or when echo changes
    //     return () => {
    //         if (echo) {
    //             echo.leaveChannel('chat'); // Replace 'chat' with your channel name
    //         }
    //     };
    // }, [echo]);

    const timeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Don't send empty messages

        try {
            const response = await axios.post('/api/messages', {
                message: newMessage,
                sender_id: currentUserId,
            });

            const createdMessage = response.data;
            setMessages((prevMessages) => [...prevMessages, createdMessage]);
            setNewMessage(''); // Clear input field
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Grid item xs={9} sx={{ p: 0, display: 'flex', flexDirection: 'column' }}>
            {messagess && messagess.length > 0 ? (
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'grey.100',
                        borderRadius: 2,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            overflowY: 'auto',
                            maxHeight: '500px', // Set a max height for scrolling
                        }}
                    >
                        <Grid container spacing={2}>
                            {messagess.map((message) => (
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
}
    

export default ChatContent;
