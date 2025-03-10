import { View, Text, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData, Platform } from "react-native";
import ActionButton from "@/src/components/button/ActionButton";
import Input from "@/src/components/input/Input";
import { useState, useEffect } from "react";
import LoginRequest from "@/src/models/dto/LoginRequest";
import dataFetch from "@/src/utils/DataFetch";
import AuthenticationResponse from "@/src/models/dto/AuthenticationResponse";
import MessageResponse from "@/src/models/dto/MessageResponse";
import { isValidMessageResponse } from "@/src/utils/Validation";
import { Link, useRouter } from "expo-router";
import * as AuthSession from "expo-auth-session";

// Google OAuth discovery endpoints
const discovery = {
    authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
};

function Login() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    // Google Client ID from Google Cloud Console
    const GOOGLE_CLIENT_ID = "551251372811-ev5i15ji90i8e49t7qhonc1p74g2thfm.apps.googleusercontent.com";

    // Custom redirect URI for your ngrok backend
    const redirectUri = AuthSession.makeRedirectUri({
        native: "myapp://auth",
        useProxy: true, // Use Expo's proxy for testing
    });

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: GOOGLE_CLIENT_ID,
            scopes: ["openid", "email", "profile"],
            redirectUri,
        },
        discovery
    );

    const handleFormChange = (key: string, event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        setFormData((prevState) => ({ ...prevState, [key]: event.nativeEvent.text }));
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

        localStorage.setItem("token", (response as AuthenticationResponse).token);
        router.replace("/dashboard");
    };

    const handleGoogleLogin = async () => {
        if (Platform.OS === "web") {
            // On web, redirect directly to the backend's Google OAuth endpoint
            window.location.href = `${process.env.EXPO_PUBLIC_API_URL}/oauth2/authorization/google`;
        } else {
            // On mobile, use expo-auth-session to open the system browser
            try {
                const result = await promptAsync();
                if (result.type === "success") {
                    // Assuming your backend expects the code to exchange for a token
                    const { code } = result.params;
                    const tokenResponse = await exchangeCodeForToken(code);
                    if (tokenResponse && "token" in tokenResponse) {
                        localStorage.setItem("token", tokenResponse.token);
                        router.replace("/dashboard");
                    } else {
                        alert("Failed to authenticate with server");
                    }
                } else if (result.type === "error") {
                    alert("Google login failed");
                }
            } catch (error) {
                console.error("Google login error:", error);
                alert("An error occurred during Google login");
            }
        }
    };

    // Exchange the authorization code for a token with your backend
    const exchangeCodeForToken = async (code: string) => {
        try {
            const response = await dataFetch<AuthenticationResponse>(
                `${process.env.EXPO_PUBLIC_API_URL}/api/auth/google`, // Adjust this endpoint as needed
                "POST",
                { code, redirectUri }
        );
            return response;
        } catch (error) {
            console.error("Token exchange error:", error);
            return null;
        }
    };

    // Handle redirect on web platform
    useEffect(() => {
        if (Platform.OS === "web") {
            const handleUrlChange = () => {
                const url = window.location.href;
                if (url.includes("?token=")) {
                    const tokenMatch = url.match(/token=([^&]+)/);
                    const token = tokenMatch ? tokenMatch[1] : null;
                    if (token) {
                        localStorage.setItem("token", token);
                        router.replace("/dashboard");
                    }
                } else if (url.includes("error=")) {
                    alert("Google login failed");
                }
            };

            handleUrlChange();
            window.addEventListener("popstate", handleUrlChange);
            return () => window.removeEventListener("popstate", handleUrlChange);
        }
    }, [router]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.form}>
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
                    <ActionButton
                        text={"Google Login"}
                        onClick={handleGoogleLogin}
                        disabled={!request} // Disable until the auth request is ready
                    />
                    <Link href="/auth/register" asChild>
                        <Text>Don't have an account? Register here.</Text>
                    </Link>
                </View>
            </View>
        </View>
    );
}

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