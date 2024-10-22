import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAuth = () => {

    const router = useRouter();
    const params = useParams();

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }) => {
        await csrf();
        setErrors([]);

        axios
            .post('/api/register', props)
            .then(() => {
                // Optionally, you can set the user directly after registration if the API returns it.
                // setUser(response.data.user);
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

        axios
            .post('/api/login', props)
            .then((response) => {
                // Assuming the response contains user and token
                const { user: loggedInUser, token } = response.data;

                Cookies.set('user', JSON.stringify(loggedInUser), { expires: 7 }); // Save user in cookie
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
            setUser(null); // Clear user on logout
            Cookies.remove('user'); // Remove user from cookie
            Cookies.remove('token'); // Remove token from cookie
        });

        router.push('/login'); // Use router for navigation instead of window
    };

    return {
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
        githubLogin
    };
};
