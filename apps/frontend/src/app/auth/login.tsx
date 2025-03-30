import React, {useState} from 'react';
import {
    Alert,
    Platform,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    View,
    Text, Pressable,
} from 'react-native';
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
import WithNoAuth from "@/src/components/hoc/WithNoAuth";

import textStyles from "@/assets/styles/text";
import containerStyles from "@/assets/styles/container";
import formStyles from "@/assets/styles/form";

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
        <View style={containerStyles.screenContainerCenter}>
            <View style={containerStyles.screenContainerContent}>
                <View style={formStyles.formContainer}>
                    <Text style={textStyles.heading}>Sign in</Text>
                    <Input
                        placeholder="Email"
                        value={formData.email}
                        onInputChange={(event:any) => handleFormChange("email", event)}
                    />
                    <Input
                        placeholder="Password"
                        value={formData.password}
                        onInputChange={(event:any) => handleFormChange("password", event)}
                        type={"password"}
                    />
                    <ActionButton text={"Sign in"}
                                  color={"orange"}
                                  onClick={handleSubmit}
                    />
                    <ActionButton text={"Sign in with Google"}
                                  color={"black"}
                                  onClick={handleGoogleLogin}
                                  icon={"google"}
                    />
                    <Pressable onPress={() => router.replace("/auth/register")}>
                        <Text style={textStyles.text}>Don't have an account? Sign up here.</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default WithNoAuth(Login);