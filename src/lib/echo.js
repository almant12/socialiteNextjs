import { useEffect, useState } from 'react';
import axios from './axios';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie'; // Import the js-cookie library

if (typeof window !== 'undefined') {
  window.Pusher = Pusher;
}

const useEcho = () => {
  const [echoInstance, setEchoInstance] = useState(null);

  useEffect(() => {
    // Get the Bearer token from cookies
    const token = Cookies.get('token'); // Replace 'token' with the name of your cookie

    // Create the Echo instance here
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
                    Authorization: `Bearer ${token}`, // Use the token from the cookie
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
      wsPort: process.env.NEXT_PUBLIC_REVERB_PORT,
      wssPort: process.env.NEXT_PUBLIC_REVERB_PORT,
      forceTLS: (process.env.NEXT_PUBLIC_REVERB_SCHEME ?? 'https') === 'https',
      enabledTransports: ['ws', 'wss'],
    });
    
    setEchoInstance(echo);

    // Cleanup on unmount
    return () => {
      if (echo) {
        echo.disconnect(); // Optional: disconnect when the component unmounts
      }
    };
  }, []); // No dependency on token; it fetches directly from the cookie

  return echoInstance;
};

export default useEcho;
