import { Stack, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";
import * as Font from "expo-font";
import Loader from "@/src/components/loader/Loader";
import {KeyboardAvoidingView, Platform, StatusBar} from "react-native";
import Navbar from "@/src/components/navbar/Navbar";
import { UserProvider } from "@/src/context/UserContext";
import StripeProvider from "@/src/components/stripe/stripe-provider";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Host } from 'react-native-portalize';

export default function RootLayout() {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: "#f57e20", marginBottom: 10}} edges={['top']}>
                <StatusBar backgroundColor="#f57e20" />
                <StripeProvider>
                    <UserProvider>
                        <Host>
                            <Navbar />
                            <KeyboardAvoidingView
                                style={{ flex: 1 }}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // Adjust if needed
                            >
                            <Stack screenOptions={{ headerShown: false }} />
                            </KeyboardAvoidingView>
                        </Host>
                    </UserProvider>
                </StripeProvider>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}
