import {View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData} from "react-native";
import Input from "@/src/components/input/Input";
import ActionButton from "@/src/components/button/ActionButton";
import {Link, useRouter} from "expo-router";
import WithNoAuth from "@/src/components/hoc/WithNoAuth";
import {useState} from "react";
import RegisterRequest from "@/src/models/dto/RegisterRequest";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import dataFetch from "@/src/utils/DataFetch";
import {isValidMessageResponse} from "@/src/utils/Validation";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
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
            <ActionButton text={"Register"} onClick={handleSubmit} />
            <Link href="/auth/login" asChild><Text>Already have an account? Login here.</Text></Link>
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

export default WithNoAuth(Register);