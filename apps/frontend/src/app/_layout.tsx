import { Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import Loader from "@/src/components/loader/Loader";
import { StatusBar } from "react-native";
import Navbar from "@/src/components/navbar/Navbar";
import { UserProvider } from "@/src/context/UserContext";
import StripeProvider from "@/src/components/stripe/stripe-provider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

        loadFonts();
    }, []);

    if (!fontsLoaded && pathname !== "/") {
        return <Loader />;
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f57e20", marginBottom: 10}} edges={['top']}>
                <StatusBar backgroundColor="#f57e20" />
                <StripeProvider>
                    <UserProvider>
                        <Navbar />
                        <Stack screenOptions={{ headerShown: false }} />
                    </UserProvider>
                </StripeProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
