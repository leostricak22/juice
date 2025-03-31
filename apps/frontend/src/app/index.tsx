import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useUserData } from "@/src/context/UserContext";

export default function Index() {
    const { userData, loading } = useUserData();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true); // Ensure the component is fully mounted before navigating
    }, []);

    useEffect(() => {
        if (isMounted && !loading) {
            if (userData) {
                router.replace("/dashboard");
            } else {
                router.replace("/auth/login");
            }
        }
    }, [isMounted, loading, userData, router]);

    if (loading || !isMounted) {
        return null; // Prevent navigation issues
    }

    return null;
}
