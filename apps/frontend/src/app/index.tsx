import { useEffect } from "react";
import { useRouter } from "expo-router";
import useUserData from "@/src/hooks/useUserData";

export default function Index() {
    const { userData, loading } = useUserData();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (userData) {
                router.replace("/dashboard");
            } else {
                router.replace("/auth/login");
            }
        }
    }, [loading, userData, router]);

    if (loading) {
        return null;
    }

    return null;
}
