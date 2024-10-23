'use client';
import { Box, Paper, Grid } from '@mui/material';
import Sidebar from '@/components/chat/sideBar';
import ChatContent from '@/components/chat/chatContent';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation'; // Import useRouter
import Cookies from 'js-cookie'; // Import js-cookie

const ChatComponent = () => {
    const { token } = useAuth();
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState(null);
    const router = useRouter(); // Initialize the router

    // Function to update the userId from Sidebar
    const handleUserSelect = (id) => {
        setUserId(id);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/message', {
                    headers: {
                        Authorization: `Bearer ${token}`,

                    },
                });
                console.log(response.data);
                // Handle successful response and set users if needed
                setUsers(response.data.map(item=>item.user)); // Assuming response.data contains users
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    // Clear the user token using js-cookie
                    Cookies.remove('token'); // Remove the token cookie
                    Cookies.remove('user')
                    // Redirect to login page
                    router.push('/login');
                } else {
                    console.error(error);
                }
            }
        };
        fetchUsers();
    }, [token, router]); // Add token and router to the dependency array

    return (
        <Box sx={{ py: 12 }}>
            <Box sx={{ maxWidth: '7xl', mx: 'auto', px: { sm: 6, lg: 8 } }}>
                <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 2 }}>
                    <Box sx={{ p: 3, backgroundColor: 'white', borderBottom: 1, borderColor: 'grey.200' }}>
                        <Grid container sx={{ height: '100%', overflow: 'hidden' }}>
                            {/* Sidebar */}
                            <Sidebar users={users} onUserSelect={handleUserSelect} />
                            {/* Chat Content */}
                            <ChatContent />
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default ChatComponent;
