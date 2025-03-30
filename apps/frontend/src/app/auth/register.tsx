import {View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Pressable} from "react-native";
import Input from "@/src/components/input/Input";
import ActionButton from "@/src/components/button/ActionButton";
import {Link, useRouter} from "expo-router";
import WithNoAuth from "@/src/components/hoc/WithNoAuth";
import React, {useState} from "react";
import RegisterRequest from "@/src/models/dto/RegisterRequest";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isValidMessageResponse} from "@/src/utils/Validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

import textStyles from "@/assets/styles/text";
import containerStyles from "@/assets/styles/container";
import formStyles from "@/assets/styles/form";

function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState<RegisterRequest>({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        role: "USER",
        location: "ZAGREBACKA",
    });

    const handleFormChange = (key: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setFormData((prevState) => ({ ...prevState, [key]: event.nativeEvent.text }));
    };

    const handleSubmit = async () =>{
        let response: AuthenticationResponse | MessageResponse;

        try {
            response = await dataFetch<AuthenticationResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/auth/register`,
                "POST",
                formData);
        } catch (error) {
            // TODO: Handle error
            return;
        }

        if (!isValidMessageResponse(response)) {
            // TODO: Handle error
            alert((response as MessageResponse).message);
            return;
        }

        await AsyncStorage.setItem("token", (response as AuthenticationResponse).token);
        router.replace("/dashboard");
    };

    const handleGoogleLogin = async () => {

    }

    return (
        <View style={containerStyles.screenContainerCenter}>
            <View style={containerStyles.screenContainerContent}>
                <View style={formStyles.formContainer}>
                    <Text style={textStyles.heading}>Register</Text>
                    <Input
                        placeholder="Name"
                        value={formData.name}
                        onInputChange={(event) => handleFormChange("name", event)}
                    />
                    <Input
                        placeholder="Surname"
                        value={formData.surname}
                        onInputChange={(event) => handleFormChange("surname", event)}
                    />
                    <Input
                        placeholder="Username"
                        value={formData.username}
                        onInputChange={(event) => handleFormChange("username", event)}
                    />
                    <Input
                        placeholder="Email"
                        value={formData.email}
                        onInputChange={(event) => handleFormChange("email", event)}
                    />
                    <Input
                        placeholder="Password"
                        value={formData.password}
                        onInputChange={(event) => handleFormChange("password", event)}
                    />
                    <Input
                        placeholder="Confirm Password"
                        value=""
                    />
                    <ActionButton text={"Sign up"} onClick={handleSubmit} />
                    <ActionButton text={"Sign up with Google"} color={"black"} onClick={handleGoogleLogin} />
                    <Pressable onPress={() => router.replace("/auth/login")}>
                        <Text style={textStyles.text}>Already have an account? Sign in here.</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

export default WithNoAuth(Register);