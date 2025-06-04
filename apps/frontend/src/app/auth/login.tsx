import React, {useEffect, useState} from 'react';
import {
    NativeSyntheticEvent,
    TextInputChangeEventData,
    View,
    Text, Pressable, Button,
} from 'react-native';
import LoginRequest from "@/src/models/dto/LoginRequest";
import {useLocalSearchParams, useRouter} from "expo-router";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isResponseError} from "@/src/utils/Validation";
import ActionButton from "@/src/components/button/ActionButton";
import Input from "@/src/components/input/Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WithNoAuth from "@/src/components/hoc/WithNoAuth";
import Navbar from "@/src/components/navbar/Navbar";

import textStyles from "@/assets/styles/text";
import containerStyles from "@/assets/styles/container";
import formStyles from "@/assets/styles/form";
import {handleGoogleLogin} from "@/src/utils/OAuth2Util";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import ScreenContainerView from "@/src/components/ScreenContainerView";
import {useUserData} from "@/src/context/UserContext";
import {handleUserDataChange} from "@/src/utils/UserDataChange";

const Login: React.FC = () => {
    const params = useLocalSearchParams();
    const { setUserData } = useUserData();

    const router = useRouter();
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (params.error) {
            setError(params.error as string);
        }
    }, [params]);

    const handleFormChange = (key: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = event?.nativeEvent?.text || '';
        setFormData((prevState) => ({ ...prevState, [key]: text }));
    };

    const handleSubmit = async () => {
        let response: AuthenticationResponse | MessageResponse | ErrorResponse;
        try {
            response = await dataFetch<AuthenticationResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
                "POST",
                formData
            );
        } catch (error) {
            setError("An error occurred during login. Please try again.");
            return;
        }

        if (isResponseError(response)) {
            setError((response as MessageResponse).message);
            return;
        }

        await AsyncStorage.setItem("token", (response as AuthenticationResponse).token);
        await handleUserDataChange(setUserData)

        router.push("/dashboard");
    };

    return (
        <ScreenContainerView>
            <View style={containerStyles.screenContainerContentCenter}>
                <View style={formStyles.formContainer}>
                    <Text style={[textStyles.heading, textStyles.alignCenter]}>Sign in</Text>
                    {error && <Text style={textStyles.error}>{error}</Text>}
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
                                  onClick={() => handleGoogleLogin(setError)}
                                  icon={"google"}
                    />
                    <Pressable onPress={() => router.push("/auth/register")}>
                        <Text style={textStyles.text}>Don't have an account? Sign up here.</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenContainerView>
    );
};

export default WithNoAuth(Login);