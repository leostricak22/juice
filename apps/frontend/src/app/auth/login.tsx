import {View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import ActionButton from "@/src/components/button/ActionButton";
import Input from "@/src/components/input/Input";
import { useState } from "react";
import LoginRequest from "@/src/models/dto/LoginRequest";
import dataFetch from "@/src/utils/DataFetch";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import {isValidMessageResponse} from "@/src/utils/Validation";
import {Link, useRouter} from "expo-router";
import WithNoAuth from "@/src/components/hoc/WithNoAuth";

function Login() {
    const router = useRouter();

    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const handleFormChange = (key: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setFormData((prevState) => ({ ...prevState, [key]: event.nativeEvent.text }));
    };

    const handleSubmit = async () =>{
        let response: AuthenticationResponse | MessageResponse;

        try {
            response = await dataFetch<AuthenticationResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
                "POST",
                formData);
        } catch (error) {
            // TODO: Handle error
            return;
        }

        if (!isValidMessageResponse(response)) {
            // TODO: Handle error
            console.log((response as MessageResponse).message);
            return;
        }

        localStorage.setItem('token', (response as AuthenticationResponse).token);
        router.replace("/dashboard");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <ActionButton text={"Login"} onClick={handleSubmit} />
            <Link href="/auth/register" asChild><Text>Don't have an account? Register here.</Text></Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 400,
        margin: 'auto',
        gap: 10,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
    }
});

export default WithNoAuth(Login);