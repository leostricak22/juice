import { useState, useEffect, useRef } from 'react';
import dataFetch from "@/src/utils/DataFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserData = () => {
    const [userData, setUserData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const fetchUserData = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");

        if (!token) {
            if (isMounted.current) {
                setUserData(null);
                setLoading(false);
            }

            return;
        }

        try {
            const response = await dataFetch(`${process.env.EXPO_PUBLIC_API_URL}/api/auth/user`, "GET");
            if (isMounted.current) {
                setUserData(response);
            }
        } catch (error) {
            console.log("Error fetching user data");
            if (isMounted.current) {
                setUserData(null);
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUserData().then(r => r);
    }, []);

    return { userData, loading, refetchUserData: fetchUserData };
};

export default useUserData;