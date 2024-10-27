import {Button } from '@mui/material';

const SendButton = ({receiverId,messageContent})=>{

    
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