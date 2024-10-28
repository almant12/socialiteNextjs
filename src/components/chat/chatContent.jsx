'use client';

import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Box, Grid, Paper, Typography, Divider, TextField, Avatar } from '@mui/material';
import { useAuth } from '@/hooks/auth';
import SendButton from './sendButton';

const ChatContent = ({ messages, receiverId }) => {
    const { user } = useAuth();
    const currentUserId = user.id;

    const [chatMessages, setChatMessages] = useState(messages);
    const [newMessage, setNewMessage] = useState('');

    const timeAgo = (timestamp) => {
        return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    };

    const addNewMessage = (message) => {
        setChatMessages((prevMessages) => [...prevMessages, message]);
    };

    // Sync the local messages state with the messages prop
    useEffect(() => {
        setChatMessages(messages);
    }, [messages]);

 

    return (
        <Grid item xs={9} sx={{ display: 'flex', flexDirection: 'column', height: '500px' }}>
            {chatMessages && chatMessages.length > 0 ? (
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
                            {chatMessages.map((message) => (
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

                        <SendButton 
                            receiverId={receiverId}
                            messageContent={newMessage}
                            addMessageToChat={addNewMessage}
                            setNewMessage={setNewMessage}
                        />
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
