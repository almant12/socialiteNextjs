'use client';

import axios from "@/lib/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Callback = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const githubLogin = async () => {
            try {
                const response = await axios.get('/api/callback?code=' + searchParams.get('code'));
                console.log(response);

                // Assuming successful response means valid token received
                if (response.data.token) {
                    // Redirect to dashboard after a short delay for loading spinner
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 1000); // 1 second delay for the spinner
                } else {
                    // If token is not present, navigate to login
                    setError("Authentication failed.");
                    router.push('/login');
                }
            } catch (err) {
                console.error('Error during GitHub login:', err);
                setError("An error occurred during authentication.");
                router.push('/login');
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        if (searchParams.get('code')) {
            githubLogin();
        }
    }, [searchParams, router]);

    return (
        <div className="flex justify-center items-center h-screen">
            {loading ? (
                <div className="loader"> {/* Add your spinner/loading animation here */}
                    <p>Loading...</p>
                    <style jsx>{`
                        .loader {
                            border: 8px solid #f3f3f3; /* Light grey */
                            border-top: 8px solid #3498db; /* Blue */
                            border-radius: 50%;
                            width: 60px;
                            height: 60px;
                            animation: spin 2s linear infinite;
                        }

                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            ) : (
                <div>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default Callback;
