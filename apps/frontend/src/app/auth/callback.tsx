import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import {useEffect, useState} from 'react';

export default function AuthCallback() {
    const router = useRouter();
    const params = useLocalSearchParams();

    const [token, setToken] = useState('');

    const handleAuthCallback = (token: string) => {
        console.log('Received token:', token);
        setToken(token);
    };

    useEffect(() => {
        const { token }:any = params;

        if (token) {
            handleAuthCallback(token);
        } else {
            console.log('No token received');
            router.replace('/auth/login');
        }
    }, [params]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {
                token ? <Text>{token}</Text> :
                    <>
                        <ActivityIndicator size="large" />
                        <Text>Processing authentication...</Text>
                    </>
            }
        </View>
    );
}