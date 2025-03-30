import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import useUserData from '@/src/hooks/useUserData';
import { Text } from 'react-native';
import Loader from "@/src/components/loader/Loader";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    return function WithAuth(props: any) {
        const router = useRouter();
        const { userData, loading } = useUserData();

        useEffect(() => {
            if (!loading && !userData) {
                router.replace('/auth/login');
            }
        }, [loading, userData, router]);

        if (loading) {
            return <Loader />;
        }

        if (!userData) {
            return null;
        }

        return <WrappedComponent {...props} userData={userData} />;
    };
};

export default withAuth;