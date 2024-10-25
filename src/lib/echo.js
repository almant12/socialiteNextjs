import Echo from 'laravel-echo';
import axios from './axios'; // Import your configured Axios instance
import Pusher from 'pusher-js';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth'; // Assuming this is your custom hook to get user authentication details

window.Pusher = Pusher;

const useEcho = () => {
  const [echoInstance, setEchoInstance] = useState(null);
  const { token } = useAuth(); // Custom hook to get the current auth token

  useEffect(() => {
    // Ensure the token is available before initializing Echo
    if (!token) return;

    const echo = new Echo({
      broadcaster: 'reverb',
      key: process.env.NEXT_PUBLIC_REVERB_APP_KEY,
      authorizer: (channel) => {
        return {
          authorize: (socketId, callback) => {
            axios
              .post(
                '/api/broadcasting/auth',
                {
                  socket_id: socketId,
                  channel_name: channel.name,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`, // Add the Bearer token
                  },
                }
              )
              .then((response) => {
                callback(false, response.data);
              })
              .catch((error) => {
                callback(true, error);
              });
          },
        };
      },
      wsHost: process.env.NEXT_PUBLIC_REVERB_HOST,
      wsPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 80,
      wssPort: process.env.NEXT_PUBLIC_REVERB_PORT ?? 443,
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
    });

    setEchoInstance(echo);

    // Cleanup on component unmount
    return () => {
      if (echo) {
        echo.disconnect();
      }
    };
  }, [token]); // Only re-run effect if the token changes

  return echoInstance;
};

export default useEcho;
