
import axios from '@/lib/axios';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState ,useEffect} from 'react';

export const useAuth = () => {
    const router = useRouter();
    const params = useParams();

    const [user,setUser] = useState(null)

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            console.log(storedUser)
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }) => {
        await csrf();
        setErrors([]);

        axios
            .post('/api/register', props)
            .then(() => {
                // Redirect to login page after successful registration
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
                console.log(response.data)
                // Assuming the response contains user and token
                const { user, token } = response.data;
                setUser(user)

                Cookies.set('user', JSON.stringify(user), { expires: 7 }); // Save user in cookie
                Cookies.set('token', token, { expires: 7 }); // Save token in cookie

                router.push('/dashboard'); // Redirect to dashboard or any other route
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
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
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
        await axios.post('/api/logout').then(() => {
            Cookies.remove('user'); // Remove user from cookie
            Cookies.remove('token'); // Remove token from cookie
        });

        router.push('/login'); // Use router for navigation instead of window
    };

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        githubLogin
    };
};
