import { useEffect } from "react";
import { useAuth } from "./auth"; // Adjust the path as needed
import useEcho from "@/lib/echo"; // Adjust the path based on your project structure

const UseChat = (onMessageReceiver) => {
    const { user } = useAuth(); // Get the authenticated user
    const echo = useEcho(); // Get the Echo instance

    useEffect(() => {
        if (echo && user) {
            // Listen to the channel for new messages
            const channel = echo.private(`chat.${user.id}`)
                .listen('.message-sent', onMessageReceiver);

            // Cleanup on component unmount or when echo/user changes
            return () => {
                if (echo) {
                    channel.stopListening('.message-sent', onMessageReceiver);
                    echo.leaveChannel(`chat.${user.id}`);
                }
            };
        }
    }, [echo, user, onMessageReceiver]); // Dependencies include echo, user, and onMessageReceiver
};

export default UseChat;
