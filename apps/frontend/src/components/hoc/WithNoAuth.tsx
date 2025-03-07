import React from 'react';
import { useRouter } from 'expo-router';
import useUserData from '@/src/hooks/useUserData';
import { Text } from 'react-native';

const WithNoAuth = (WrappedComponent: React.ComponentType<any>) => {
    return function WithNoAuth(props: any) {
        const router = useRouter();
        const { userData, loading } = useUserData();

        if (loading) {
            return <Text>Loading...</Text>;
        }

        if (userData) {
            router.replace('/dashboard');
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};

export default WithNoAuth;