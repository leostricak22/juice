import {Stack, usePathname} from "expo-router";
import React, {useEffect, useState} from "react";
import * as Font from "expo-font";
import Loader from "@/src/components/loader/Loader";
import {StatusBar} from "react-native";
import Navbar from "@/src/components/navbar/Navbar";
import {UserProvider} from "@/src/context/UserContext";
import StripeProvider from "@/src/components/stripe/stripe-provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({
                "Tektur": require("@/assets/fonts/Tektur-Regular.ttf"),
                "Tektur-Bold": require("@/assets/fonts/Tektur-Bold.ttf"),
            });
            setFontsLoaded(true);
        }

        loadFonts().then(r => r);
    }, []);

    if (!fontsLoaded && pathname !== "/") {
        return <Loader />;
    }

    return (
        <>
            <StatusBar backgroundColor="#51A3A3" />
            <StripeProvider>
                <UserProvider>
                    <Navbar />
                    <Stack screenOptions={{ headerShown: false }} />
                </UserProvider>
            </StripeProvider>
        </>
    )
}