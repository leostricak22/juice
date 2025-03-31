import {StyleSheet, Text, View} from "react-native";
import withAuth from '@/src/components/hoc/WithAuth';
import React from "react";
import PageProps from "@/src/types/PageProps";
import ActionButton from "@/src/components/button/ActionButton";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "@/src/components/navbar/Navbar";

import containerStyles from "@/assets/styles/container";
import textStyles from "@/assets/styles/text";

const Dashboard: React.FC<PageProps> = ({ userData }) => {
    const router = useRouter();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace("/auth/login");
    }

    return (
        <View style={containerStyles.screenContainerCenter}>
            <Navbar />
            <View style={containerStyles.screenContainerContent}>
                <Text style={textStyles.heading}>Welcome, {userData.name}</Text>
                <Text style={textStyles.text}>Your email is {userData.email}</Text>
                <ActionButton text={"Logout"} color={"orange"} onClick={handleLogout} />
            </View>
        </View>
    );
}

export default withAuth(Dashboard);