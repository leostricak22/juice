import { useEffect } from 'react';
import {UnknownOutputParams, useLocalSearchParams, useRouter} from 'expo-router';
import { View, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CallbackScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        const checkToken = async (params:UnknownOutputParams) => {
            if (params.token) {
                await AsyncStorage.setItem("token", params.token as string);
                router.replace("/dashboard");
            } else {
                router.replace("/auth/login")
            }
        }

        checkToken(params).then(r => r);
    }, [params]);

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
}
