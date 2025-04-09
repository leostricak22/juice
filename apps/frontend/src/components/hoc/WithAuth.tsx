import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Loader from "@/src/components/loader/Loader";
import { useUserData } from "@/src/context/UserContext";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    return function WithAuth(props: any) {
        const router = useRouter();
        const { userData, loading } = useUserData();
        const [isNavigating, setIsNavigating] = useState(false);

        useEffect(() => {
            if (!loading && !userData && !isNavigating) {
                setIsNavigating(true);

                setTimeout(() => {
                    router.replace('/auth/login');
                }, 0);
            }
        }, [loading, userData, router, isNavigating]);

        if (loading) {
            return <Loader />;
        }

        if (!userData || isNavigating) {
            return <Loader />;
        }

        return <WrappedComponent {...props} userData={userData} />;
    };
};

export default withAuth;