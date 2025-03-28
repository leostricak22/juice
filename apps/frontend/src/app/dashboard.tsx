import {StyleSheet, Text, View} from "react-native";
import withAuth from '@/src/components/hoc/WithAuth';
import React from "react";
import PageProps from "@/src/types/PageProps";
import ActionButton from "@/src/components/button/ActionButton";
import {useRouter} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Dashboard: React.FC<PageProps> = ({ userData }) => {
    const router = useRouter();

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        router.replace("/auth/login");
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Welcome, {userData.name}</Text>
                <Text style={styles.subtitle}>Your email is {userData.email}</Text>
                <ActionButton text={"Logout"} onClick={handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 10,
        margin: "auto",
    },
    content: {
        flex: 1,
        width: "100%",
        maxWidth: 500,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 24,
    }
});

export default withAuth(Dashboard);