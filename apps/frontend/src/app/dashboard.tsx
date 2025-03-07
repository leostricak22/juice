import { Text, View } from "react-native";
import withAuth from '@/src/components/hoc/WithAuth';
import React from "react";
import PageProps from "@/src/types/PageProps";

const Dashboard: React.FC<PageProps> = ({ userData }) => {
    return (
        <View>
            <Text>Welcome, {userData.username}</Text>
            <Text>Your email is {userData.email}</Text>
        </View>
    );
}

export default withAuth(Dashboard);