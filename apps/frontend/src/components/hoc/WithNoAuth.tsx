import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import useUserData from '@/src/hooks/useUserData';
import { Text } from 'react-native';

const WithNoAuth = (WrappedComponent:any) => {
    return function WithNoAuth(props:any) {
        const router = useRouter();
        const { userData, loading } = useUserData();

        useEffect(() => {
            if (!loading && userData) {
                router.replace('/dashboard');
            }
        }, [loading, userData, router]);

        if (loading) {
            return <Text>Loading...</Text>;
        }

        if (userData) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default WithNoAuth;