import { useEffect, useState } from "react";
import { UnknownOutputParams, useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/src/components/loader/Loader";
import {handleUserDataChange} from "@/src/utils/UserDataChange";
import {useUserData} from "@/src/context/UserContext";

export default function CallbackScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const { setUserData } = useUserData();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;

        const checkToken = async (params: UnknownOutputParams) => {
            if (params.token) {
                await AsyncStorage.setItem("token", params.token as string);
                await handleUserDataChange(setUserData)
                router.replace("/dashboard");
            } else {
                let errorMessage = params.error || "";
                router.push(`/auth/login?error=${errorMessage}`);
            }
        };

        checkToken(params).then(r => r);
    }, [params, isMounted]);

    return <Loader />;
}
