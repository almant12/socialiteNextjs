'use client'
import React from 'react';
import { Box, Grid, Paper, Divider, TextField, Button, Avatar } from '@mui/material';

const ChatContent = () => {

    return (
        <Grid item xs={9} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
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
                    <Grid item xs={8}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ bgcolor: 'indigo.500' }}>A</Avatar>
                            <Paper sx={{ ml: 2, p: 2, borderRadius: 2, boxShadow: 1 }}>
                                Hey, How are you today?
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={8} sx={{ ml: 'auto' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                            <Avatar sx={{ bgcolor: 'indigo.500' }}>A</Avatar>
                            <Paper 
                                sx={{ 
                                    mr: 2, 
                                    p: 2, 
                                    backgroundColor: 'indigo.100', 
                                    borderRadius: 2, 
                                    boxShadow: 1 
                                }}
                            >
                                I'm ok, what about you?
                            </Paper>
                        </Box>
                    </Grid>
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
    </Grid>
    )
};

export default ChatContent;
