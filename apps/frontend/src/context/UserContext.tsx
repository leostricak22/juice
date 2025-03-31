import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getUserData} from "@/src/utils/data/UserData";

interface UserContextProps {
    userData: any | null;
    setUserData: React.Dispatch<React.SetStateAction<any | null>>;
    loading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [userData, setUserData] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                    const userData = await getUserData();
                    if (userData) {
                        setUserData(userData);
                    } else {
                        setUserData(null);
                    }
                }
            } catch (error) {
                console.error("Failed to load token from storage:", error);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    if (loading) {
        return null;
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserData = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserData must be used within a UserProvider");
    }
    return context;
};
