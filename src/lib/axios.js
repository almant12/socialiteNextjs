import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000', // Default to localhost for development
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
});

console.log('Axios baseURL:', axios.defaults.baseURL); // Log the base URL to verify

export default axios;
