import { useEffect } from 'react';
import {UnknownOutputParams, useLocalSearchParams, useRouter} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/src/components/loader/Loader";

export default function CallbackScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        const checkToken = async (params:UnknownOutputParams) => {
            if (params.token) {
                await AsyncStorage.setItem("token", params.token as string);
                router.push("/dashboard");
            } else {
                let errorMessage = params.error || "";
                router.push(`/auth/login?error=${errorMessage}`);
            }
        }

        checkToken(params).then(r => r);
    }, [params]);

    return (
        <Loader />
    );
}
