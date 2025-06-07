import {
    View,
    Text,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputChangeEventData,
    Pressable,
    ScrollView, Image
} from "react-native";
import Input from "@/src/components/input/Input";
import ActionButton from "@/src/components/button/ActionButton";
import {Link, useRouter} from "expo-router";
import WithNoAuth from "@/src/components/hoc/WithNoAuth";
import Navbar from "@/src/components/navbar/Navbar";
import React, {useState} from "react";
import RegisterRequest from "@/src/models/dto/RegisterRequest";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import ErrorResponse from "@/src/models/dto/ErrorResponse";
import dataFetch from "@/src/utils/DataFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

import textStyles from "@/assets/styles/text";
import containerStyles from "@/assets/styles/container";
import formStyles from "@/assets/styles/form";
import {handleGoogleLogin} from "@/src/utils/OAuth2Util";
import {isResponseError} from "@/src/utils/Validation";
import ScreenContainerView from "@/src/components/ScreenContainerView";
import Icon from "@/src/components/icon/Icon";

import * as ImagePicker from 'expo-image-picker';

function Register() {
    const router = useRouter();

    const [formData, setFormData] = useState<RegisterRequest>({
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "USER",
        location: "ZAGREBACKA",
        profileImage: undefined
    });
    const [error, setError] = useState<any>({
        global: "",
        name: "",
        surname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleFormChange = (key: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        const text = event?.nativeEvent?.text || '';
        setFormData((prevState) => ({...prevState, [key]: text}));
        setError((prevState: any) => ({...prevState, [key]: ""}));
    };

    const isFormDataValid = (data: RegisterRequest) => {
        const newError = {
            global: "",
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        };

        if (!data.name) newError.name = "Name is required";
        if (!data.surname) newError.surname = "Surname is required";
        if (!data.username) newError.username = "Username is required";
        if (!data.email) newError.email = "Email is required";
        if (!data.password) newError.password = "Password is required";
        if (data.password !== data.confirmPassword) newError.confirmPassword = "Passwords do not match";

        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) newError.email = "Email is not valid";
        if (data.username.length < 3) newError.username = "Username must be at least 3 characters long";
        if (data.username.length > 20) newError.username = "Username must be at most 20 characters long";
        if (data.password.length < 8) {
            newError.password = "Password must be at least 8 characters long";
            newError.confirmPassword = "Password must be at least 8 characters long";
        }

        if (Object.values(newError).some((error) => error)) {
            setError(newError);
            return false;
        }
        setError({
            global: "",
            name: "",
            surname: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        });

        return true;
    };

    const handleSubmit = async () => {
        if (!isFormDataValid(formData))
            return;

        let response: AuthenticationResponse | MessageResponse | ErrorResponse;

        try {
            response = await dataFetch<AuthenticationResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/auth/register`,
                "POST",
                formData);
        } catch (error) {
            setError((prevState: any) => ({...prevState, global: "An error occurred during registration"}));
            return;
        }

        if (isResponseError(response)) {
            if ((response as ErrorResponse).fields) {
                const fields = Object.keys((response as ErrorResponse).fields);
                const newError = {...error};
                fields.forEach((field) => {
                    newError[field] = (response as ErrorResponse).fields[field];
                });
                setError(newError);
            }
            return;
        }

        await AsyncStorage.setItem("token", (response as AuthenticationResponse).token);
        router.push("/dashboard");
    };

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("Permission to access media library is required!");
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Yes, this still works
            base64: true,
            allowsEditing: false, // optional, but needed if you pass advanced options
            quality: 0.7,
        });

        if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
            const asset = pickerResult.assets[0];

            if (asset.base64) {
                console.log("Base64:", asset.base64.substring(0, 50) + "...");
                setFormData((prevState) => ({
                    ...prevState,
                    profileImage: `data:image/jpeg;base64,${asset.base64}`,
                }));
            } else {
                console.warn("Asset did not include base64 data");
            }
        }
    };


    return (
        <ScreenContainerView backgroundColor={"#F57E20"}>
            <View style={containerStyles.screenContainerContent}>
                <View style={formStyles.formContainer}>
                    <Icon name={"juiceLogoOnAuthPages"} size={300}/>
                    {error && <Text style={textStyles.error}>{error.global}</Text>}
                    <Pressable style={styles.profileImageContainer} onPress={handleImagePick}>
                        {formData.profileImage ? (
                            <Image
                                source={{uri: formData.profileImage}}
                                style={{width: 100, height: 100, borderRadius: 50}}
                            />
                        ) : (
                            <Icon name={"profileImagePicker"} size={100}/>
                        )}
                    </Pressable>
                    <Input
                        placeholder="Ime"
                        value={formData.name}
                        onInputChange={(event) => handleFormChange("name", event)}
                        error={error.name}
                    />
                    <Input
                        placeholder="Prezime"
                        value={formData.surname}
                        onInputChange={(event) => handleFormChange("surname", event)}
                        error={error.surname}
                    />
                    <Input
                        placeholder="Korisničko ime"
                        value={formData.username}
                        onInputChange={(event) => handleFormChange("username", event)}
                        error={error.username}
                    />
                    <Input
                        placeholder="E-mail"
                        value={formData.email}
                        onInputChange={(event) => handleFormChange("email", event)}
                        error={error.email}
                    />
                    <Input
                        placeholder="Lozinka"
                        value={formData.password}
                        onInputChange={(event) => handleFormChange("password", event)}
                        type={"password"}
                        error={error.password}
                    />
                    <Input
                        placeholder="Potvrda lozinke"
                        value={formData.confirmPassword}
                        onInputChange={(event) => handleFormChange("confirmPassword", event)}
                        type={"password"}
                        error={error.confirmPassword}
                    />
                    <ActionButton text={"Registracija"} color={"black"} onClick={handleSubmit}/>
                </View>
            </View>
        </ScreenContainerView>
    );
}

export default WithNoAuth(Register);

const styles = StyleSheet.create({
    profileImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        top: -20
    },
});