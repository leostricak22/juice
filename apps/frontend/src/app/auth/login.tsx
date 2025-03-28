import React, {useState} from 'react';
import {Alert, Platform, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, View, Text} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import LoginRequest from "@/src/models/dto/LoginRequest";
import {Link, useRouter} from "expo-router";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isValidMessageResponse} from "@/src/utils/Validation";
import ActionButton from "@/src/components/button/ActionButton";
import Input from "@/src/components/input/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GOOGLE_AUTH_URL =  process.env.EXPO_PUBLIC_API_URL + '/oauth2/authorization/google';

const Login: React.FC = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const handleGoogleLogin = async () => {
        try {
            if (Platform.OS === 'web') {
                window.location.href = `${GOOGLE_AUTH_URL}?redirect_uri=${encodeURIComponent(window.location.origin + '/auth/callback')}`;
            } else {
                await WebBrowser.openAuthSessionAsync(
                    GOOGLE_AUTH_URL,
                    'juice://auth/callback'
                );
            }
        } catch (error: any) {
            console.error('Error during authentication:', error);
            Alert.alert('Authentication Error', error.message);
        }
    };

    const handleFormChange = (key: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = event?.nativeEvent?.text || '';
        setFormData((prevState) => ({ ...prevState, [key]: text }));
    };

    const handleSubmit = async () => {
        let response: AuthenticationResponse | MessageResponse;
        try {
            response = await dataFetch<AuthenticationResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
                "POST",
                formData
            );
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login");
            return;
        }

        if (!isValidMessageResponse(response)) {
            alert((response as MessageResponse).message);
            return;
        }

        await AsyncStorage.setItem("token", (response as AuthenticationResponse).token);
        router.replace("/dashboard");
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
                    <Text style={styles.title}>Login</Text>
                    <Input
                        placeholder="Email"
                        value={formData.email}
                        onInputChange={(event:any) => handleFormChange("email", event)}
                    />
                    <Input
                        placeholder="Password"
                        value={formData.password}
                        onInputChange={(event:any) => handleFormChange("password", event)}
                    />
                    <ActionButton text={"Login"} onClick={handleSubmit} />
                    <ActionButton
                        text={"Google Login"}
                        onClick={handleGoogleLogin}
                    />
                    <Link href="/auth/register" asChild>
                        <Text>Don't have an account? Register here.</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
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
    form: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 10,
    },
});

export default Login;