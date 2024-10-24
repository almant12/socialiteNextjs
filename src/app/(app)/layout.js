"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth";
import Navigation from "@/app/(app)/Navigation";
import Loading from "@/app/(app)/Loading";

const AppLayout = ({ children }) => {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true after the component is mounted on the client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return a loading state if still rendering on the server
  if (!isMounted || !user) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
