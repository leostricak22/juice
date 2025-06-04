import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useUserData } from "@/src/context/UserContext";

export default function Index() {
    const { userData, loading } = useUserData();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !loading) {
            if (userData) {
                router.push("/dashboard");
            } else {
                router.push("/auth/login");
            }
        }
    }, [isMounted, loading, userData, router]);

    if (loading || !isMounted) {
        return null;
    }

    return null;
}
