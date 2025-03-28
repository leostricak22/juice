import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text } from 'react-native';

export default function CallbackScreen() {
    const params = useLocalSearchParams(); // Get query params (like "token")
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (params.token) {
            setToken(params.token as string);
        } else {
            router.replace("/auth/login")
        }
    }, [params]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Token:</Text>
            <Text>{token || 'No token found'}</Text>
        </View>
    );
}
