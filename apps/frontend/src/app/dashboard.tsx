import {StyleSheet, Text, View} from "react-native";
import withAuth from '@/src/components/hoc/WithAuth';
import React from "react";
import PageProps from "@/src/types/PageProps";
import ActionButton from "@/src/components/button/ActionButton";
import {useRouter} from "expo-router";

const Dashboard: React.FC<PageProps> = ({ userData }) => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.replace("/auth/login");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome, {userData.username}</Text>
            <Text style={styles.subtitle}>Your email is {userData.email}</Text>
            <ActionButton text={"Logout"} onClick={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 400,
        gap: 10,
        margin: "auto",
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