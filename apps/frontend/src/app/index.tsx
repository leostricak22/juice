import {View, Text, Button, StyleSheet} from "react-native";
import {Link, useRouter} from "expo-router";
import {useEffect, useState} from "react";
import * as Font from "expo-font";
import Loader from "@/src/components/loader/Loader";
import useUserData from "@/src/hooks/useUserData";

export default function Index() {
    const { userData, loading } = useUserData();
    const router = useRouter();

    if (loading) {
        return;
    }

    if (userData) {
        router.replace("/dashboard");
    } else {
        router.replace("/auth/login")
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flex: 1,
        gap: 10,
        backgroundColor: 'white',
    },
    loginButton: {
        paddingTop: 20,
        width: '100%',
        maxWidth: 400,
    },
})