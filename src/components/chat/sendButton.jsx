import {Button } from '@mui/material';
import axios from '@/lib/axios';

const SendButton = ({receiverId,messageContent,addMessageToChat,setNewMessage})=>{

    
    const handleSendMessage = async () => {
        try {
            const response = await axios.post(`/api/message/${receiverId}`, {
                message: messageContent,
            });

            const createdMessage = response.data;
            addMessageToChat(createdMessage)
            setNewMessage(''); // Clear input field
        } catch (error) {
            console.error('Failed to send message:', error);
        }
    };

    return (
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 2, px: 4 }}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      );
}

export default SendButton