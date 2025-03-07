import React from 'react';
import { useRouter } from 'expo-router';
import useUserData from '@/src/hooks/useUserData';
import { Text } from 'react-native';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    return function WithAuth(props:any) {
        const router = useRouter();
        const { userData, loading } = useUserData();

        if (loading) {
            return <Text>Loading...</Text>;
        }

        if (!userData) {
            router.replace("/auth/login");
            return null;
        }

        return <WrappedComponent {...props} userData={userData} />;
    };
};

export default withAuth;