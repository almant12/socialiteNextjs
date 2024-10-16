// ChatComponent.jsx
import { Box, Paper, Grid } from '@mui/material';
import Sidebar from '@/components/chat/sideBar';
import ChatContent from '@/components/chat/chatContent';

const ChatComponent = () => (
    <Box sx={{ py: 12 }}>
        <Box sx={{ maxWidth: '7xl', mx: 'auto', px: { sm: 6, lg: 8 } }}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                <Box sx={{ p: 3, backgroundColor: 'white', borderBottom: 1, borderColor: 'grey.200' }}>
                    <Grid container sx={{ height: '100%', overflow: 'hidden' }}>
                        {/* Sidebar */}
                        <Sidebar />
                        {/* Chat Content */}
                        <ChatContent />
                    </Grid>
                </Box>
            </Paper>
        </Box>
    </Box>
);

export default ChatComponent;
