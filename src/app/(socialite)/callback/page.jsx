"use client";

import { useAuth } from "@/hooks/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Callback = () => {
    const { githubCallback } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            githubCallback(code, setError).finally(() => setLoading(false));
        } else {
            setError("No code provided.");
            router.push('/login');
        }
        githubCallback();
    },[]);

    return (
        <div>
            {loading ? (
                <div className="flex min-h-screen w-full items-center justify-center bg-gray-100">
                    Loading...
                </div>
            ) : (
                error && <p>{error}</p>
            )}
            </div>
    );
};

export default Callback;
