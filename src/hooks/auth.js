import axios from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState,} from 'react';



export const useAuth = () => {
    const router = useRouter();
    const params = useParams();

    const [user, setUser] = useState(() => {
        const userCookie = Cookies.get('user');
        return userCookie ? JSON.parse(userCookie) : null;
    });
    const [token, setToken] = useState(Cookies.get('token') || null);


    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }) => {
        await csrf();
        setErrors([]);

        axios
            .post('/api/register', props,{
                
            })
            .then(() => {
                router.push('/login');
            })
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf();
        setErrors([]);
        setStatus(null);

        await axios
            .post('/api/login', props)
            .then((response) => {
                const { user, token } = response.data;
                setUser(user);

                Cookies.set('user', JSON.stringify(user), { expires: 7 });
                Cookies.set('token', token, { expires: 7 });

                router.push('/admin/dashboard');
            })
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const githubLogin = async ({ setErrors, setStatus }) => {
        await csrf();
        setStatus(null);
        setErrors([]);

        axios.get("/api/github").then((res) => {
            router.replace(res.data);
        });
    };

    const githubCallback = async (code, setErrors) => {
        try {
            const response = await axios.get(`/api/callback?code=${code}`);
            if (response.data.token) {
                // Assuming the response contains user and token
                const { user, token } = response.data;
                setUser(user);

                Cookies.set('user', JSON.stringify(user), { expires: 7 });
                Cookies.set('token', token, { expires: 7 });

                router.push('/admin/dashboard');
            } else {
                setErrors("Authentication failed.");
                router.push('/login');
            }
        } catch (err) {
            console.error('Error during GitHub login:', err);
            setErrors("An error occurred during authentication.");
            router.push('/login');
        }
    };

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .post('/api/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf();
        setErrors([]);
        setStatus(null);

        axios
            .post('/api/reset-password', { token: params.token, ...props })
            .then(response => router.push('/login?reset=' + btoa(response.data.status)))
            .catch(error => {
                if (error.response.status !== 422) throw error;
                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/api/email/verification-notification')
            .then(response => setStatus(response.data.status));
    };

    const logout = async () => {
        try {
            await axios.post('/api/logout', null, {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            });
            
            Cookies.remove('user');
            Cookies.remove('token');
            
            router.push('/login');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                Cookies.remove('user');
                Cookies.remove('token');
                router.push('/login');
            } else {
                console.error('Logout failed:', error);
            }
        }
    };
    
    

    return {
        user,
        token,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        githubLogin,
        githubCallback
    };
};
