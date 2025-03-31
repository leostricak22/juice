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
import ScreenContainerView from "@/src/components/ScreenContainerView";
import {useUserData} from "@/src/context/UserContext";
import {handleUserDataChange} from "@/src/utils/UserDataChange";

const Dashboard: React.FC<PageProps> = ({ userData }) => {
    const router = useRouter();
    const { setUserData } = useUserData();

    console.log(userData);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        await handleUserDataChange(setUserData)
        router.replace("/auth/login");
    }

    return (
        <ScreenContainerView>
            <View style={containerStyles.screenContainerContent}>
                <Text style={textStyles.headingMedium}>Welcome, {userData.name}!</Text>
                <Text style={textStyles.text}>Your email is {userData.email}</Text>
                <ActionButton text={"Logout"} color={"orange"} onClick={handleLogout} />
            </View>
        </ScreenContainerView>
    );
}

export default withAuth(Dashboard);