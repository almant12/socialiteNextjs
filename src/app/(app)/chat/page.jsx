'use client'
import { Box, Paper, Grid } from '@mui/material';
import Sidebar from '@/components/chat/sideBar';
import ChatContent from '@/components/chat/chatContent';
import { useState } from 'react';

const ChatComponent = () => {

    const [userId, setUserId] = useState(null);

    // Function to update the userId from Sidebar
    const handleUserSelect = (id) => {
        console.log(id)
        setUserId(id);
    };
    
    return(
        <Box sx={{ py: 12 }}>
        <Box sx={{ maxWidth: '7xl', mx: 'auto', px: { sm: 6, lg: 8 } }}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                <Box sx={{ p: 3, backgroundColor: 'white', borderBottom: 1, borderColor: 'grey.200' }}>
                    <Grid container sx={{ height: '100%', overflow: 'hidden' }}>
                        {/* Sidebar */}
                        <Sidebar onUserSelect={handleUserSelect}/>
                        {/* Chat Content */}
                        <ChatContent />
                    </Grid>
                </Box>
            </Paper>
        </Box>
    </Box>
    )
}

export default ChatComponent;
